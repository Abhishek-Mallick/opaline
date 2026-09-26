import "katex/dist/katex.min.css"

import {
  EncodingFigure,
  MapFigure,
  PlaygroundFigure,
  ProfilesFigure,
  RayFigure,
  SnellFigure,
  SpecularFigure,
  VectorFieldFigure,
} from "@/components/article/figures"
import { Tex } from "@/components/article/tex"
import { CodeBlock } from "@/components/site/code-block"

const filter = `<svg width="0" height="0">
  <filter id="glass" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    {/* 1. The baked map, stretched over the element */}
    <feImage href={map} width={w} height={h} preserveAspectRatio="none" result="map" />

    {/* 2. Move each backdrop pixel by scale × (C / 255 − 0.5), once per colour channel */}
    <feDisplacementMap in="SourceGraphic" in2="map" scale={2 * max} xChannelSelector="R" yChannelSelector="G" result="r" />
    <feDisplacementMap in="SourceGraphic" in2="map" scale={2 * max * (1 - d)} xChannelSelector="R" yChannelSelector="G" result="g" />
    <feDisplacementMap in="SourceGraphic" in2="map" scale={2 * max * (1 - 2 * d)} xChannelSelector="R" yChannelSelector="G" result="b" />
    {/* …keep red from r, green from g, blue from b, and screen them together */}

    {/* 3. A touch more colour, like light through real glass */}
    <feColorMatrix type="saturate" values="1.6" result="saturated" />

    {/* 4. The specular rim on top */}
    <feImage href={specular} result="rim" />
    <feComposite in="rim" in2="saturated" operator="over" />
  </filter>
</svg>

{/* Applied to whatever sits behind the element */}
<div style={{ backdropFilter: "url(#glass)" }} />
`

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 pt-4 text-[24px] font-semibold tracking-[-0.025em] text-foreground">
      <a href={`#${id}`}>{children}</a>
    </h2>
  )
}

/**
 * "How the glass works" — the maths behind `LiquidGlass`, with live figures
 * that call the same engine the components use.
 */
export function GlassArticle() {
  return (
    <article
      id="how-it-works"
      className="flex flex-col gap-5 border-t border-border pt-10 text-[15.5px] leading-[1.75] text-muted-foreground [&_p>code]:rounded [&_p>code]:bg-foreground/[0.06] [&_p>code]:px-1 [&_p>code]:py-px [&_p>code]:font-mono [&_p>code]:text-[0.88em] [&_p>code]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground"
    >
      <header className="flex flex-col gap-3">
        <span className="text-[12.5px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
          Foundations
        </span>
        <h2 className="text-[30px] leading-tight font-semibold tracking-[-0.035em] text-foreground">
          How the glass bends light
        </h2>
        <p>
          Most “glass” on the web is a blur. Real glass doesn&apos;t blur what&apos;s behind it: it{" "}
          <strong>bends</strong> it. Near a curved edge, light changes direction and the background
          appears to slide, stretch and fringe with colour. Opaline models that with a little optics:
          a surface shape, an index of refraction and Snell&apos;s law. The result is baked into an
          image the browser can apply to the backdrop. Every figure below runs the same code as the
          components, so you can poke at each step.
        </p>
      </header>

      <H2 id="snell">1. Snell&apos;s law</H2>
      <p>
        When light crosses from one material into another, it changes speed and therefore
        direction. The <strong>index of refraction</strong> <Tex>n</Tex> measures how much a
        material slows light: 1 for air, 1.33 for water, about 1.5 for glass and 2.42 for diamond.
        The angles on either side of the boundary, measured from the surface normal, obey:
      </p>
      <Tex block>{String.raw`n_1 \sin\theta_1 = n_2 \sin\theta_2`}</Tex>
      <SnellFigure />
      <p>
        For our glass, light arrives through air (<Tex>{"n_1 = 1"}</Tex>) and enters the material (
        <Tex>{"n_2 = n"}</Tex>), so the refracted angle is always defined:
      </p>
      <Tex block>{String.raw`\theta_2 = \arcsin\!\left(\frac{\sin\theta_1}{n}\right)`}</Tex>

      <H2 id="surface">2. The shape of the rim</H2>
      <p>
        A flat pane shifts nothing: every ray hits it straight on. The magic lives in the{" "}
        <strong>bezel</strong>, the band along the edge where the surface curves down. We describe its
        cross-section as a height <Tex>{"y(t)"}</Tex>, where <Tex>t</Tex> runs from 0 at the outer
        edge to 1 where the flat top begins. Opaline ships four profiles:
      </p>
      <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
        <Tex block>{String.raw`\text{squircle: } y = \sqrt[4]{1-(1-t)^4}`}</Tex>
        <Tex block>{String.raw`\text{circle: } y = \sqrt{1-(1-t)^2}`}</Tex>
        <Tex block>{String.raw`\text{concave: } y = 1 - \sqrt[4]{1-(1-t)^4}`}</Tex>
        <Tex block>{String.raw`\text{lip: } y = \mathrm{mix}\big(y_{\text{sq}},\, y_{\text{cc}},\, s(t)\big)`}</Tex>
      </div>
      <p>
        where <Tex>{String.raw`s(t) = 6t^5 - 15t^4 + 10t^3`}</Tex> is smootherstep. The squircle is
        the default: like Apple&apos;s shapes, it melts into the flat top with no visible seam. What
        matters for refraction is the slope <Tex>{"y'(t)"}</Tex>, which we take by central
        difference:
      </p>
      <ProfilesFigure />

      <H2 id="rays">3. Tracing rays through the bezel</H2>
      <p>
        Picture the glass sitting on the page with thickness <Tex>h</Tex> (in Opaline,{" "}
        <code>thickness</code> is <Tex>h</Tex> as a multiple of the bezel width). Light arrives
        straight down. At a point on the rim, the surface is tilted by
      </p>
      <Tex block>{String.raw`\theta_1 = \arctan\!\left(\frac{h}{b}\, y'(t)\right)`}</Tex>
      <p>
        so a vertical ray meets it at incidence <Tex>{String.raw`\theta_1`}</Tex>, refracts to{" "}
        <Tex>{String.raw`\theta_2`}</Tex>, and leaves the vertical by{" "}
        <Tex>{String.raw`\theta_1 - \theta_2`}</Tex>. Travelling down through the glass height{" "}
        <Tex>{"h\\,y(t)"}</Tex>, it lands sideways by
      </p>
      <Tex block>{String.raw`\Delta(t) = h\,y(t)\,\tan(\theta_1 - \theta_2)`}</Tex>
      <p>
        We sample <Tex>{"\\Delta"}</Tex> at 128 points across the bezel, one per step an 8-bit
        channel can store. That lookup table is the whole physical model.
      </p>
      <RayFigure />

      <H2 id="field">4. From a profile to a field</H2>
      <p>
        The table describes one slice. To cover a real element, Opaline walks every pixel of a
        rounded rectangle, finds its <strong>signed distance</strong> to the edge (which gives{" "}
        <Tex>{"t = d / b"}</Tex>) and the edge&apos;s outward normal <Tex>{String.raw`\hat{n}`}</Tex>.
        The displacement at that pixel points along the normal:
      </p>
      <Tex block>{String.raw`\vec{v}(x, y) = -\hat{n}\;\frac{\Delta(t)}{\Delta_{\max}}`}</Tex>
      <VectorFieldFigure />

      <H2 id="encoding">5. Packing vectors into pixels</H2>
      <p>
        Browsers can&apos;t take a vector field directly, but they can take an image. Each component
        of <Tex>{String.raw`\vec{v}`}</Tex> lies in <Tex>{"[-1, 1]"}</Tex>, so it fits in a colour
        channel:
      </p>
      <Tex block>{String.raw`R = 128 + 127\,v_x \qquad G = 128 + 127\,v_y`}</Tex>
      <EncodingFigure />
      <p>
        Dividing by <Tex>{String.raw`\Delta_{\max}`}</Tex> uses the full range of the channel,
        so no precision is wasted. SVG&apos;s <code>feDisplacementMap</code> undoes it: it moves
        each pixel by <Tex>{String.raw`\text{scale}\cdot(C/255 - 0.5)`}</Tex>. A full-length
        vector reaches ±0.5 there, so with <Tex>{String.raw`\text{scale} = 2\,\Delta_{\max}`}</Tex>{" "}
        every pixel shifts by exactly its traced <Tex>{"\\Delta"}</Tex>.
      </p>
      <MapFigure />

      <H2 id="specular">6. Catching the light</H2>
      <p>
        Real glass also reflects. A second map marks where the rim faces a light at angle{" "}
        <Tex>{String.raw`\varphi`}</Tex>. With <Tex>{String.raw`\hat{L} = (\cos\varphi, \sin\varphi)`}</Tex>{" "}
        and the rim&apos;s tilt <Tex>{String.raw`k(t) = \sin\big(\arctan|y'(t)|\big)`}</Tex>:
      </p>
      <Tex block>{String.raw`I = |\hat{n}\cdot\hat{L}|^{3}\; k(t)^{0.6}`}</Tex>
      <SpecularFigure />

      <H2 id="filter">7. Putting it on the page</H2>
      <p>
        Both maps feed an SVG filter, applied through <code>backdrop-filter</code> so it bends
        whatever sits behind the element. Chromatic dispersion comes free: displace red, green and
        blue by slightly different scales and the rim fringes like a prism. Maps are cached,
        rendered at up to 480 px and stretched, and double-buffered on resize so the glass never
        flashes empty.
      </p>
      <CodeBlock code={filter} lang="tsx" />
      <p>
        Only Chromium supports SVG filters inside <code>backdrop-filter</code> today. Safari and
        Firefox get a frosted blur, so the components still read as glass.
      </p>

      <H2 id="playground">8. Playground</H2>
      <PlaygroundFigure />
      <p>
        The same controls are available on every component page, and in code through{" "}
        <code>LiquidGlassProvider</code>:
      </p>
      <CodeBlock
        code={`import { LiquidGlassProvider } from "@/components/ui/liquid-glass"

<LiquidGlassProvider ior={1.9} surface="lip" thickness={1.8} specular={0.5}>
  <App />
</LiquidGlassProvider>`}
      />
    </article>
  )
}

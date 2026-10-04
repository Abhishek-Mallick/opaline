"use client"

import {
  GlassAccordion,
  GlassAccordionContent,
  GlassAccordionItem,
  GlassAccordionTrigger,
} from "@/registry/opaline/ui/opaline/glass-accordion"

const faqs = [
  ["Is it real refraction?", "Yes. Light is traced through the glass rim with Snell's law and the backdrop is displaced by an SVG filter. Safari and Firefox get a frosted fallback."],
  ["Can I change how the glass looks?", "Every glass component reads its optics from LiquidGlassProvider: index of refraction, thickness, surface profile, dispersion and more."],
  ["Is it accessible?", "Components are built on Radix primitives with keyboard support, focus rings and ARIA roles."],
]

export default function GlassAccordionDemo() {
  return (
    <GlassAccordion type="single" collapsible defaultValue="0" className="max-w-md">
      {faqs.map(([q, a], i) => (
        <GlassAccordionItem key={q} value={String(i)}>
          <GlassAccordionTrigger>{q}</GlassAccordionTrigger>
          <GlassAccordionContent>{a}</GlassAccordionContent>
        </GlassAccordionItem>
      ))}
    </GlassAccordion>
  )
}

export const siteConfig = {
  name: "Opaline",
  /** Public URL of the site, including any base path. Set per deployment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://opaline.buildlab.in").replace(/\/$/, ""),
  title: "Opaline — Interfaces that bend the light",
  description:
    "Liquid glass components for React. Real backdrop refraction, minimal and premium, installable with the shadcn CLI.",
  github: "https://github.com/deepraj21/opaline",
  registryUrl: (
    process.env.NEXT_PUBLIC_REGISTRY_URL ??
    "https://opaline.buildlab.in/r"
  ).replace(/\/$/, ""),
}

export type InstallMode = "namespace" | "url"

export function installCommand(name: string, mode: InstallMode) {
  return mode === "namespace"
    ? `npx shadcn@latest add @opaline/${name}`
    : `npx shadcn@latest add ${siteConfig.registryUrl}/${name}.json`
}

/** Prefixes a root-relative path with the deployment's base path (for plain <a> tags). */
export function withBase(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}

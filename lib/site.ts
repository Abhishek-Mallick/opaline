export const siteConfig = {
  name: "Opaline",
  url: "https://opaline.buildlab.in",
  title: "Opaline — Interfaces that bend the light",
  description:
    "Liquid glass components for React. Real backdrop refraction, minimal and premium, installable with the shadcn CLI.",
  github: "https://github.com/Abhishek-Mallick/opaline",
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

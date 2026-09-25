// Site theme. Light is the default; dark applies only when the visitor
// explicitly chose it (stored in localStorage). The browser/OS preference is
// deliberately ignored.

export const THEME_STORAGE_KEY = "opaline-theme"

export const THEME_COLORS = { light: "#fcfcfd", dark: "#0b0b0c" } as const

/**
 * Runs inline in <head> before first paint, so there is no flash of the
 * wrong theme. Keep it tiny and dependency-free.
 */
export const themeScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}`

export function isDark() {
  return document.documentElement.classList.contains("dark")
}

/** Syncs the class, the color-scheme and theme-color meta tags. */
export function applyTheme(dark: boolean) {
  const root = document.documentElement
  root.classList.toggle("dark", dark)
  document
    .querySelector('meta[name="color-scheme"]')
    ?.setAttribute("content", dark ? "dark" : "light")
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light)
}

/** Applies and persists a theme choice. */
export function setTheme(dark: boolean) {
  applyTheme(dark)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light")
  } catch {
    // Storage blocked: the choice lasts for this page view; reloads fall back to light.
  }
}

export function toggleTheme() {
  setTheme(!isDark())
}

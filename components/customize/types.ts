import type * as React from "react"

/** A value a control can hold. `null` means "auto" — the component decides. */
export type Value = string | number | boolean | null
export type Values = Record<string, Value>

type Base = {
  /** Prop name. */
  key: string
  label: string
  /** Shown in the props table. */
  description?: string
  /** Type shown in the props table; inferred when omitted. */
  type?: string
  /** Remount the preview on change — for initial values like `defaultValue`. */
  remount?: boolean
}

export type NumberControl = Base & {
  kind: "number"
  default: number | null
  min: number
  max: number
  step?: number
  unit?: string
  /** Label for `null`, e.g. "Auto". Makes the control resettable to auto. */
  auto?: string
}

export type SelectControl = Base & {
  kind: "select"
  default: string
  options: readonly (string | { value: string; label: string })[]
}

export type BooleanControl = Base & { kind: "boolean"; default: boolean }

export type ColorControl = Base & {
  kind: "color"
  default: string | null
  /** Label for `null`, e.g. "Default". */
  auto?: string
}

export type TextControl = Base & { kind: "text"; default: string }

export type Control =
  | NumberControl
  | SelectControl
  | BooleanControl
  | ColorControl
  | TextControl

export type Preset = { name: string; values: Values }

export type Snippet = {
  /** Import lines. */
  imports: string[]
  /** JSX to render. */
  jsx: string
}

export type Customization = {
  /** Controls for the component's own props. */
  controls?: Control[]
  /**
   * Which shared glass settings apply. `false` hides them (non-glass
   * components); `exclude` drops the ones this component fixes itself.
   */
  glass?: false | { exclude?: string[] }
  /**
   * `provider` (default) wraps the preview in `LiquidGlassProvider`;
   * `props` passes glass settings straight to the component.
   */
  glassMode?: "provider" | "props"
  presets?: Preset[]
  /** Live preview. `glass` holds glass props when `glassMode` is `props`. */
  render?: (values: Values, glass: Values) => React.ReactNode
  /**
   * Code for the current values. `attrs` serialises the changed component
   * props; `glass` holds changed glass props when `glassMode` is `props`.
   */
  code?: (values: Values, attrs: (keys?: string[]) => string[], glass: string[]) => Snippet
}

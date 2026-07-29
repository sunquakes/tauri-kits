/**
 * Read theme colors from CSS custom properties.
 * Allows ECharts options to respond to theme switches dynamically.
 */

export interface ThemeColors {
  cyan: string
  cyanSoft: string
  blue: string
  blueDeep: string
  magenta: string
  magentaSoft: string
  purple: string
  gold: string
  success: string
  warning: string
  danger: string
  bgPrimary: string
  bgSecondary: string
  bgPanelSolid: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  borderSoft: string
  borderCyan: string
  divider: string
}

function readVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function getThemeColors(): ThemeColors {
  return {
    cyan: readVar('--sc-cyan', '#00c9ff'),
    cyanSoft: readVar('--sc-cyan-soft', '#4fd8ff'),
    blue: readVar('--sc-blue', '#0a2463'),
    blueDeep: readVar('--sc-blue-deep', '#061a47'),
    magenta: readVar('--sc-magenta', '#ff6b9d'),
    magentaSoft: readVar('--sc-magenta-soft', '#ff8fb3'),
    purple: readVar('--sc-purple', '#7b3cff'),
    gold: readVar('--sc-gold', '#ffd700'),
    success: readVar('--sc-success', '#00ffa6'),
    warning: readVar('--sc-warning', '#ffcc00'),
    danger: readVar('--sc-danger', '#ff3b5c'),
    bgPrimary: readVar('--sc-bg-primary', '#060d1f'),
    bgSecondary: readVar('--sc-bg-secondary', '#0d1b3d'),
    bgPanelSolid: readVar('--sc-bg-panel-solid', '#0a1730'),
    textPrimary: readVar('--sc-text-primary', '#e8f4ff'),
    textSecondary: readVar('--sc-text-secondary', '#8fb3d9'),
    textTertiary: readVar('--sc-text-tertiary', '#5a7da6'),
    borderSoft: readVar('--sc-border-soft', 'rgba(0,201,255,0.15)'),
    borderCyan: readVar('--sc-border-cyan', 'rgba(0,201,255,0.35)'),
    divider: readVar('--sc-divider', 'rgba(143,179,217,0.12)'),
  }
}

/** Parse a hex color to r,g,b values */
function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '').match(/.{2}/g)
  if (!m || m.length < 3) return [0, 0, 0]
  return [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16)]
}

/** Create an rgba string from a CSS var hex color and an alpha */
export function alpha(hexVar: string, alpha: number): string {
  const hex = readVar(hexVar, '#00c9ff')
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

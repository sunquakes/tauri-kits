/**
 * Shared chart type definitions used by both admin and web chart components.
 * These interfaces are presentation-agnostic — each side adds its own
 * wrapper props (icon, tag, variant, etc.) on top.
 */

// ── Series Types ──────────────────────────────────────────────

/** Unified series for bar and line charts */
export interface DataSeries {
  /** Required for multi-series charts with legend; optional for single-series */
  name?: string
  data: number[]
  /** Solid color for line stroke or bar fill */
  color?: string
  /** Bar gradient [start, end] — takes precedence over `color` for bars */
  gradient?: [string, string]
  /** Line: fill area under the curve */
  area?: boolean
  /** Line: dashed stroke */
  dashed?: boolean
  /** Line: smooth curve (default true) */
  smooth?: boolean
}

/** Pie / donut data item */
export interface PieDataItem {
  value: number
  name: string
}

/** Radar indicator axis */
export interface RadarIndicator {
  name: string
  max: number
}

/** Radar series item */
export interface RadarSeries {
  value: number[]
  name: string
  color: string
  areaColor: string
  dashed?: boolean
}

/** Polar bar data item */
export interface PolarDataItem {
  value: number
  color: string
}

// ── Chart Props (data-only, no presentation) ──────────────────

export interface BarChartProps {
  title?: string
  categories: string[]
  series: DataSeries[]
  /** Bar direction (default 'vertical') */
  direction?: 'vertical' | 'horizontal'
  barWidth?: string
  showLegend?: boolean
  showTooltip?: boolean
  showGrid?: boolean
}

export interface LineChartProps {
  title?: string
  categories: string[]
  series: DataSeries[]
  showLegend?: boolean
  showTooltip?: boolean
  showGrid?: boolean
  yMin?: number
  yMax?: number
  /** Show Y-axis labels (box mode defaults to hidden) */
  showYAxisLabel?: boolean
  /** Compact mode: smaller fonts, tighter grid (for box variant) */
  compact?: boolean
}

export interface PieChartProps {
  title?: string
  data: PieDataItem[]
  /** [inner, outer] for donut, or string for solid pie */
  radius?: [string, string] | string
  /** Center position */
  center?: [string, string]
  /** Center main text (e.g. "100%") */
  centerText?: string
  /** Center sub text */
  centerSubText?: string
  /** Legend position */
  legendPosition?: 'right' | 'bottom'
  /** Custom color palette */
  colors?: string[]
  showTooltip?: boolean
}

export interface RadarChartProps {
  title?: string
  indicators: RadarIndicator[]
  series: RadarSeries[]
  showLegend?: boolean
  showTooltip?: boolean
}

export interface PolarChartProps {
  title?: string
  categories: string[]
  data: PolarDataItem[]
  showLegend?: boolean
  showTooltip?: boolean
}

// ── Theme ─────────────────────────────────────────────────────

/**
 * Theme colors consumed by the shared option builders.
 * Both `ThemeColors` (web, dynamic from CSS vars) and `LIGHT_THEME`
 * (admin, static) are structurally compatible with this interface.
 */
export interface ChartTheme {
  cyan: string
  blue: string
  magenta: string
  purple: string
  gold: string
  success: string
  warning: string
  danger: string
  bgPanelSolid: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  borderCyan: string
  divider: string
}

/** Light theme for admin (Ant Design style) */
export const LIGHT_THEME: ChartTheme = {
  cyan: '#1890ff',
  blue: '#e6f7ff',
  magenta: '#eb2f96',
  purple: '#722ed1',
  gold: '#faad14',
  success: '#52c41a',
  warning: '#faad14',
  danger: '#f5222d',
  bgPanelSolid: '#ffffff',
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  borderCyan: '#d9d9d9',
  divider: '#f0f0f0'
}

/** Dark theme fallback (used when CSS vars are not available) */
export const DARK_THEME: ChartTheme = {
  cyan: '#00c9ff',
  blue: '#0a2463',
  magenta: '#ff6b9d',
  purple: '#7b3cff',
  gold: '#ffd700',
  success: '#00ffa6',
  warning: '#ffcc00',
  danger: '#ff3b5c',
  bgPanelSolid: '#0a1730',
  textPrimary: '#e8f4ff',
  textSecondary: '#8fb3d9',
  textTertiary: '#5a7da6',
  borderCyan: 'rgba(0, 201, 255, 0.35)',
  divider: 'rgba(143, 179, 217, 0.12)'
}

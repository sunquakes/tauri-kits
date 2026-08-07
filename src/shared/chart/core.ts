/**
 * Shared ECharts option builders.
 *
 * Each builder accepts data-only props + a ChartTheme and returns a
 * plain ECharts option object. Both admin and web components delegate
 * to these builders, passing their respective theme.
 */

import type {
  BarChartProps,
  LineChartProps,
  PieChartProps,
  RadarChartProps,
  PolarChartProps,
  ChartTheme
} from './types'

// ── Utils ─────────────────────────────────────────────────────

/** Ordered palette for multi-series charts when no explicit color is given */
function palette(theme: ChartTheme): string[] {
  return [theme.cyan, theme.magenta, theme.purple, theme.success, theme.gold, theme.danger, theme.warning]
}

/** Pick a default color by series index, cycling through the palette */
function defaultColor(theme: ChartTheme, index: number): string {
  const p = palette(theme)
  return p[index % p.length]
}

/** Convert any color (hex / rgb / rgba) to an rgba string with given alpha */
export function toRgba(color: string, alpha: number): string {
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/, `${alpha})`)
  }
  if (color.startsWith('rgb')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`)
  }
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Build a tooltip config from theme */
function tooltip(theme: ChartTheme) {
  return {
    backgroundColor: theme.bgPanelSolid,
    borderColor: theme.borderCyan,
    borderWidth: 1,
    textStyle: { color: theme.textPrimary, fontSize: 12 }
  }
}

// ── Bar ───────────────────────────────────────────────────────

export function buildBarOption(props: BarChartProps, theme: ChartTheme): any {
  const {
    title,
    categories,
    series,
    direction = 'vertical',
    barWidth = '50%',
    showLegend = false,
    showTooltip = true,
    showGrid = true
  } = props

  const isHorizontal = direction === 'horizontal'
  const hasMultiple = series.length > 1

  return {
    ...(title
      ? { title: { text: title, left: 'center', textStyle: { color: theme.textPrimary, fontSize: 14 } } }
      : {}),
    grid: {
      top: title ? 40 : 10,
      right: isHorizontal ? 20 : 10,
      bottom: hasMultiple && showLegend ? 36 : 24,
      left: isHorizontal ? 60 : 40,
      containLabel: true
    },
    ...(showLegend
      ? {
          legend: {
            bottom: 0,
            textStyle: { color: theme.textSecondary, fontSize: 10 },
            itemWidth: 12,
            itemHeight: 8,
            itemGap: 8
          }
        }
      : {}),
    xAxis: isHorizontal
      ? {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: theme.textTertiary },
          splitLine: { show: showGrid, lineStyle: { color: theme.divider } }
        }
      : {
          type: 'category',
          data: categories,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: theme.textTertiary },
          splitLine: { show: showGrid, lineStyle: { color: theme.divider } }
        },
    yAxis: isHorizontal
      ? {
          type: 'category',
          data: categories,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: theme.textTertiary },
          splitLine: { show: false }
        }
      : {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: theme.textTertiary },
          splitLine: { show: showGrid, lineStyle: { color: theme.divider } }
        },
    series: series.map((s, i) => ({
      type: 'bar',
      name: s.name,
      data: s.data,
      itemStyle: {
        borderRadius: 4,
        color: s.gradient
          ? {
              type: 'linear',
              x: 0,
              y: 0,
              x2: isHorizontal ? 1 : 0,
              y2: isHorizontal ? 0 : 1,
              colorStops: [
                { offset: 0, color: s.gradient[0] },
                { offset: 1, color: s.gradient[1] }
              ]
            }
          : s.color ?? defaultColor(theme, i)
      },
      barWidth
    })),
    ...(showTooltip ? { tooltip: tooltip(theme) } : {})
  }
}

// ── Line ──────────────────────────────────────────────────────

export function buildLineOption(props: LineChartProps, theme: ChartTheme): any {
  const {
    title,
    categories,
    series,
    showLegend = false,
    showTooltip = true,
    showGrid = true,
    yMin,
    yMax,
    showYAxisLabel,
    compact = false
  } = props

  const hideYLabel = compact && showYAxisLabel !== true

  return {
    ...(title
      ? { title: { text: title, left: 'center', textStyle: { color: theme.textPrimary, fontSize: 14 } } }
      : {}),
    grid: {
      top: title ? 40 : 10,
      right: 10,
      bottom: showLegend ? 36 : compact ? 20 : 24,
      left: 30,
      containLabel: true
    },
    ...(showLegend
      ? {
          legend: {
            bottom: 0,
            textStyle: { color: theme.textSecondary, fontSize: 10 },
            itemWidth: 12,
            itemHeight: 8,
            itemGap: 8
          }
        }
      : {}),
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10, color: theme.textTertiary },
      splitLine: { show: showGrid, lineStyle: { color: theme.divider } }
    },
    yAxis: {
      type: 'value',
      ...(yMin !== undefined ? { min: yMin } : {}),
      ...(yMax !== undefined ? { max: yMax } : {}),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: !hideYLabel, fontSize: 10, color: theme.textTertiary },
      splitLine: { show: showGrid, lineStyle: { color: theme.divider } }
    },
    series: series.map((s, i) => {
      const color = s.color ?? defaultColor(theme, i)
      return {
        type: 'line',
        name: s.name,
        data: s.data,
        smooth: s.smooth ?? true,
        symbol: 'none',
        lineStyle: {
          color,
          width: 2,
          ...(s.dashed ? { type: [6, 4] } : {})
        },
        itemStyle: { color },
        ...(s.area
          ? {
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: toRgba(color, 0.4) },
                    { offset: 1, color: toRgba(color, 0.05) }
                  ]
                }
              }
            }
          : {})
      }
    }),
    ...(showTooltip ? { tooltip: tooltip(theme) } : {})
  }
}

// ── Pie ───────────────────────────────────────────────────────

export function buildPieOption(props: PieChartProps, theme: ChartTheme): any {
  const {
    title,
    data,
    radius = '65%',
    center = ['38%', '50%'],
    centerText,
    centerSubText,
    legendPosition = 'right',
    colors,
    showTooltip = true
  } = props

  const defaultColors = [
    theme.cyan,
    theme.magenta,
    theme.purple,
    theme.success,
    theme.gold
  ]
  const colorList = colors ?? defaultColors

  return {
    ...(title
      ? { title: { text: title, left: 'center', textStyle: { color: theme.textPrimary, fontSize: 14 } } }
      : {}),
    legend:
      legendPosition === 'right'
        ? {
            right: 0,
            orient: 'vertical',
            textStyle: { color: theme.textSecondary, fontSize: 10 },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 6
          }
        : {
            bottom: 0,
            textStyle: { color: theme.textSecondary, fontSize: 10 },
            itemWidth: 12,
            itemHeight: 8,
            itemGap: 8
          },
    ...(centerText
      ? {
          graphic: [
            {
              type: 'text',
              left: center[0],
              top: '42%',
              style: {
                text: centerText,
                fill: theme.cyan,
                font: 'bold 24px "DIN Alternate","Bahnschrift","Impact",sans-serif',
                textAlign: 'center'
              }
            },
            ...(centerSubText
              ? [
                  {
                    type: 'text',
                    left: center[0],
                    top: '56%',
                    style: {
                      text: centerSubText,
                      fill: theme.textSecondary,
                      font: '10px "PingFang SC","Microsoft YaHei",sans-serif',
                      textAlign: 'center'
                    }
                  }
                ]
              : [])
          ]
        }
      : {}),
    series: [
      {
        type: 'pie',
        radius: radius as any,
        center,
        data,
        label: { show: false },
        itemStyle: {
          borderColor: theme.blue,
          borderWidth: 2
        },
        color: colorList
      }
    ],
    ...(showTooltip ? { tooltip: tooltip(theme) } : {})
  }
}

// ── Radar ─────────────────────────────────────────────────────

export function buildRadarOption(props: RadarChartProps, theme: ChartTheme): any {
  const { title, indicators, series, showLegend = true, showTooltip = true } = props

  return {
    ...(title
      ? { title: { text: title, left: 'center', textStyle: { color: theme.textPrimary, fontSize: 14 } } }
      : {}),
    ...(showLegend
      ? {
          legend: {
            bottom: 0,
            textStyle: { color: theme.textSecondary, fontSize: 10 },
            itemWidth: 12,
            itemHeight: 8,
            itemGap: 8
          }
        }
      : {}),
    radar: {
      indicator: indicators,
      axisName: { color: theme.textSecondary, fontSize: 10 },
      splitArea: {
        areaStyle: { color: [toRgba(theme.cyan, 0.02), toRgba(theme.cyan, 0.05)] }
      },
      axisLine: { lineStyle: { color: theme.divider } },
      splitLine: { lineStyle: { color: theme.divider } }
    },
    series: [
      {
        type: 'radar',
        data: series.map((s) => ({
          value: s.value,
          name: s.name,
          lineStyle: {
            color: s.color,
            width: 2,
            ...(s.dashed ? { type: [5, 3] } : {})
          },
          areaStyle: { color: s.areaColor },
          itemStyle: { color: s.color },
          symbolSize: 3
        }))
      }
    ],
    ...(showTooltip ? { tooltip: tooltip(theme) } : {})
  }
}

// ── Polar ─────────────────────────────────────────────────────

export function buildPolarOption(props: PolarChartProps, theme: ChartTheme): any {
  const { title, categories, data, showLegend = true, showTooltip = true } = props

  return {
    ...(title
      ? { title: { text: title, left: 'center', textStyle: { color: theme.textPrimary, fontSize: 14 } } }
      : {}),
    ...(showLegend
      ? {
          legend: {
            right: 0,
            orient: 'vertical',
            textStyle: { color: theme.textSecondary, fontSize: 10 },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 6
          }
        }
      : {}),
    polar: {
      radius: '65%',
      center: ['38%', '50%']
    },
    angleAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: theme.divider } },
      axisLabel: { color: theme.textSecondary, fontSize: 10 },
      splitLine: { lineStyle: { color: theme.divider } }
    },
    radiusAxis: {
      axisLine: { show: false },
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: theme.divider } }
    },
    series: [
      {
        type: 'bar',
        coordinateSystem: 'polar',
        data: data.map((d) => ({
          value: d.value,
          itemStyle: { color: d.color }
        })),
        barWidth: '60%'
      }
    ],
    ...(showTooltip ? { tooltip: tooltip(theme) } : {})
  }
}

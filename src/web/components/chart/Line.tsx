import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'

/** 将任意颜色（hex / rgb / rgba）转为指定透明度的 rgba */
function toRgba(color: string, alpha: number): string {
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

export interface LineSeries {
  data: number[]
  name: string
  color: string
  smooth?: boolean
  /** 是否填充面积 */
  area?: boolean
  /** 是否虚线 */
  dashed?: boolean
}

export interface LineChartProps {
  title: string
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
  categories: string[]
  series: LineSeries[]
  showLegend?: boolean
  yMin?: number
  yMax?: number
  /** 是否显示 Y 轴标签（box 模式默认隐藏） */
  showYAxisLabel?: boolean
}

export default function Line({
  title,
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  categories,
  series,
  showLegend = false,
  yMin,
  yMax,
  showYAxisLabel
}: LineChartProps) {
  const hideYLabel = variant === 'box' && showYAxisLabel !== true
  const c = getThemeColors()

  const option = {
    grid: { top: 10, right: 10, bottom: showLegend ? 36 : variant === 'box' ? 20 : 24, left: 30 },
    ...(showLegend
      ? {
          legend: {
            bottom: 0,
            textStyle: { color: c.textSecondary, fontSize: 10 },
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
      axisLabel: { fontSize: 10, color: c.textTertiary },
      splitLine: { show: true, lineStyle: { color: c.divider } }
    },
    yAxis: {
      type: 'value',
      ...(yMin !== undefined ? { min: yMin } : {}),
      ...(yMax !== undefined ? { max: yMax } : {}),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: !hideYLabel, fontSize: 10, color: c.textTertiary },
      splitLine: { show: true, lineStyle: { color: c.divider } }
    },
    series: series.map((s) => ({
      type: 'line',
      name: s.name,
      data: s.data,
      smooth: s.smooth ?? true,
      symbol: 'none',
      lineStyle: {
        color: s.color,
        width: 2,
        ...(s.dashed ? { type: [6, 4] } : {})
      },
      itemStyle: { color: s.color },
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
                  { offset: 0, color: toRgba(s.color, 0.4) },
                  { offset: 1, color: toRgba(s.color, 0.05) }
                ]
              }
            }
          }
        : {})
    })),
    tooltip: {
      backgroundColor: c.bgPanelSolid,
      borderColor: c.borderCyan,
      borderWidth: 1,
      textStyle: { color: c.textPrimary, fontSize: 12 }
    }
  }

  if (variant === 'box') {
    return <ChartBox title={title} option={option} />
  }

  return (
    <ChartCard
      icon={icon}
      title={title}
      tag={tag}
      tagColor={tagColor}
      option={option}
      className={className}
    />
  )
}

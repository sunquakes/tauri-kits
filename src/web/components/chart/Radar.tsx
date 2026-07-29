import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors, alpha } from './theme'

export interface RadarIndicator {
  name: string
  max: number
}

export interface RadarSeries {
  value: number[]
  name: string
  color: string
  areaColor: string
  dashed?: boolean
}

export interface RadarChartProps {
  title: string
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
  indicators: RadarIndicator[]
  series: RadarSeries[]
  showLegend?: boolean
}

export default function Radar({
  title,
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  indicators,
  series,
  showLegend = true
}: RadarChartProps) {
  const c = getThemeColors()

  const option = {
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
    radar: {
      indicator: indicators,
      axisName: { color: c.textSecondary, fontSize: 10 },
      splitArea: {
        areaStyle: { color: [alpha('--sc-cyan', 0.02), alpha('--sc-cyan', 0.05)] }
      },
      axisLine: { lineStyle: { color: c.divider } },
      splitLine: { lineStyle: { color: c.divider } }
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

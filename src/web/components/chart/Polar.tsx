import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'

export interface PolarDataItem {
  value: number
  color: string
}

export interface PolarChartProps {
  title: string
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
  categories: string[]
  data: PolarDataItem[]
  showLegend?: boolean
}

export default function Polar({
  title,
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  categories,
  data,
  showLegend = true
}: PolarChartProps) {
  const c = getThemeColors()

  const option = {
    ...(showLegend
      ? {
          legend: {
            right: 0,
            orient: 'vertical',
            textStyle: { color: c.textSecondary, fontSize: 10 },
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
      axisLine: { lineStyle: { color: c.divider } },
      axisLabel: { color: c.textSecondary, fontSize: 10 },
      splitLine: { lineStyle: { color: c.divider } }
    },
    radiusAxis: {
      axisLine: { show: false },
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: c.divider } }
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

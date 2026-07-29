import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'

export interface BarSeries {
  data: number[]
  name?: string
  /** 渐变色 [start, end] */
  colors?: [string, string]
}

export interface BarChartProps {
  title: string
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
  categories: string[]
  series: BarSeries[]
  /** 方向：垂直（默认）或水平 */
  direction?: 'vertical' | 'horizontal'
  barWidth?: string
  showLegend?: boolean
}

export default function Bar({
  title,
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  categories,
  series,
  direction = 'vertical',
  barWidth = '50%',
  showLegend = false
}: BarChartProps) {
  const isHorizontal = direction === 'horizontal'
  const c = getThemeColors()

  const option = {
    grid: {
      top: 10,
      right: isHorizontal ? 20 : 10,
      bottom: isHorizontal ? 10 : 24,
      left: isHorizontal ? 60 : 40
    },
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
    xAxis: isHorizontal
      ? {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: c.textTertiary },
          splitLine: { show: true, lineStyle: { color: c.divider } }
        }
      : {
          type: 'category',
          data: categories,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: c.textTertiary },
          splitLine: { show: true, lineStyle: { color: c.divider } }
        },
    yAxis: isHorizontal
      ? {
          type: 'category',
          data: categories,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: c.textTertiary },
          splitLine: { show: false }
        }
      : {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: 10, color: c.textTertiary },
          splitLine: { show: true, lineStyle: { color: c.divider } }
        },
    series: series.map((s) => ({
      type: 'bar',
      name: s.name,
      data: s.data,
      itemStyle: {
        borderRadius: 4,
        color: s.colors
          ? {
              type: 'linear',
              x: 0,
              y: 0,
              x2: isHorizontal ? 1 : 0,
              y2: isHorizontal ? 0 : 1,
              colorStops: [
                { offset: 0, color: s.colors[0] },
                { offset: 1, color: s.colors[1] }
              ]
            }
          : c.cyan
      },
      barWidth
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

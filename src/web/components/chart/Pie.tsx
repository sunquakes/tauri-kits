import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'
import { buildPieOption } from '../../../shared/chart/core'
import type { PieChartProps } from '../../../shared/chart/types'

export type { PieChartProps } from '../../../shared/chart/types'

export interface WebPieProps extends PieChartProps {
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
}

export default function Pie({
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  ...chartProps
}: WebPieProps) {
  const theme = getThemeColors()
  const option = buildPieOption(chartProps, theme)

  if (variant === 'box') {
    return <ChartBox title={chartProps.title ?? ''} option={option} />
  }

  return (
    <ChartCard
      icon={icon}
      title={chartProps.title ?? ''}
      tag={tag}
      tagColor={tagColor}
      option={option}
      className={className}
    />
  )
}

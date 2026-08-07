import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'
import { buildBarOption } from '../../../shared/chart/core'
import type { BarChartProps } from '../../../shared/chart/types'

export type { BarChartProps } from '../../../shared/chart/types'

export interface WebBarProps extends BarChartProps {
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
}

export default function Bar({
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  ...chartProps
}: WebBarProps) {
  const theme = getThemeColors()
  const option = buildBarOption(chartProps, theme)

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

import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'
import { buildLineOption } from '../../../shared/chart/core'
import type { LineChartProps } from '../../../shared/chart/types'

export type { LineChartProps } from '../../../shared/chart/types'

export interface WebLineProps extends LineChartProps {
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
}

export default function Line({
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  ...chartProps
}: WebLineProps) {
  const theme = getThemeColors()
  const option = buildLineOption(
    { ...chartProps, compact: variant === 'box' },
    theme
  )

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

import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'
import { buildPolarOption } from '../../../shared/chart/core'
import type { PolarChartProps } from '../../../shared/chart/types'

export type { PolarChartProps } from '../../../shared/chart/types'

export interface WebPolarProps extends PolarChartProps {
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
}

export default function Polar({
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  ...chartProps
}: WebPolarProps) {
  const theme = getThemeColors()
  const option = buildPolarOption(chartProps, theme)

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

import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors } from './theme'
import { buildRadarOption } from '../../../shared/chart/core'
import type { RadarChartProps } from '../../../shared/chart/types'

export type { RadarChartProps } from '../../../shared/chart/types'

export interface WebRadarProps extends RadarChartProps {
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
}

export default function Radar({
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  ...chartProps
}: WebRadarProps) {
  const theme = getThemeColors()
  const option = buildRadarOption(chartProps, theme)

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

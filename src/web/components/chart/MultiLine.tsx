import { ReactNode } from 'react'
import Line from './Line'
import type { DataSeries } from '../../../shared/chart/types'

export interface MultiLineProps {
  title?: string
  categories: string[]
  series: DataSeries[]
  showLegend?: boolean
  yMin?: number
  yMax?: number
  icon?: ReactNode
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  variant?: 'card' | 'box'
}

export default function MultiLine({
  categories,
  series,
  showLegend = true,
  yMin,
  yMax,
  icon,
  tag,
  tagColor,
  className,
  variant,
  title
}: MultiLineProps) {
  return (
    <Line
      title={title}
      categories={categories}
      series={series}
      showLegend={showLegend}
      yMin={yMin}
      yMax={yMax}
      icon={icon}
      tag={tag}
      tagColor={tagColor}
      className={className}
      variant={variant}
    />
  )
}

import { ReactNode } from 'react'
import Line from './Line'
import type { DataSeries } from '../../../shared/chart/types'

export interface SingleLineProps {
  title?: string
  categories: string[]
  data: number[]
  name?: string
  color?: string
  area?: boolean
  dashed?: boolean
  smooth?: boolean
  yMin?: number
  yMax?: number
  icon?: ReactNode
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  variant?: 'card' | 'box'
}

export default function SingleLine({
  categories,
  data,
  name,
  color,
  area,
  dashed,
  smooth,
  yMin,
  yMax,
  icon,
  tag,
  tagColor,
  className,
  variant,
  title
}: SingleLineProps) {
  const series: DataSeries[] = [{ name: name ?? 'Series 1', data, color, area, dashed, smooth }]
  return (
    <Line
      title={title}
      categories={categories}
      series={series}
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

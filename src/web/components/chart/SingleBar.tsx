import { ReactNode } from 'react'
import Bar from './Bar'
import type { DataSeries } from '../../../shared/chart/types'

export interface SingleBarProps {
  title?: string
  categories: string[]
  data: number[]
  name?: string
  color?: string
  gradient?: [string, string]
  direction?: 'vertical' | 'horizontal'
  barWidth?: string
  icon?: ReactNode
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  variant?: 'card' | 'box'
}

export default function SingleBar({
  categories,
  data,
  name,
  color,
  gradient,
  direction,
  barWidth,
  icon,
  tag,
  tagColor,
  className,
  variant,
  title
}: SingleBarProps) {
  const series: DataSeries[] = [{ name: name ?? 'Series 1', data, color, gradient }]
  return (
    <Bar
      title={title}
      categories={categories}
      series={series}
      direction={direction}
      barWidth={barWidth}
      icon={icon}
      tag={tag}
      tagColor={tagColor}
      className={className}
      variant={variant}
    />
  )
}

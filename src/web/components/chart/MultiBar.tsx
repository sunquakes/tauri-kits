import { ReactNode } from 'react'
import Bar from './Bar'
import type { DataSeries } from '../../../shared/chart/types'

export interface MultiBarProps {
  title?: string
  categories: string[]
  series: DataSeries[]
  direction?: 'vertical' | 'horizontal'
  barWidth?: string
  showLegend?: boolean
  icon?: ReactNode
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  variant?: 'card' | 'box'
}

export default function MultiBar({
  categories,
  series,
  direction,
  barWidth,
  showLegend = true,
  icon,
  tag,
  tagColor,
  className,
  variant,
  title
}: MultiBarProps) {
  return (
    <Bar
      title={title}
      categories={categories}
      series={series}
      direction={direction}
      barWidth={barWidth}
      showLegend={showLegend}
      icon={icon}
      tag={tag}
      tagColor={tagColor}
      className={className}
      variant={variant}
    />
  )
}

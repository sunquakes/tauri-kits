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
  height?: number | string
}

export default function SingleBar({
  categories,
  data,
  name,
  color,
  gradient,
  direction,
  barWidth,
  height,
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
      height={height}
    />
  )
}

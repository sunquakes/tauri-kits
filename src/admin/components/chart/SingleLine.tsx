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
  height?: number | string
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
  height,
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
      height={height}
    />
  )
}

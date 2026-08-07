import Line from './Line'
import type { DataSeries } from '../../../shared/chart/types'

export interface MultiLineProps {
  title?: string
  categories: string[]
  series: DataSeries[]
  showLegend?: boolean
  yMin?: number
  yMax?: number
  height?: number | string
}

export default function MultiLine({
  categories,
  series,
  showLegend = true,
  yMin,
  yMax,
  height,
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
      height={height}
    />
  )
}

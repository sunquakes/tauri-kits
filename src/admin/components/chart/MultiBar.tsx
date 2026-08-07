import Bar from './Bar'
import type { DataSeries } from '../../../shared/chart/types'

export interface MultiBarProps {
  title?: string
  categories: string[]
  series: DataSeries[]
  direction?: 'vertical' | 'horizontal'
  barWidth?: string
  showLegend?: boolean
  height?: number | string
}

export default function MultiBar({
  categories,
  series,
  direction,
  barWidth,
  showLegend = true,
  height,
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
      height={height}
    />
  )
}

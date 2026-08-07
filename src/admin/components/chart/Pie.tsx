import ReactECharts from 'echarts-for-react'
import { buildPieOption } from '../../../shared/chart/core'
import { LIGHT_THEME } from '../../../shared/chart/types'
import type { PieChartProps } from '../../../shared/chart/types'

export type { PieChartProps } from '../../../shared/chart/types'

interface AdminPieProps extends PieChartProps {
  height?: number | string
}

export default function Pie({ height = 400, ...chartProps }: AdminPieProps) {
  const option = buildPieOption(chartProps, LIGHT_THEME)
  return <ReactECharts option={option} style={{ height: typeof height === 'number' ? `${height}px` : height }} />
}

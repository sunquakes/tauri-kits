import ReactECharts from 'echarts-for-react'
import { buildLineOption } from '../../../shared/chart/core'
import { LIGHT_THEME } from '../../../shared/chart/types'
import type { LineChartProps } from '../../../shared/chart/types'

export type { LineChartProps } from '../../../shared/chart/types'

interface AdminLineProps extends LineChartProps {
  height?: number | string
}

export default function Line({ height = 400, ...chartProps }: AdminLineProps) {
  const option = buildLineOption(chartProps, LIGHT_THEME)
  return <ReactECharts option={option} style={{ height: typeof height === 'number' ? `${height}px` : height }} />
}

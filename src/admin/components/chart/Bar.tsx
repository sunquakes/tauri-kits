import ReactECharts from 'echarts-for-react'
import { buildBarOption } from '../../../shared/chart/core'
import { LIGHT_THEME } from '../../../shared/chart/types'
import type { BarChartProps } from '../../../shared/chart/types'

export type { BarChartProps } from '../../../shared/chart/types'

interface AdminBarProps extends BarChartProps {
  height?: number | string
}

export default function Bar({ height = 400, ...chartProps }: AdminBarProps) {
  const option = buildBarOption(chartProps, LIGHT_THEME)
  return <ReactECharts option={option} style={{ height: typeof height === 'number' ? `${height}px` : height }} />
}

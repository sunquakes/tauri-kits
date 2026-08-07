import ReactECharts from 'echarts-for-react'
import { buildPolarOption } from '../../../shared/chart/core'
import { LIGHT_THEME } from '../../../shared/chart/types'
import type { PolarChartProps } from '../../../shared/chart/types'

export type { PolarChartProps } from '../../../shared/chart/types'

interface AdminPolarProps extends PolarChartProps {
  height?: number | string
}

export default function Polar({ height = 400, ...chartProps }: AdminPolarProps) {
  const option = buildPolarOption(chartProps, LIGHT_THEME)
  return <ReactECharts option={option} style={{ height: typeof height === 'number' ? `${height}px` : height }} />
}

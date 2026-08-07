import ReactECharts from 'echarts-for-react'
import { buildRadarOption } from '../../../shared/chart/core'
import { LIGHT_THEME } from '../../../shared/chart/types'
import type { RadarChartProps } from '../../../shared/chart/types'

export type { RadarChartProps } from '../../../shared/chart/types'

interface AdminRadarProps extends RadarChartProps {
  height?: number | string
}

export default function Radar({ height = 400, ...chartProps }: AdminRadarProps) {
  const option = buildRadarOption(chartProps, LIGHT_THEME)
  return <ReactECharts option={option} style={{ height: typeof height === 'number' ? `${height}px` : height }} />
}

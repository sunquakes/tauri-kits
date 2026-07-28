import ReactECharts from 'echarts-for-react'
import './ChartBox.scss'

interface ChartBoxProps {
  title: string
  option: any
  height?: number | string
}

export default function ChartBox({ title, option, height = 130 }: ChartBoxProps) {
  return (
    <div className="sc-chart-box">
      <div className="sc-chart-title">{title}</div>
      <div className="sc-chart-wrap" style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

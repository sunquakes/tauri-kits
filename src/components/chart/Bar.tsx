import ReactECharts from 'echarts-for-react'

interface BarProps {
  data: {
    xAxis: string[]
    series: { data: number[]; type: string }[]
  }
}

export default function Bar({ data }: BarProps) {
  const option = {
    xAxis: {
      type: 'category',
      data: data.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: data.series
  }

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
}

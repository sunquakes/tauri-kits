import ReactECharts from 'echarts-for-react'

interface LineProps {
  data: {
    xAxis: string[]
    legend: string[]
    series: Array<{
      name: string
      type: string
      stack: string
      data: number[]
    }>
  }
}

export default function Line({ data }: LineProps) {
  const option = {
    title: {
      text: 'Line Chart',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: data.legend
    },
    xAxis: {
      type: 'category',
      data: data.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: data.series.map(s => ({
      ...s,
      smooth: true
    }))
  }

  return <ReactECharts option={option} style={{ height: '400px' }} />
}

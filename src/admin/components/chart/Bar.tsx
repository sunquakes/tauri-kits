import ReactECharts from 'echarts-for-react'

interface BarProps {
  data: {
    xAxis: string[]
    series: Array<{
      data: number[]
      type: string
    }>
  }
}

export default function Bar({ data }: BarProps) {
  const option = {
    title: {
      text: 'Bar Chart',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: data.series.map(s => ({
      ...s,
      barWidth: '60%'
    }))
  }

  return <ReactECharts option={option} style={{ height: '400px' }} />
}

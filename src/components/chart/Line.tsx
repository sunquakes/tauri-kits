import ReactECharts from 'echarts-for-react'

interface LineProps {
  data: {
    xAxis: string[]
    legend: string[]
    series: { name: string; type: string; stack: string; data: number[] }[]
  }
}

export default function Line({ data }: LineProps) {
  const option = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: data.legend
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: data.series
  }

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
}

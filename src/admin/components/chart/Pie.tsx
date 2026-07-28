import ReactECharts from 'echarts-for-react'

interface PieProps {
  data: any[]
}

export default function Pie({ data }: PieProps) {
  const option = {
    title: {
      text: 'Pie Chart',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return <ReactECharts option={option} style={{ height: '400px' }} />
}

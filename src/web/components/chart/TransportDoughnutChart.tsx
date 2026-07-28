import { DotChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function TransportDoughnutChart() {
  const { t } = useTranslation()

  const option = {
    legend: {
      right: 0,
      orient: 'vertical',
      textStyle: { color: '#8fb3d9', fontSize: 10 },
      itemWidth: 10, itemHeight: 10, itemGap: 6
    },
    graphic: [{
      type: 'text',
      left: '32%',
      top: '42%',
      style: {
        text: '100%',
        fill: '#00d4ff',
        font: 'bold 24px "DIN Alternate","Bahnschrift","Impact",sans-serif',
        textAlign: 'center'
      }
    }, {
      type: 'text',
      left: '32%',
      top: '56%',
      style: {
        text: t('charts.travel_total'),
        fill: '#8fb3d9',
        font: '10px "PingFang SC","Microsoft YaHei",sans-serif',
        textAlign: 'center'
      }
    }],
    series: [{
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['32%', '50%'],
      data: [
        { value: 42, name: t('charts.transport_car') },
        { value: 28, name: t('charts.transport_bus') },
        { value: 22, name: t('charts.transport_subway') },
        { value: 8, name: t('charts.transport_bike') }
      ],
      label: { show: false },
      itemStyle: {
        borderColor: '#0c1a3a',
        borderWidth: 2
      },
      color: [
        'rgba(0, 212, 255, 0.82)',
        'rgba(255, 0, 160, 0.82)',
        'rgba(123, 60, 255, 0.82)',
        'rgba(0, 255, 166, 0.82)'
      ]
    }],
    tooltip: {
      backgroundColor: 'rgba(5, 11, 26, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.35)',
      borderWidth: 1,
      textStyle: { color: '#e8f4ff', fontSize: 12 }
    }
  }

  return (
    <ChartCard
      icon={<DotChartOutlined style={{ fontSize: 13, color: 'var(--sc-magenta-soft)' }} />}
      title={t('charts.transport_composition')}
      tag={t('charts.tag_travel_percent')}
      tagColor="magenta"
      option={option}
      className="span2"
    />
  )
}

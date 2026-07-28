import { BarChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function AlertHorizontalBarChart() {
  const { t } = useTranslation()

  const option = {
    grid: { top: 10, right: 20, bottom: 10, left: 60 },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10, color: '#5a7da6' },
      splitLine: { show: true, lineStyle: { color: 'rgba(143, 179, 217, 0.05)' } }
    },
    yAxis: {
      type: 'category',
      data: [t('charts.district_sjs'), t('charts.district_mtg'), t('charts.district_dx'), t('charts.district_sy'), t('charts.district_tz'), t('charts.district_ft'), t('charts.district_hd'), t('charts.district_cy')],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10, color: '#5a7da6' },
      splitLine: { show: false }
    },
    series: [{
      type: 'bar',
      data: [6, 9, 12, 15, 18, 22, 28, 36],
      itemStyle: {
        borderRadius: 4,
        color: {
          type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(255, 0, 160, 0.95)' },
            { offset: 1, color: 'rgba(123, 60, 255, 0.6)' }
          ]
        }
      },
      barWidth: '55%'
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
      icon={<BarChartOutlined style={{ fontSize: 13, color: 'var(--sc-magenta-soft)' }} />}
      title={t('charts.alert_by_district')}
      tag={t('charts.tag_alert')}
      tagColor="magenta"
      option={option}
      className="span3"
    />
  )
}

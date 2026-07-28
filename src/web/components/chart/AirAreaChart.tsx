import { AreaChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function AirAreaChart() {
  const { t } = useTranslation()

  const option = {
    grid: { top: 10, right: 10, bottom: 24, left: 40 },
    xAxis: {
      type: 'category',
      data: [t('charts.mon'), t('charts.tue'), t('charts.wed'), t('charts.thu'), t('charts.fri'), t('charts.sat'), t('charts.sun')],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10, color: '#5a7da6' },
      splitLine: { show: true, lineStyle: { color: 'rgba(143, 179, 217, 0.05)' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10, color: '#5a7da6' },
      splitLine: { show: true, lineStyle: { color: 'rgba(143, 179, 217, 0.05)' } }
    },
    series: [{
      type: 'line',
      data: [45, 38, 52, 60, 48, 35, 42],
      smooth: true,
      symbol: 'none',
      lineStyle: { color: '#00d4ff', width: 2 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
          ]
        }
      }
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
      icon={<AreaChartOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
      title={t('charts.air_quality_trend')}
      tag={t('charts.tag_pm25')}
      option={option}
      className="span2"
    />
  )
}

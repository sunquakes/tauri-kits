import { CompassOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function NoisePolarChart() {
  const { t } = useTranslation()

  const option = {
    legend: {
      right: 0,
      orient: 'vertical',
      textStyle: { color: '#8fb3d9', fontSize: 10 },
      itemWidth: 10, itemHeight: 10, itemGap: 6
    },
    polar: {
      radius: '65%',
      center: ['38%', '50%']
    },
    angleAxis: {
      type: 'category',
      data: [t('charts.time_dawn'), t('charts.time_morning'), t('charts.time_am'), t('charts.time_pm'), t('charts.time_evening'), t('charts.time_night')],
      axisLine: { lineStyle: { color: 'rgba(143, 179, 217, 0.1)' } },
      axisLabel: { color: '#8fb3d9', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(143, 179, 217, 0.1)' } }
    },
    radiusAxis: {
      axisLine: { show: false },
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: 'rgba(143, 179, 217, 0.1)' } }
    },
    series: [{
      type: 'bar',
      coordinateSystem: 'polar',
      data: [
        { value: 35, itemStyle: { color: 'rgba(0, 212, 255, 0.7)' } },
        { value: 48, itemStyle: { color: 'rgba(0, 128, 255, 0.7)' } },
        { value: 62, itemStyle: { color: 'rgba(0, 255, 166, 0.7)' } },
        { value: 58, itemStyle: { color: 'rgba(255, 204, 0, 0.7)' } },
        { value: 52, itemStyle: { color: 'rgba(255, 107, 157, 0.7)' } },
        { value: 40, itemStyle: { color: 'rgba(123, 60, 255, 0.7)' } }
      ],
      barWidth: '60%'
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
      icon={<CompassOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
      title={t('charts.noise_distribution')}
      tag={t('charts.tag_noise')}
      option={option}
      className="span3"
    />
  )
}

import { RadarChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function CityRadarChart() {
  const { t } = useTranslation()

  const option = {
    legend: {
      bottom: 0,
      textStyle: { color: '#8fb3d9', fontSize: 10 },
      itemWidth: 12, itemHeight: 8, itemGap: 8
    },
    radar: {
      indicator: [
        { name: t('charts.capability_traffic'), max: 100 },
        { name: t('charts.capability_env'), max: 100 },
        { name: t('charts.capability_energy'), max: 100 },
        { name: t('charts.capability_safety'), max: 100 },
        { name: t('charts.capability_education'), max: 100 },
        { name: t('charts.capability_medical'), max: 100 }
      ],
      axisName: { color: '#8fb3d9', fontSize: 10 },
      splitArea: { areaStyle: { color: ['rgba(0, 212, 255, 0.02)', 'rgba(0, 212, 255, 0.05)'] } },
      axisLine: { lineStyle: { color: 'rgba(143, 179, 217, 0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(143, 179, 217, 0.1)' } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [88, 76, 82, 90, 70, 85],
          name: t('charts.this_year'),
          lineStyle: { color: '#00d4ff', width: 2 },
          areaStyle: { color: 'rgba(0, 212, 255, 0.2)' },
          itemStyle: { color: '#00d4ff' },
          symbolSize: 3
        },
        {
          value: [78, 68, 74, 82, 65, 78],
          name: t('charts.last_year'),
          lineStyle: { color: '#ff00a0', width: 2, type: [5, 3] },
          areaStyle: { color: 'rgba(255, 0, 160, 0.15)' },
          itemStyle: { color: '#ff00a0' },
          symbolSize: 3
        }
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
      icon={<RadarChartOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
      title={t('charts.city_capability')}
      tag={t('charts.tag_score')}
      option={option}
      className="span2"
    />
  )
}

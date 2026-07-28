import { BarChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function EnergyBarChart() {
  const { t } = useTranslation()

  const option = {
    grid: { top: 10, right: 10, bottom: 24, left: 40 },
    xAxis: {
      type: 'category',
      data: [t('charts.district_cy'), t('charts.district_hd'), t('charts.district_ft'), t('charts.district_tz'), t('charts.district_sy'), t('charts.district_dx')],
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
      type: 'bar',
      data: [820, 950, 610, 540, 480, 420],
      itemStyle: {
        borderRadius: 4,
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 0, 160, 0.85)' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.85)' }
          ]
        }
      },
      barWidth: '50%'
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
      icon={<BarChartOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
      title={t('charts.energy_comparison')}
      tag={t('charts.tag_energy')}
      option={option}
      className="span2"
    />
  )
}

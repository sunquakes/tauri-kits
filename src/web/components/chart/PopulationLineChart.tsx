import { RiseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function PopulationLineChart() {
  const { t } = useTranslation()

  const option = {
    grid: { top: 10, right: 10, bottom: 36, left: 40 },
    legend: {
      bottom: 0,
      textStyle: { color: '#8fb3d9', fontSize: 10 },
      itemWidth: 12, itemHeight: 8, itemGap: 8
    },
    xAxis: {
      type: 'category',
      data: ['1' + t('charts.month'), '2' + t('charts.month'), '3' + t('charts.month'), '4' + t('charts.month'), '5' + t('charts.month'), '6' + t('charts.month'),
             '7' + t('charts.month'), '8' + t('charts.month'), '9' + t('charts.month'), '10' + t('charts.month'), '11' + t('charts.month'), '12' + t('charts.month')],
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
    series: [
      {
        name: t('charts.inflow'),
        type: 'line',
        data: [32, 28, 35, 42, 48, 55, 60, 58, 52, 46, 40, 36],
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#00d4ff', width: 2 },
        itemStyle: { color: '#00d4ff' }
      },
      {
        name: t('charts.outflow'),
        type: 'line',
        data: [28, 30, 32, 38, 44, 50, 56, 54, 48, 42, 38, 34],
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#ff00a0', width: 2, type: [6, 4] },
        itemStyle: { color: '#ff00a0' }
      }
    ],
    tooltip: {
      backgroundColor: 'rgba(5, 11, 26, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.35)',
      borderWidth: 1,
      textStyle: { color: '#e8f4ff', fontSize: 12 }
    }
  }

  return (
    <ChartCard
      icon={<RiseOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
      title={t('charts.population_trend')}
      tag={t('charts.tag_wan_person')}
      option={option}
      className="span2"
    />
  )
}

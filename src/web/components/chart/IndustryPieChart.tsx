import { PieChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ChartCard from './ChartCard'

export default function IndustryPieChart() {
  const { t } = useTranslation()

  const option = {
    legend: {
      right: 0,
      orient: 'vertical',
      textStyle: { color: '#8fb3d9', fontSize: 10 },
      itemWidth: 10, itemHeight: 10, itemGap: 6
    },
    series: [{
      type: 'pie',
      radius: '65%',
      center: ['38%', '50%'],
      data: [
        { value: 38, name: t('charts.industry_service') },
        { value: 24, name: t('charts.industry_manufacturing') },
        { value: 16, name: t('charts.industry_finance') },
        { value: 14, name: t('charts.industry_tech') },
        { value: 8, name: t('charts.industry_agriculture') }
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
        'rgba(0, 255, 166, 0.82)',
        'rgba(255, 204, 0, 0.82)'
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
      icon={<PieChartOutlined style={{ fontSize: 13, color: 'var(--sc-magenta-soft)' }} />}
      title={t('charts.industry_ratio')}
      tag={t('charts.tag_percent')}
      tagColor="magenta"
      option={option}
      className="span2"
    />
  )
}

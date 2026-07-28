import { CarOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Panel from './Panel'
import Gauge from './Gauge'
import ChartBox from './ChartBox'
import './TrafficPanel.scss'

export default function TrafficPanel() {
  const { t } = useTranslation()

  const speedChartOption = {
    grid: {
      top: 10,
      right: 10,
      bottom: 20,
      left: 30
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 10,
        color: '#5a7da6'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(143, 179, 217, 0.05)'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 70,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(143, 179, 217, 0.05)'
        }
      }
    },
    series: [
      {
        type: 'line',
        data: [55, 60, 25, 40, 35, 45, 55],
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#00d4ff',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
            ]
          }
        }
      }
    ],
    tooltip: { show: false }
  }

  return (
    <Panel
      icon={<CarOutlined style={{ color: 'var(--sc-cyan)', fontSize: 16 }} />}
      title={t('dashboard.traffic')}
      status={t('dashboard.realtime')}
      statusType="success"
      className="sc-traffic"
    >
      <div className="sc-metric-block">
        <div className="sc-metric-icon-ring">
          <CarOutlined style={{ color: 'var(--sc-cyan)', fontSize: 22 }} />
        </div>
        <div className="sc-metric-text">
          <div className="sc-metric-label">{t('dashboard.traffic_flow')}</div>
          <div className="sc-metric-value cyan">
            92.6<span className="sc-unit">{t('dashboard.unit_wan_times')}</span>
          </div>
        </div>
      </div>

      <div className="sc-gauge-row">
        <Gauge
          value="1.28"
          label={t('dashboard.congestion_index')}
          color="magenta"
          percent={45}
        />
        <Gauge
          value="46"
          unit="km/h"
          label={t('dashboard.avg_speed')}
          color="cyan"
          percent={55}
          size="small"
        />
      </div>

      <ChartBox
        title={t('dashboard.speed_trend_24h')}
        option={speedChartOption}
      />
    </Panel>
  )
}

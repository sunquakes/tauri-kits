import { EnvironmentOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Panel from './Panel'
import Gauge from './Gauge'
import ChartBox from '../chart/ChartBox'
import './EnvPanel.scss'

export default function EnvPanel() {
  const { t } = useTranslation()

  const noiseChartOption = {
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
      min: 30,
      max: 60,
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
        data: [38, 35, 52, 48, 50, 45, 40],
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#ff6b9d',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 107, 157, 0.35)' },
              { offset: 1, color: 'rgba(255, 107, 157, 0.05)' }
            ]
          }
        }
      }
    ],
    tooltip: { show: false }
  }

  return (
    <Panel
      icon={<EnvironmentOutlined style={{ color: 'var(--sc-cyan)', fontSize: 16 }} />}
      title={t('dashboard.environment')}
      status={t('dashboard.realtime')}
      statusType="success"
      className="sc-env"
    >
      <div className="sc-metric-block">
        <div style={{ flexShrink: 0 }}>
          <Gauge
            value={t('dashboard.air_quality_excellent')}
            label=""
            color="green"
            percent={90}
            textMode="text"
          />
        </div>
        <div className="sc-metric-text">
          <div className="sc-metric-label">{t('dashboard.air_quality')}</div>
          <div className="sc-metric-value-small">
            PM2.5 28<span className="sc-unit">μg/m³</span>
          </div>
        </div>
      </div>

      <div className="sc-noise-block">
        <div className="sc-noise-gauges">
          <div className="sc-vbar-item">
            <div className="sc-vbar">
              <div className="sc-vbar-fill"></div>
            </div>
            <div className="sc-vbar-label">dB</div>
          </div>
          <Gauge
            value="42"
            unit="dB"
            label={t('dashboard.noise_index')}
            color="cyan"
            percent={42}
          />
        </div>
      </div>

      <ChartBox
        title={t('dashboard.noise_trend_24h')}
        option={noiseChartOption}
      />
    </Panel>
  )
}

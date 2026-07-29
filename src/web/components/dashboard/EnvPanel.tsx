import { EnvironmentOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Panel from './Panel'
import Gauge from './Gauge'
import Line from '../chart/Line'
import './EnvPanel.scss'

export default function EnvPanel() {
  const { t } = useTranslation()

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

      <Line
        variant="box"
        title={t('dashboard.noise_trend_24h')}
        categories={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']}
        series={[{ name: 'Noise', data: [38, 35, 52, 48, 50, 45, 40], color: '#ff6b9d', area: true }]}
        yMin={30}
        yMax={60}
      />
    </Panel>
  )
}

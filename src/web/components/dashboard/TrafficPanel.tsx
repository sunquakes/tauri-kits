import { CarOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Panel from './Panel'
import Gauge from './Gauge'
import Line from '../chart/Line'
import './TrafficPanel.scss'

export default function TrafficPanel() {
  const { t } = useTranslation()

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

      <Line
        variant="box"
        title={t('dashboard.speed_trend_24h')}
        categories={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']}
        series={[{ name: 'Speed', data: [55, 60, 25, 40, 35, 45, 55], color: '#00d4ff', area: true }]}
        yMin={0}
        yMax={70}
      />
    </Panel>
  )
}

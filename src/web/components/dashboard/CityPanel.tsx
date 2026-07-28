import { ApartmentOutlined, EnvironmentOutlined, ThunderboltOutlined, WifiOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Panel from './Panel'
import './CityPanel.scss'

const buildings = [
  { width: 18, height: 50, opacity: 0.5 },
  { width: 22, height: 70, opacity: 0.6 },
  { width: 26, height: 100, opacity: 0.75 },
  { width: 30, height: 140, opacity: 0.9 },
  { width: 28, height: 120, opacity: 0.8 },
  { width: 22, height: 85, opacity: 0.65 },
  { width: 20, height: 60, opacity: 0.5 },
  { width: 18, height: 55, opacity: 0.45 },
]

export default function CityPanel() {
  const { t } = useTranslation()

  return (
    <Panel
      icon={<ApartmentOutlined style={{ color: 'var(--sc-cyan)', fontSize: 16 }} />}
      title={t('dashboard.city_twin')}
      status={t('dashboard.online')}
      statusType="info"
      className="sc-city"
    >
      <div className="sc-city-stage">
        <div className="sc-city-rings"></div>
        <div className="sc-city-radar"></div>
        <div className="sc-city-glow"></div>
        <div className="sc-city-buildings">
          {buildings.map((b, i) => (
            <div
              key={i}
              className="sc-building"
              style={{
                width: `${b.width}px`,
                height: `${b.height}px`,
                opacity: b.opacity
              }}
            />
          ))}
        </div>
        <svg className="sc-arteries" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="arteryGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--sc-magenta)" stopOpacity="1" />
              <stop offset="50%" stopColor="var(--sc-purple)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--sc-cyan)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="arteryGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--sc-cyan)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--sc-magenta-soft)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M 40 200 Q 200 40 360 200"
            fill="none"
            stroke="url(#arteryGrad1)"
            strokeWidth="2"
            className="sc-artery-path"
          />
          <path
            d="M 70 230 Q 200 90 330 230"
            fill="none"
            stroke="url(#arteryGrad2)"
            strokeWidth="1.5"
            className="sc-artery-path"
            style={{ animationDelay: '0.5s' }}
          />
          <path
            d="M 50 170 Q 200 270 350 170"
            fill="none"
            stroke="url(#arteryGrad1)"
            strokeWidth="1"
            opacity="0.5"
            className="sc-artery-path"
            style={{ animationDelay: '1s' }}
          />
        </svg>
        <div className="sc-hex-marker m1">
          <EnvironmentOutlined style={{ fontSize: 12, color: 'var(--sc-cyan)' }} />
        </div>
        <div className="sc-hex-marker m2">
          <ThunderboltOutlined style={{ fontSize: 12, color: 'var(--sc-magenta-soft)' }} />
        </div>
        <div className="sc-hex-marker m3">
          <WifiOutlined style={{ fontSize: 12, color: 'var(--sc-cyan)' }} />
        </div>
        <div className="sc-city-label">CITY DIGITAL TWIN · {t('dashboard.realtime_status')}</div>
      </div>
    </Panel>
  )
}

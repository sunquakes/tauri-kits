import { ThunderboltOutlined, WarningOutlined, VideoCameraOutlined, FileTextOutlined, HomeOutlined, BarChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import TrafficPanel from './TrafficPanel'
import CityPanel from './CityPanel'
import EnvPanel from './EnvPanel'
import IndicatorCard from './IndicatorCard'
import ThemeToggle from './ThemeToggle'
import './Dashboard.scss'

export default function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBackToAdmin = () => {
    window.location.href = window.location.origin + '/dashboard'
  }

  const handleGoToCharts = () => {
    navigate('/charts')
  }

  return (
    <div className="sc-shell">
      {/* Back to Admin Button */}
      <button className="sc-admin-btn" onClick={handleBackToAdmin} title={t('dashboard.back_to_admin')}>
        <HomeOutlined style={{ fontSize: 16 }} />
        <span>Admin</span>
      </button>
      {/* Charts Overview Button */}
      <button className="sc-charts-btn" onClick={handleGoToCharts} title={t('dashboard.charts_overview')}>
        <BarChartOutlined style={{ fontSize: 16 }} />
        <span>{t('dashboard.charts_overview')}</span>
      </button>
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Header */}
      <Header />

      {/* Main 3-column */}
      <div className="sc-main">
        <TrafficPanel />
        <CityPanel />
        <EnvPanel />
      </div>

      {/* Bottom indicator cards */}
      <div className="sc-bottom">
        <IndicatorCard
          icon={<ThunderboltOutlined style={{ fontSize: 24, color: 'var(--sc-cyan)' }} />}
          value="1,280"
          unit={t('dashboard.unit_ton_standard_coal')}
          label={t('dashboard.energy_consumption')}
          color="cyan"
        />
        <IndicatorCard
          icon={<WarningOutlined style={{ fontSize: 24, color: 'var(--sc-magenta-soft)' }} />}
          value="36"
          unit={t('dashboard.unit_incidents')}
          label={t('dashboard.incident_alert')}
          color="magenta"
        />
        <IndicatorCard
          icon={<VideoCameraOutlined style={{ fontSize: 24, color: 'var(--sc-cyan)' }} />}
          value="98.2"
          unit="%"
          label={t('dashboard.camera_online')}
          color="cyan"
        />
        <IndicatorCard
          icon={<FileTextOutlined style={{ fontSize: 24, color: 'var(--sc-cyan)' }} />}
          value="96.7"
          unit="%"
          label={t('dashboard.work_order_processing')}
          color="cyan"
        />
      </div>
    </div>
  )
}

import { HomeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Header from '../dashboard/Header'
import EnergyBarChart from './EnergyBarChart'
import PopulationLineChart from './PopulationLineChart'
import IndustryPieChart from './IndustryPieChart'
import CityRadarChart from './CityRadarChart'
import AirAreaChart from './AirAreaChart'
import TransportDoughnutChart from './TransportDoughnutChart'
import AlertHorizontalBarChart from './AlertHorizontalBarChart'
import NoisePolarChart from './NoisePolarChart'
import './ChartsOverview.scss'

export default function ChartsOverview() {
  const { t } = useTranslation()

  const handleBackToAdmin = () => {
    window.location.href = window.location.origin + '/'
  }

  return (
    <div className="sc-shell charts-overview">
      <button className="sc-admin-btn" onClick={handleBackToAdmin} title={t('dashboard.back_to_admin')}>
        <HomeOutlined style={{ fontSize: 16 }} />
        <span>Admin</span>
      </button>

      <Header />

      <div className="sc-charts-grid">
        <EnergyBarChart />
        <PopulationLineChart />
        <IndustryPieChart />
        <CityRadarChart />
        <AirAreaChart />
        <TransportDoughnutChart />
        <AlertHorizontalBarChart />
        <NoisePolarChart />
      </div>
    </div>
  )
}

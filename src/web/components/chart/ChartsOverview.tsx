import {
  HomeOutlined,
  DashboardOutlined,
  BarChartOutlined,
  RiseOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  AreaChartOutlined,
  DotChartOutlined,
  CompassOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Header from '../dashboard/Header'
import ThemeToggle from '../dashboard/ThemeToggle'
import SingleBar from './SingleBar'
import SingleLine from './SingleLine'
import MultiLine from './MultiLine'
import Pie from './Pie'
import Radar from './Radar'
import Polar from './Polar'
import { getThemeColors, alpha } from './theme'
import './ChartsOverview.scss'

export default function ChartsOverview() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const c = getThemeColors()

  const handleBackToAdmin = () => {
    window.location.href = window.location.origin + '/dashboard'
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}${t('charts.month')}`)
  const districts = [
    t('charts.district_cy'),
    t('charts.district_hd'),
    t('charts.district_ft'),
    t('charts.district_tz'),
    t('charts.district_sy'),
    t('charts.district_dx')
  ]
  const weekdays = [t('charts.mon'), t('charts.tue'), t('charts.wed'), t('charts.thu'), t('charts.fri'), t('charts.sat'), t('charts.sun')]
  const timeSlots = [t('charts.time_dawn'), t('charts.time_morning'), t('charts.time_am'), t('charts.time_pm'), t('charts.time_evening'), t('charts.time_night')]

  return (
    <div className="sc-shell charts-overview">
      <button className="sc-admin-btn" onClick={handleBackToAdmin} title={t('dashboard.back_to_admin')}>
        <HomeOutlined style={{ fontSize: 16 }} />
        <span>Admin</span>
      </button>
      <button className="sc-charts-btn" onClick={handleBackToDashboard} title={t('dashboard.title')}>
        <DashboardOutlined style={{ fontSize: 16 }} />
        <span>{t('dashboard.back_to_dashboard')}</span>
      </button>
      {/* Theme Toggle */}
      <ThemeToggle />

      <Header />

      <div className="sc-charts-grid">
        {/* 柱状图 — 区域能耗对比 */}
        <SingleBar
          icon={<BarChartOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
          title={t('charts.energy_comparison')}
          tag={t('charts.tag_energy')}
          className="span2"
          categories={districts}
          data={[820, 950, 610, 540, 480, 420]}
          gradient={[alpha('--sc-magenta', 0.85), alpha('--sc-cyan', 0.85)]}
        />

        {/* 折线图 — 人口流动趋势 */}
        <MultiLine
          icon={<RiseOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
          title={t('charts.population_trend')}
          tag={t('charts.tag_wan_person')}
          className="span2"
          categories={months}
          series={[
            { name: t('charts.inflow'), data: [32, 28, 35, 42, 48, 55, 60, 58, 52, 46, 40, 36], color: c.cyan },
            { name: t('charts.outflow'), data: [28, 30, 32, 38, 44, 50, 56, 54, 48, 42, 38, 34], color: c.magenta, dashed: true }
          ]}
        />

        {/* 饼图 — 产业占比 */}
        <Pie
          icon={<PieChartOutlined style={{ fontSize: 13, color: 'var(--sc-magenta-soft)' }} />}
          title={t('charts.industry_ratio')}
          tag={t('charts.tag_percent')}
          tagColor="magenta"
          className="span2"
          data={[
            { value: 38, name: t('charts.industry_service') },
            { value: 24, name: t('charts.industry_manufacturing') },
            { value: 16, name: t('charts.industry_finance') },
            { value: 14, name: t('charts.industry_tech') },
            { value: 8, name: t('charts.industry_agriculture') }
          ]}
        />

        {/* 雷达图 — 城市能力评估 */}
        <Radar
          icon={<RadarChartOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
          title={t('charts.city_capability')}
          tag={t('charts.tag_score')}
          className="span2"
          indicators={[
            { name: t('charts.capability_traffic'), max: 100 },
            { name: t('charts.capability_env'), max: 100 },
            { name: t('charts.capability_energy'), max: 100 },
            { name: t('charts.capability_safety'), max: 100 },
            { name: t('charts.capability_education'), max: 100 },
            { name: t('charts.capability_medical'), max: 100 }
          ]}
          series={[
            { name: t('charts.this_year'), value: [88, 76, 82, 90, 70, 85], color: c.cyan, areaColor: alpha('--sc-cyan', 0.2) },
            { name: t('charts.last_year'), value: [78, 68, 74, 82, 65, 78], color: c.magenta, areaColor: alpha('--sc-magenta', 0.15), dashed: true }
          ]}
        />

        {/* 折线图（面积）— 空气质量趋势 */}
        <SingleLine
          icon={<AreaChartOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
          title={t('charts.air_quality_trend')}
          tag={t('charts.tag_pm25')}
          className="span2"
          categories={weekdays}
          data={[45, 38, 52, 60, 48, 35, 42]}
          name="PM2.5"
          color={c.cyan}
          area
        />

        {/* 饼图（环形）— 交通方式构成 */}
        <Pie
          icon={<DotChartOutlined style={{ fontSize: 13, color: 'var(--sc-magenta-soft)' }} />}
          title={t('charts.transport_composition')}
          tag={t('charts.tag_travel_percent')}
          tagColor="magenta"
          className="span2"
          radius={['50%', '70%']}
          centerText="100%"
          centerSubText={t('charts.travel_total')}
          data={[
            { value: 42, name: t('charts.transport_car') },
            { value: 28, name: t('charts.transport_bus') },
            { value: 22, name: t('charts.transport_subway') },
            { value: 8, name: t('charts.transport_bike') }
          ]}
        />

        {/* 柱状图（水平）— 各区事件预警数 */}
        <SingleBar
          icon={<BarChartOutlined style={{ fontSize: 13, color: 'var(--sc-magenta-soft)' }} />}
          title={t('charts.alert_by_district')}
          tag={t('charts.tag_alert')}
          tagColor="magenta"
          className="span3"
          direction="horizontal"
          barWidth="55%"
          categories={[
            t('charts.district_sjs'),
            t('charts.district_mtg'),
            t('charts.district_dx'),
            t('charts.district_sy'),
            t('charts.district_tz'),
            t('charts.district_ft'),
            t('charts.district_hd'),
            t('charts.district_cy')
          ]}
          data={[6, 9, 12, 15, 18, 22, 28, 36]}
          gradient={[alpha('--sc-magenta', 0.95), alpha('--sc-purple', 0.6)]}
        />

        {/* 极坐标图 — 噪声分布 */}
        <Polar
          icon={<CompassOutlined style={{ fontSize: 13, color: 'var(--sc-cyan)' }} />}
          title={t('charts.noise_distribution')}
          tag={t('charts.tag_noise')}
          className="span3"
          categories={timeSlots}
          data={[
            { value: 35, color: alpha('--sc-cyan', 0.7) },
            { value: 48, color: alpha('--sc-blue', 0.7) },
            { value: 62, color: alpha('--sc-success', 0.7) },
            { value: 58, color: alpha('--sc-gold', 0.7) },
            { value: 52, color: alpha('--sc-magenta', 0.7) },
            { value: 40, color: alpha('--sc-purple', 0.7) }
          ]}
        />
      </div>
    </div>
  )
}

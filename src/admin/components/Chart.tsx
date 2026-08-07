import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import Pie from './chart/Pie'
import Radar from './chart/Radar'
import Polar from './chart/Polar'
import SingleBar from './chart/SingleBar'
import MultiBar from './chart/MultiBar'
import SingleLine from './chart/SingleLine'
import MultiLine from './chart/MultiLine'
import { LIGHT_THEME } from '../../shared/chart/types'
import pieData from '../api/pie.json'
import barData from '../api/bar.json'
import lineData from '../api/line.json'
import './Chart.scss'

export default function Chart() {
  const { t } = useTranslation()
  const c = LIGHT_THEME

  return (
    <div className="chart-page">
      {/* Row 1: Pie + SingleBar */}
      <Row className="chart-row" gutter={16}>
        <Col className="chart-container" span={12}>
          <Pie title={t('chart.pie_title')} data={pieData} legendPosition="right" />
        </Col>
        <Col className="chart-container" span={12}>
          <SingleBar
            title={t('chart.single_bar_title')}
            categories={barData.xAxis}
            data={barData.series[0].data}
            color={c.cyan}
          />
        </Col>
      </Row>

      {/* Row 2: MultiLine (full width) */}
      <Row className="chart-row" gutter={16}>
        <Col className="chart-container" span={24}>
          <MultiLine
            title={t('chart.multi_line_title')}
            categories={lineData.xAxis}
            series={[
              { name: lineData.legend[0], data: lineData.series[0].data, color: c.cyan },
              { name: lineData.legend[1], data: lineData.series[1].data, color: c.magenta },
              { name: lineData.legend[2], data: lineData.series[2].data, color: c.purple },
              { name: lineData.legend[3], data: lineData.series[3].data, color: c.success },
              { name: lineData.legend[4], data: lineData.series[4].data, color: c.gold }
            ]}
          />
        </Col>
      </Row>

      {/* Row 3: SingleLine (area) + MultiBar */}
      <Row className="chart-row" gutter={16}>
        <Col className="chart-container" span={12}>
          <SingleLine
            title={t('chart.area_line_title')}
            categories={barData.xAxis}
            data={barData.series[0].data}
            color={c.cyan}
            area
          />
        </Col>
        <Col className="chart-container" span={12}>
          <MultiBar
            title={t('chart.multi_bar_title')}
            categories={barData.xAxis}
            series={[
              { name: 'A', data: [120, 200, 150, 80, 70, 110, 130], color: c.cyan },
              { name: 'B', data: [60, 100, 80, 120, 90, 130, 110], color: c.magenta }
            ]}
          />
        </Col>
      </Row>

      {/* Row 4: Radar + Polar */}
      <Row className="chart-row" gutter={16}>
        <Col className="chart-container" span={12}>
          <Radar
            title={t('chart.radar_title')}
            indicators={[
              { name: 'Sales', max: 100 },
              { name: 'Marketing', max: 100 },
              { name: 'Tech', max: 100 },
              { name: 'Support', max: 100 },
              { name: 'Admin', max: 100 },
              { name: 'R&D', max: 100 }
            ]}
            series={[
              { name: 'Budget', value: [80, 70, 90, 60, 75, 85], color: c.cyan, areaColor: 'rgba(24,144,255,0.2)' },
              { name: 'Actual', value: [70, 65, 80, 55, 70, 75], color: c.magenta, areaColor: 'rgba(235,47,150,0.15)', dashed: true }
            ]}
          />
        </Col>
        <Col className="chart-container" span={12}>
          <Polar
            title={t('chart.polar_title')}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            data={[
              { value: 120, color: c.cyan },
              { value: 200, color: c.magenta },
              { value: 150, color: c.purple },
              { value: 80, color: c.success },
              { value: 70, color: c.gold },
              { value: 110, color: c.cyan },
              { value: 130, color: c.magenta }
            ]}
          />
        </Col>
      </Row>
    </div>
  )
}

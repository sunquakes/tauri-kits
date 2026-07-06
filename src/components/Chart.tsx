import { Row, Col } from 'antd'
import Pie from './chart/Pie'
import Bar from './chart/Bar'
import Line from './chart/Line'
import pieData from '../api/pie.json'
import barData from '../api/bar.json'
import lineData from '../api/line.json'
import './Chart.scss'

export default function Chart() {
  return (
    <>
      <Row>
        <Col className="chart-container" span={12}>
          <Pie data={pieData} />
        </Col>
        <Col className="chart-container" span={12}>
          <Bar data={barData} />
        </Col>
      </Row>
      <Row>
        <Col className="chart-container" span={24}>
          <Line data={lineData} />
        </Col>
      </Row>
    </>
  )
}

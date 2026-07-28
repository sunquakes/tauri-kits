import { Row, Col, Statistic, Collapse, Alert } from 'antd'
import { useEffect, useState } from 'react'
import { doCount } from '../api/user'

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0)
  const [activeKey, setActiveKey] = useState(['1'])

  useEffect(() => {
    const fetchCount = async () => {
      const count = await doCount()
      setUserCount(count)
    }
    fetchCount()
  }, [])

  const collapseItems = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: (
        <p>
          A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be
          found as a welcome guest in many households across the world.
        </p>
      )
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: (
        <p>
          A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be
          found as a welcome guest in many households across the world.
        </p>
      )
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: (
        <p>
          A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be
          found as a welcome guest in many households across the world.
        </p>
      )
    }
  ]

  return (
    <>
      <Row style={{ padding: '8px 0' }}>
        <Col span={12}>
          <Statistic title="Active Users" value={userCount} style={{ marginRight: '50px' }} />
        </Col>
        <Col span={12}>
          <Statistic title="Account Balance (CNY)" precision={2} value={112893} />
        </Col>
      </Row>
      <Row style={{ padding: '8px 0' }}>
        <Col span={24}>
          <Collapse activeKey={activeKey} onChange={(keys) => setActiveKey(keys as string[])} items={collapseItems} />
        </Col>
      </Row>
      <Row style={{ padding: '8px 0' }}>
        <Col span={24} style={{ margin: '4px 0' }}>
          <Alert message="Success Tips" type="success" showIcon />
        </Col>
        <Col span={24} style={{ margin: '4px 0' }}>
          <Alert message="Informational Notes" type="info" showIcon />
        </Col>
        <Col span={24} style={{ margin: '4px 0' }}>
          <Alert message="Warning" type="warning" showIcon />
        </Col>
        <Col span={24} style={{ margin: '4px 0' }}>
          <Alert message="Error" type="error" showIcon />
        </Col>
      </Row>
    </>
  )
}

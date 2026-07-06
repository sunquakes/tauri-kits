import { useState, useEffect } from 'react'
import { Form, Row, Col, Input, Button, Table, Popconfirm, message, Card, Space, Typography, Statistic, Tag } from 'antd'
import type { TablePaginationConfig } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { pageList, del } from '../api/user'
import UserForm from './user/Form'
import './User.scss'

const { Title, Text } = Typography

interface UserItem {
  id: number
  username: string
  nickname: string
  password?: string
  state: number
  create_time: string
  update_time: string
}

interface Pagination {
  total?: number
  pageSize: number
  current: number
}

interface SearchForm {
  nickname?: string
  username?: string
}

export default function User() {
  const [form] = Form.useForm<SearchForm>()
  const { t } = useTranslation()
  const [list, setList] = useState<UserItem[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserItem | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const columns = [
    { title: t('user.id'), width: 80, dataIndex: 'id', key: 'id' },
    { title: t('user.nickname'), width: 120, dataIndex: 'nickname', key: 'nickname' },
    { title: t('user.username'), width: 120, dataIndex: 'username', key: 'username' },
    {
      title: t('user.state'),
      width: 100,
      dataIndex: 'state',
      key: 'state',
      render: (state: number) => (
        state === 1 
          ? <Tag color="success">{t('user.enabled')}</Tag> 
          : <Tag color="default">{t('user.disabled')}</Tag>
      )
    },
    { title: t('user.create_time'), width: 180, dataIndex: 'create_time', key: 'create_time' },
    { title: t('user.update_time'), width: 180, dataIndex: 'update_time', key: 'update_time' },
    {
      title: t('action.edit'),
      key: 'operation',
      width: 140,
      fixed: 'right' as const,
      render: (_: any, record: UserItem) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('action.edit')}
          </Button>
          <Popconfirm
            title={t('confirm.delete_user')}
            okText={t('button.ok')}
            cancelText={t('button.no')}
            onConfirm={() => handleDel(record)}
          >
            <Button 
              type="link" 
              size="small" 
              danger
              icon={<DeleteOutlined />}
            >
              {t('action.delete')}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  useEffect(() => {
    handlePage()
  }, [])

  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 })
    handlePage({ ...pagination, current: 1 })
  }

  const parseWhere = (): string[][] => {
    const values = form.getFieldsValue()
    const where: string[][] = []
    if (values.nickname) {
      where.push(['nickname', 'LIKE', `%${values.nickname}%`])
    }
    if (values.username) {
      where.push(['username', 'LIKE', `%${values.username}%`])
    }
    return where
  }

  const handlePage = async (p?: TablePaginationConfig) => {
    setLoading(true)
    const current = p?.current || 1
    const pageSize = p?.pageSize || 10
    const where = parseWhere()
    try {
      const result = await pageList(current, pageSize, where)
      setList(result.records)
      setPagination({
        current,
        pageSize,
        total: result.total
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDel = async (record: UserItem) => {
    await del([['id', record.id]])
    message.success(t('message.delete.success'))
    handlePage()
  }

  const handleAdd = () => {
    setFormTitle(t('title.add') + t('menu.system_user'))
    setOpen(true)
    setCurrentUser(null)
  }

  const handleEdit = (record: UserItem) => {
    setFormTitle(t('title.edit') + t('menu.system_user'))
    setOpen(true)
    setCurrentUser(record)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRefreshList = () => {
    handlePage()
  }

  return (
    <div className="user-page">
      <div className="page-header">
        <Title level={3} className="page-title">{t('title.user_management')}</Title>
        <Text type="secondary">{t('title.user_management_desc')}</Text>
      </div>
      
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title={t('stats.total_users')}
              value={pagination.total || 0}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title={t('stats.enabled_users')}
              value={list.filter(u => u.state === 1).length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title={t('stats.disabled_users')}
              value={list.filter(u => u.state !== 1).length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title={t('stats.current_page')}
              value={pagination.current}
              suffix={`/ ${Math.ceil((pagination.total || 0) / pagination.pageSize)}`}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="search-card">
        <Form form={form} name="advanced_search" onFinish={handleSearch}>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="nickname" label={t('user.nickname')}>
                <Input placeholder={t('placeholder.input_nickname')} prefix={<SearchOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="username" label={t('user.username')}>
                <Input placeholder={t('placeholder.input_username')} prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="search-actions">
            <Col span={24} style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => form.resetFields()}>
                  {t('action.reset')}
                </Button>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  {t('action.search')}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card 
        className="table-card"
        title={t('table.user_list')}
        extra={
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefreshList}>
              {t('action.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              {t('action.add')}
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={list}
          scroll={{ x: 'max-content' }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => t('table.total', { total })
          }}
          onChange={handlePage}
          rowKey="id"
          loading={loading}
        />
      </Card>

      <UserForm
        title={formTitle}
        open={open}
        user={currentUser}
        onClose={handleClose}
        onRefreshList={handleRefreshList}
      />
    </div>
  )
}

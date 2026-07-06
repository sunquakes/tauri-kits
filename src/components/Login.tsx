import './Login.scss'
import { Row, Col, Form, Input, Checkbox, Button, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined, SafetyOutlined, RocketOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { login } from '../api/user'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const { Title, Text, Paragraph } = Typography

interface LoginForm {
  username: string
  password: string
  remember: boolean
}

export default function Login() {
  const { t } = useTranslation()
  const { setUser } = useStore()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true)
    try {
      const user = await login(values.username, values.password)
      if (user instanceof Error) {
        if (user.message === 'login.username_not_exist') {
          setUsernameError(t(user.message))
          return
        }
        if (user.message === 'login.wrong_password') {
          setPasswordError(t(user.message))
          return
        }
      } else {
        setUser(user)
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <Row className="login-row" gutter={0}>
        <Col className="left-panel" span={16}>
          <div className="brand-content">
            <div className="logo-area">
              <RocketOutlined className="logo-icon" />
              <Title level={1} className="brand-title">Tauri Kits</Title>
            </div>
            <Paragraph className="brand-desc">
              现代化的跨平台桌面应用开发框架
            </Paragraph>
            <div className="feature-list">
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <div className="feature-text">
                  <Text strong>安全可靠</Text>
                  <Text type="secondary">原生安全层保护</Text>
                </div>
              </div>
              <div className="feature-item">
                <RocketOutlined className="feature-icon" />
                <div className="feature-text">
                  <Text strong>高性能</Text>
                  <Text type="secondary">极速启动体验</Text>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col className="right-panel" span={8}>
          <div className="login-card">
            <div className="login-header">
              <Title level={3} className="login-title">{t('login.welcome_back')}</Title>
              <Text type="secondary">{t('login.please_login')}</Text>
            </div>
            
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                label={t('login.username')}
                rules={[{ required: true, message: t('login.username_required') }]}
                validateStatus={usernameError ? 'error' : ''}
                help={usernameError}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={t('placeholder.input_username')}
                  onChange={() => setUsernameError('')}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={t('login.password')}
                rules={[{ required: true, message: t('login.password_required') }]}
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('login.password')}
                  onChange={() => setPasswordError('')}
                />
              </Form.Item>

              <Form.Item className="form-options">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>{t('login.remember_me')}</Checkbox>
                </Form.Item>
                <a className="forgot-link" href="">
                  {t('login.forgot_password')}
                </a>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="login-btn"
                  loading={loading}
                  block
                >
                  {t('login.submit')}
                </Button>
              </Form.Item>

              <Divider plain>
                <Text type="secondary">{t('login.no_account')}</Text>
              </Divider>

              <Button className="register-btn" block>
                {t('login.register_now')}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}

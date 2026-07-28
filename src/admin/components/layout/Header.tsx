import { Layout, Dropdown, Button, Select, Modal } from 'antd'
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useStore } from '../../store'
import { useNavigate } from 'react-router-dom'

const { Header: AntHeader } = Layout

export default function Header() {
  const { t, i18n } = useTranslation()
  const { user, setUser } = useStore()
  const navigate = useNavigate()
  const [modal, contextHolder] = Modal.useModal()

  const nickname = user?.nickname || ''

  const langOptions = [
    { value: 'en', label: t('lang.en') },
    { value: 'zh', label: t('lang.zh') }
  ]

  const handleLogout = () => {
    modal.confirm({
      title: t('logout.confirm'),
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setUser(null)
        navigate('/login')
      }
    })
  }

  const handleProfile = () => {
    console.log('profile')
  }

  const menuItems = [
    { key: 'profile', label: t('menu.profile'), onClick: handleProfile },
    { key: 'logout', label: t('menu.logout'), onClick: handleLogout }
  ]

  return (
    <>
      <AntHeader style={{ background: '#fff', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 16 }}>{nickname}</span>
            <span style={{ color: 'green' }}>{t('status.online')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select
              value={i18n.language}
              style={{ width: 90, marginRight: 16 }}
              options={langOptions}
              onChange={(value) => i18n.changeLanguage(value)}
            />
            <Dropdown menu={{ items: menuItems }} placement="bottomRight">
              <Button style={{ border: 'none', padding: 0 }}>
                <EllipsisOutlined style={{ fontSize: '20px', verticalAlign: 'top' }} />
              </Button>
            </Dropdown>
          </div>
        </div>
      </AntHeader>
      {contextHolder}
    </>
  )
}

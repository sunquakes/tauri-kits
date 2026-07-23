import { Menu as AntMenu } from 'antd'
import type { MenuProps as AntMenuProps } from 'antd'
import { DashboardOutlined, PieChartOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface MenuProps {
  currentMenu: string
  setCurrentMenu: (menu: string) => void
}

export default function Menu({ currentMenu, setCurrentMenu }: MenuProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const items: AntMenuProps['items'] = [
    {
      key: 'Dashboard',
      icon: <DashboardOutlined />,
      label: t('menu.dashboard'),
      onClick: () => {
        setCurrentMenu('Dashboard')
        navigate('/dashboard')
      }
    },
    {
      key: 'Chart',
      icon: <PieChartOutlined />,
      label: t('menu.chart'),
      onClick: () => {
        setCurrentMenu('Chart')
        navigate('/chart')
      }
    },
    {
      key: 'Icon',
      icon: <AppstoreOutlined />,
      label: t('menu.icon'),
      onClick: () => {
        setCurrentMenu('Icon')
        navigate('/icon')
      }
    },
    {
      key: 'System',
      icon: <SettingOutlined />,
      label: t('menu.system'),
      children: [
        {
          key: 'User',
          icon: <UserOutlined />,
          label: t('menu.system_user'),
          onClick: () => {
            setCurrentMenu('User')
            navigate('/user')
          }
        }
      ]
    }
  ]

  return (
    <AntMenu
      theme="dark"
      mode="inline"
      selectedKeys={[currentMenu]}
      defaultOpenKeys={['System']}
      items={items}
    />
  )
}

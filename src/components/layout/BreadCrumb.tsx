import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface BreadCrumbProps {
  currentMenu: string
}

export default function BreadCrumb({ currentMenu }: BreadCrumbProps) {
  const { t } = useTranslation()

  const getBreadcrumbItems = () => {
    const items = [
      { title: <HomeOutlined /> },
      { title: t('menu.dashboard') }
    ]

    if (currentMenu === 'Chart') {
      items[1] = { title: t('menu.chart') }
    } else if (currentMenu === 'User') {
      items[1] = { title: t('menu.system') }
      items.push({ title: t('menu.system_user') })
    }

    return items
  }

  return (
    <Breadcrumb style={{ margin: '16px 0' }} items={getBreadcrumbItems()} />
  )
}

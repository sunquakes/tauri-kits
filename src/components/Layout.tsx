import { Layout, theme } from 'antd'
import { useState } from 'react'
import Logo from './layout/Logo'
import Menu from './layout/Menu'
import Header from './layout/Header'
import Footer from './layout/Footer'
import BreadCrumb from './layout/BreadCrumb'
import { Outlet } from 'react-router-dom'
import './Layout.scss'

const { Sider, Content } = Layout

export default function LayoutComponent() {
  const [collapsed, setCollapsed] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('Dashboard')
  const { token } = theme.useToken()

  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }}>
      <Sider 
        className="layout-sider"
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="dark"
      >
        <Logo collapsed={collapsed} />
        <Menu currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
      </Sider>
      <Layout className="layout-content">
        <Header />
        <Content className="layout-main-content">
          <BreadCrumb currentMenu={currentMenu} />
          <div className="page-wrapper">
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

import { Typography, Button, Space } from 'antd'

const { Title, Text, Paragraph } = Typography

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <Title level={1} style={{ color: 'white', marginBottom: '24px' }}>
        欢迎来到 Tauri Kits
      </Title>
      <Paragraph style={{ fontSize: '18px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>
        现代化的跨平台桌面应用开发框架
      </Paragraph>
      <Space size="large">
        <Button type="primary" size="large" href="/admin" style={{ 
          background: 'white', 
          color: '#667eea',
          border: 'none',
          height: '48px',
          padding: '0 32px',
          fontSize: '16px'
        }}>
          进入管理后台
        </Button>
      </Space>
      <div style={{ marginTop: '64px', opacity: 0.8 }}>
        <Text style={{ color: 'white' }}>
          前台模块开发中...
        </Text>
      </div>
    </div>
  )
}

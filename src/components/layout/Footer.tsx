import { Layout } from 'antd'

const { Footer: AntFooter } = Layout

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      Tauri Kits ©{new Date().getFullYear()} Created by Shing Rui
    </AntFooter>
  )
}

import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { StoreProvider } from './store'
import router from './router'
import './lang'
import 'antd/dist/reset.css'
import '../style.css'

function AppContent() {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}

import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/web.html',
    element: <Dashboard />
  }
])

export default router

import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import ChartsOverview from '../components/chart/ChartsOverview'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/web.html',
    element: <Dashboard />
  },
  {
    path: '/charts',
    element: <ChartsOverview />
  }
])

export default router

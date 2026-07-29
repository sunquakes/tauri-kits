import { createHashRouter } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import ChartsOverview from '../components/chart/ChartsOverview'

const router = createHashRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/charts',
    element: <ChartsOverview />
  }
])

export default router

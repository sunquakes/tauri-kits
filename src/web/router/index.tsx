import { createBrowserRouter, Navigate } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import ChartsOverview from '../components/chart/ChartsOverview'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/charts',
    element: <ChartsOverview />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])

export default router

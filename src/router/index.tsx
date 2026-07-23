import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import Dashboard from '../components/Dashboard'
import Chart from '../components/Chart'
import Icon from '../components/Icon'
import User from '../components/User'
import Login from '../components/Login'
import { useStore } from '../store'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useStore()
  const location = useLocation()
  
  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }
  
  if (user && location.pathname === '/login') {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/chart',
        element: <Chart />
      },
      {
        path: '/icon',
        element: <Icon />
      },
      {
        path: '/user',
        element: <User />
      }
    ]
  }
])

export default router
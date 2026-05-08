import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../components/Login/Login'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <div>Dashboard (Em breve)</div>,
  },
  {
    path: '*',
    element: <div>Page Not Found (Em breve)</div>,
  },
])
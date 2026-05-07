import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <div>Login Page (Em breve)</div>,
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
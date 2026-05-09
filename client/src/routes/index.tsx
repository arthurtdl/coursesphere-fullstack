import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '../components/Auth/Login';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <div className="p-8"><h1>Dashboard (Privado)</h1><p>Bem-vindo ao CourseSphere!</p></div>,
      },
    ],
  },
  {
    path: '*',
    element: <div className="p-8 text-center">404 - Página não encontrada</div>,
  },
]);
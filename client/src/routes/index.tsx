import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login, ProtectedRoute, DashboardLayout, ExplorePage, MyCoursesPage } from '@/components';

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
        path: '/dashboard', // Root path for authenticated users
        element: <DashboardLayout />, 
        children: [
          { path: 'explore', element: <ExplorePage /> },
          { path: 'my-courses', element: <MyCoursesPage /> },
        ]
      },
    ],
  },
  {
    path: '*',
    element: <div className="p-8 text-center">404 - Página não encontrada</div>,
  },
]);
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { 
  Login, 
  ProtectedRoute, 
  DashboardLayout, 
  ExplorePage, 
  MyCoursesPage,
  NotFoundPage,
  LessonsPage
} from '@/components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard/explore" replace />,
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
        element: <DashboardLayout />, 
        children: [
          { index: true, element: <Navigate to="explore" replace /> },
          { path: 'explore', element: <ExplorePage /> },
          { path: 'my-courses', element: <MyCoursesPage /> },
          { path: 'courses/:id', element: <LessonsPage /> },
        ]
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
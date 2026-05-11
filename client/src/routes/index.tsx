import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Login,
  ProtectedRoute,
  DashboardLayout,
  ExplorePage,
  MyCoursesPage,
  NotFoundPage,
  LessonsPage,
} from "@/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/explore" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="explore" replace /> },
          { path: "explore", element: <ExplorePage /> },

          // Guest route
          { path: "explore/:id", element: <LessonsPage /> },

          { path: "my-courses", element: <MyCoursesPage /> },
          
          // Owner route
          { path: "my-courses/:id", element: <LessonsPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

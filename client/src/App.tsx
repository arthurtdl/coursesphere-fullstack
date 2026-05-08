import { RouterProvider } from "react-router-dom"
import { router } from "./routes/index.tsx"
import { AuthProvider } from "./context/AuthProvider.tsx"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
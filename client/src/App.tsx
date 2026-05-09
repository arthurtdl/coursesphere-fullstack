import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster /> {/* Notifications component */}
      <AuthProvider> {/* Authentication provider to manage login state throughout the application */}
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;

import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ThemeToggle from "./components/layout/ThemeToggle";
import "./styles/theme.css";

// Layout component for consistent app structure
const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Twitter Clone</h1>
        <ThemeToggle />
      </header>
      <main className="app-content">{children}</main>
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  // Bypass authentication check completely
  return children;

  /* Original code (commented out for reference)
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
  */
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/login"
        element={
          <AppLayout>
            <LoginPage />
          </AppLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AppLayout>
            <RegisterPage />
          </AppLayout>
        }
      />
      <Route
        path="/"
        element={
          <AppLayout>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <AppLayout>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="*"
        element={
          <AppLayout>
            <div>Page Not Found</div>
          </AppLayout>
        }
      />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
    basename: "/",
  }
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

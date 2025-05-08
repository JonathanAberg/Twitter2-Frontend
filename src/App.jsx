import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/theme.css";

// Layout component for consistent app structure
const AppLayout = ({ children }) => {
  console.log("Rendering AppLayout with children:", children);
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

// HomePage component - keep for potential future use but not in routes
const HomePage = () => {
  console.log("Rendering HomePage");
  return <div>Home Page (to be implemented)</div>;
};

// NotFoundPage component
const NotFoundPage = () => {
  console.log("Rendering NotFoundPage");
  return <div>Page Not Found</div>;
};

// ProfilePageWrapper component
const ProfilePageWrapper = () => {
  console.log("Rendering ProfilePageWrapper");
  return <ProfilePage />;
};

// Create routes with future flags enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <AppLayout>
            <ProfilePageWrapper />
          </AppLayout>
        }
      />
      <Route
        path="*"
        element={
          <AppLayout>
            <NotFoundPage />
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

// Additional debugging for router configuration
console.log("Router configuration:", {
  routes: router.routes,
  future: router.future || "No future flags detected in router object",
});

function App() {
  console.log("Rendering App component");
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

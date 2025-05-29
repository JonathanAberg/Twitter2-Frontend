import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { Home } from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import Login from "./components/Login";
import LoginSelect from "./components/LoginSelect";
import Register from "./components/Register";

import "./styles/general.css";
import { InfoCompletion } from "./components/infoCompletion";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} data-testid="route-/login" />
          <Route
            path="/loginselect"
            element={<LoginSelect />}
            data-testid="route-/loginselect"
          />
          <Route
            path="/register"
            element={<Register />}
            data-testid="route-/register"
          />

          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/loginselect" replace />} />
            <Route
              path="/home/:id"
              element={<Home />}
              data-testid="route-/home/:id"
            />
            <Route
              path="/profile"
              element={<ProfilePage />}
              data-testid="route-/profile"
            />
            <Route
              path="/profile/:id"
              element={<ProfilePage />}
              data-testid="route-/profile/:id"
            />
            <Route
              path="/infoCompletion/:id"
              element={<InfoCompletion />}
              data-testid="route-/infoCompletion/:id"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

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
          {/* Auth routes without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/loginselect" element={<LoginSelect />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/loginselect" replace />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/infoCompletion/:id" element={<InfoCompletion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

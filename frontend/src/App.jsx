import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
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
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/loginselect" replace />} />
            <Route path="/loginselect" index element={<LoginSelect />} />
            <Route path="/register" element={<Register />} />
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

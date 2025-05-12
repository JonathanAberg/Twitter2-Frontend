// import { useEffect } from "react";
// import { useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import Login from './components/Login'
import LoginSelect from './components/LoginSelect'
import Register from './components/Register'
import { ProfileDetails } from "./components/ProfileDetails";

import "./styles/general.css";

function App() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/User")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/loginselect" replace />} />
            <Route path="/loginselect" index element={<LoginSelect />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<ProfileDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

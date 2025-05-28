import { Sidebar } from "./Sidebar.jsx";
import { Aside } from "./Aside.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext.jsx"; 


import "../styles/layout.css";

const Layout = ({ children }) => {
const [user, setUser] = useState(null);
useEffect(() => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to fetch user:", res.status, errorData);
        return;
      }

      const data = await res.json();
      console.log("Fetched user:", data);
      setUser(data);
    } catch (err) {
      console.error("Network or parsing error:", err);
    }
  };

  if (token && userId) {
    fetchUser();
  }
}, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <div className="layout-container">
      <div className="layout-sidebar">
        <Sidebar />
      </div>

      <main className="layout-main">
        <Outlet />
        {children}
      </main>

      <div className="layout-aside">
        <Aside />
      </div>
    </div>
       <div className="layout-footer">
        <Footer />
      </div>
      </UserContext.Provider>
  );
};

export default Layout;
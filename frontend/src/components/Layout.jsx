import { Sidebar } from "./Sidebar.jsx";
import { Aside } from "./Aside.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx"

import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
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

      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
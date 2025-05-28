import { Sidebar } from "./Sidebar.jsx";
import { Aside } from "./Aside.jsx";
import { Outlet } from "react-router-dom";
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
    </div>
  );
};

export default Layout;

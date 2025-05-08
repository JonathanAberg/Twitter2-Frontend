import { Outlet } from "react-router-dom";
import React from "react";
import { Header } from `../components/Header.jsx`;
import { Aside } from "../components/Aside.jsx";

import "../styles/layout.css";

export function Layout() {
  return (
    <>
      <div className="content-frame">
        <div className="content-column">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
        <Aside />
      </div>
    </>
  );
}

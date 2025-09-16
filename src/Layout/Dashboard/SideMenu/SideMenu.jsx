import React from "react";
import { NavLink } from "react-router-dom";
import "./SideMenu.css"; // Import the CSS file

const SideMenu = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
  const menuItems = [
    { path: "/segametric-inside", label: "Dashboard" },

    {
      path: "/segametric-inside/manage-ticket",
      label: "Manage Ticket",
    },
    {
      path: "/segametric-inside/learn-how-to",
      label: "Learn How To",
    },
    {
      path: "/segametric-inside/trending-faq",
      label: "Trending FAQ",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">Tech Support</h1>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {/* <span className="sidebar-icon">{item.icon}</span> */}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            {/* <span className="sidebar-icon">🚪</span> */}
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

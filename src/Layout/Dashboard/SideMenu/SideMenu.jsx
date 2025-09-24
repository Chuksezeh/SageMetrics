import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = ({ sidebarOpen, setSidebarOpen }) => {

    // const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));

  const navigate = useNavigate();


  const menuItems = [
    {
      path: "/segametric-dashboard/manage-ticket",
      label: "Manage Ticket",
    },
    {
      path: "/segametric-dashboard/learn-how-to",
      label: "Learn How To",
    },
    {
      path: "/segametric-dashboard/trending-faq",
      label: "Trending FAQ",
    },
  ];

 
 const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("SageData");
    navigate("/")
  };
  

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
          <h1 className="sidebar-title">Support Portal</h1>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ color: "black" }}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="link-text" style={{ color: "black" }}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="segametric-logout-button">
            <span style={{ color: "black" }}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

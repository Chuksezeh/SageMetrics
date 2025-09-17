// import React from "react";
// import NavBar from "../Navbar/navBar";
// import DashboardCards from "../DashboardCards/dashboardCards";

// const Dashboard = () => {
//   return (
//     <>
//       <NavBar />

//       <DashboardCards />
//     </>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu/SideMenu";
import Header from "./Header/Header";
import "./Dashboard.css";

const Dashboard = ({ handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <SideMenu
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="main-content">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Content Area */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

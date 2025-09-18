// import React from "react";
// import NavBar from "../Navbar/navBar";
// import DashboardCards from "../DashboardCards/dashboardCards";

// import React from 'react';
// import NavBar from '../Navbar/navBar';
// import DashboardCards from '../DashboardCards/dashboardCards';
// import Footer from '../Footer/footer';
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
        <div className="seg-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

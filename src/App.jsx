// import { useState } from "react";
// import "./App.css";
// import HomePage from "./Hompage/homePage";
// import Dashboard from "./Layout/Dashboard/dashboard";
// import { Route, BrowserRouter, Routes } from "react-router-dom";
// import FAQComponent from "./Layout/components/FAQ/FAQComponent";
// import NavBar from "./Layout/Navbar/navBar";

// function App() {
//   return (
//     <BrowserRouter>
//     <NavBar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/FAQ-services" element={<FAQComponent />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardCards from "./Layout/DashboardCards/dashboardCards";
import Dashboard from "./Layout/Dashboard/dashboard";
import FAQComponent from "./Layout/components/FAQ/FAQComponent";
import NavBar from "./Layout/Navbar/navBar";
import LearnHowTo from "./Layout/components/Learn_how_to/LearnHowTo";
import OpenTicket from "./Layout/components/OpenTicket/OpenTicket";
import MainHome from "./mainHome";
import FAQDetails from "./Layout/components/FAQ/FAQDetails";
import Footer from "./Layout/Footer/footer";
import TicketManagement from "./Layout/components/TicketManagement/TicketManagement";

function App() {
  const handleLogout = () => {
    console.log("Logging out...");
    // Implement your logout logic here
  };

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/dashboard" element={<DashboardCards />} />

        {/* Segametric-inside routes */}
        <Route
          path="/segametric-inside"
          element={<Dashboard handleLogout={handleLogout} />}
        >
          <Route path="manage-ticket" element={<TicketManagement />} />
          <Route path="learn-how-to" element={<LearnHowTo />} />
          <Route path="trending-faq" element={<FAQComponent />} />
          <Route path="faq-details/:id" element={<FAQDetails />} />
          {/* <Route path="learn-how" element={<LearnHowTo />} /> */}

        </Route>
      </Routes>
      <Footer />
    </Router>
<Footer/>
     </>
  );
}

export default App;

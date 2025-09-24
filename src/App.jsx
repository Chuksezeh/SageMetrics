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
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import DashboardCards from "./Layout/DashboardCards/dashboardCards";
import Dashboard from "./Layout/Dashboard/dashboard";
import FAQComponent from "./Layout/components/FAQ/FAQComponent";
import NavBar from "./Layout/Navbar/navBar";
import LearnHowTo from "./Layout/components/Learn_how_to/LearnHowTo";
// import OpenTicket from "./Layout/components/OpenTicket/OpenTicket";
import MainHome from "./mainHome";
import FAQDetails from "./Layout/components/FAQ/FAQDetails";
import Footer from "./Layout/Footer/footer";
import TicketManagement from "./Layout/components/TicketManagement/TicketManagement";
import AutoLogout from "./AutoLogout";
import NotFoundPage from "./Layout/NoFoundPage/noFoundPage";
import TicketDetails from "./Layout/components/TicketManagement/TicketDetails";
import TicketCreationForm from "./Layout/components/TicketManagement/TicketCreationForm";

function App() {

  // const navigate = useNavigate();

 

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/" element={<MainHome />} />
        <Route path="/dashboard" element={<DashboardCards />} />
        
        {/* Segametric-inside routes */}
       <Route
  path="/segametric-dashboard"
  element={<Dashboard  /> }
>
  {/* 👇 Default route (landing page) */}
  <Route index element={<Navigate to="manage-ticket" replace />} />
 
  <Route
    path="manage-ticket"
    element={
      <AutoLogout>
        <TicketManagement />
      </AutoLogout>
    }
  />
  <Route
    path="manage-ticket/ticket-details"
    element={
      <AutoLogout>
        <TicketDetails />
      </AutoLogout>
    }
  />
  <Route
    path="manage-ticket/ticket-creation-form"
    element={
      <AutoLogout>
        <TicketCreationForm />
      </AutoLogout>
    }
  />
  <Route
    path="learn-how-to"
    element={
      <AutoLogout>
        <LearnHowTo />
      </AutoLogout>
    }
  />
  <Route
    path="trending-faq"
    element={
      <AutoLogout>
        <FAQComponent />
      </AutoLogout>
    }
  />
  <Route
    path="faq-details/:id"
    element={
      <AutoLogout>
        <FAQDetails />
      </AutoLogout>
    }
  />
</Route>
      </Routes>
      <Footer />
    </Router>

     </>
  );
}

export default App;

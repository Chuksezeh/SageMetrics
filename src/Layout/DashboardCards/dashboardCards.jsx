import React from "react";
import "./dashboardCards.css";
import NavBar from "../Navbar/navBar";
import { Link } from "react-router-dom";

const DashboardCards = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Link className="datcard my-3" to="/manage-categories">
            <span style={{ color: "white" }} className="h4">
              Manage Categories
            </span>
            <p>Click here to go to the manage categories page.</p>
            <div className="go-corner"></div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link className="datcard my-3" to="/reports">
            <span style={{ color: "white" }} className="h4">
              See Reports
            </span>
            <p>View and download reports for all of your data.</p>
            <div className="go-corner"></div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link className="datcard my-3" to="/add-users">
            <span style={{ color: "white" }} className="h4">
              Add Users
            </span>
            <p>Control who sees what.</p>
            <div className="go-corner"></div>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="wrimagecard wrimagecard-topimage">
            <div className="wrimagecard-topimage_header">
              <i className="fas fa-users cardIcon"></i>
            </div>
            <div className="wrimagecard-topimage_title h-140">
              <h2 className="h4 text-center">Ticket</h2>
              <p>Manage Ticket</p>
            </div>
            <div className="card-action-bar">
              <Link
                className="float-lg-none link"
                to="/segametric-inside/manage-ticket"
              >
                Open/edit Ticket
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="wrimagecard wrimagecard-topimage">
            <div className="wrimagecard-topimage_header">
              <i className="fas fa-desktop cardIcon"></i>
            </div>
            <Link
              to="/segametric-inside/trending-faq"
              className="wrimagecard-topimage_title h-140"
            >
              <h2 className="h4 text-center">FAQ’s</h2>
              <p>Trending FAQ’s </p>
            </Link>
            <div className="card-action-bar">
              <Link
                className="float-right link"
                to="/segametric-inside/trending-faq"
              >
                See FAQ’s
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="wrimagecard wrimagecard-topimage">
            <div className="wrimagecard-topimage_header">
              <i className="far fa-envelope cardIcon"></i>
            </div>
            <div className="wrimagecard-topimage_title h-140">
              <h2 className="h4 text-center">Learn-how-to</h2>
              <p> Topics </p>
            </div>
            <div className="card-action-bar">
              <Link
                className="float-right link"
                to="/segametric-inside/learn-how-to"
              >
                How to
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

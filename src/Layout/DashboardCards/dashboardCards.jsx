

import React from "react";
import './dashboardCards.css';
import NavBar from "../Navbar/navBar";

const DashboardCards = () => {
  return (
    <div className="container">
      {/* <h4
        className="display-4"
        style={{ fontSize: "2rem" }}
      >
        Having an Admin Dashboard that is clean, concise, and unique can make
        your application personal and effective.
      </h4>

      <p className="lead">
        Here are some styles we have done before, but we are always open to new
        and creative ideas.
      </p> */}

      <div className="row">
        <div className="col-md-4">
          <a className="datcard my-3" href="/AuburnAnswers/Admin/ManageCategory">
            <span style={{ color: "white" }} className="h4">
              Manage Categories
            </span>
            <p>Click here to go to the manage categories page.</p>
            <div className="go-corner"></div>
          </a>
        </div>
        <div className="col-md-4">
          <a className="datcard my-3" href="/AuburnAnswers/Admin/ManageCategory">
            <span style={{ color: "white" }} className="h4">
              See Reports
            </span>
            <p>View and download reports for all of your data.</p>
            <div className="go-corner"></div>
          </a>
        </div>
        <div className="col-md-4">
          <a className="datcard my-3" href="/AuburnAnswers/Admin/ManageCategory">
            <span style={{ color: "white" }} className="h4">
              Add Users
            </span>
            <p>Control who sees what.</p>
            <div className="go-corner"></div>
          </a>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="wrimagecard wrimagecard-topimage">
            <div className="wrimagecard-topimage_header">
              <i className="fas fa-users cardIcon"></i>
            </div>
            <div className="wrimagecard-topimage_title h-140">
              <h2 className="h4 text-center">Big Event Staff</h2>
              <p>Contains the list of staff members for The Big Event.</p>
            </div>
            <div className="card-action-bar">
              <a className="float-lg-none link">View Staff</a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="wrimagecard wrimagecard-topimage">
            <div className="wrimagecard-topimage_header">
              <i className="fas fa-desktop cardIcon"></i>
            </div>
            <div className="wrimagecard-topimage_title h-140">
              <h2 className="h4 text-center">Dashboard</h2>
              <p>View Event status and communicate with team members.</p>
            </div>
            <div className="card-action-bar">
              <a className="float-right link">View Dashboard</a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="wrimagecard wrimagecard-topimage">
            <div className="wrimagecard-topimage_header">
              <i className="far fa-envelope cardIcon"></i>
            </div>
            <div className="wrimagecard-topimage_title h-140">
              <h2 className="h4 text-center">Email Hub</h2>
              <p>Edit email templates sent by the application.</p>
            </div>
            <div className="card-action-bar">
              <a className="float-right link">View Templates</a>
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ marginBottom: "3em" }} className="app">
        <ul className="list" style={{ display: "contents" }}>
          <li style={{ display: "block" }}>
            <a
              href="/DevHome/DevPage/6"
              target="_blank"
              className="card tile text-dark"
            >
              <div className="card-header topper"></div>
              <div
                style={{ display: "flex" }}
                className="card-body flex-column"
              >
                <strong className="display-4 Title">JavaScript</strong>
                <span className="fab fa-js-square fa-3x mb-auto mt-auto"></span>
              </div>
            </a>
          </li>
          <li style={{ display: "block" }}>
            <a
              href="/DevHome/DevPage/7"
              target="_blank"
              className="card tile text-dark"
            >
              <div className="card-header topper"></div>
              <div
                style={{ display: "flex" }}
                className="card-body flex-column"
              >
                <strong className="display-4 Title">CSS</strong>
                <span className="fab fa-css3-alt fa-3x mb-auto mt-auto"></span>
              </div>
            </a>
          </li>
          <li style={{ display: "block" }}>
            <a
              href="/DevHome/DevPage/9"
              target="_blank"
              className="card tile text-dark"
            >
              <div className="card-header topper"></div>
              <div
                style={{ display: "flex" }}
                className="card-body flex-column"
              >
                <strong className="display-4 Title">SQL</strong>
                <span className="fas fa-database mb-auto fa-3x mt-auto"></span>
              </div>
            </a>
          </li>
          <li style={{ display: "block" }}>
            <a
              href="/DevHome/DevPage/11"
              target="_blank"
              className="card tile text-dark"
            >
              <div className="card-header topper"></div>
              <div
                style={{ display: "flex" }}
                className="card-body flex-column"
              >
                <strong className="display-4 Title">Teams</strong>
                <span className="fas fa-user-friends mb-auto fa-3x mt-auto"></span>
              </div>
            </a>
          </li>
          <li style={{ display: "block" }}>
            <a
              href="/DevHome/DevPage/12"
              target="_blank"
              className="card tile text-dark"
            >
              <div className="card-header topper"></div>
              <div
                style={{ display: "flex" }}
                className="card-body flex-column"
              >
                <strong className="display-4 Title">Jira</strong>
                <span className="fab fa-jira mb-auto fa-3x mt-auto"></span>
              </div>
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default DashboardCards;
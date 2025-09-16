import React from "react";
import { Input, Nav } from "reactstrap";
import "./homePage.css";
import NavBar from "../Layout/Navbar/navBar";
import newLogo from "../Images/redesignLogo2.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer/footer";
const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="mainContainer">
        <div className="wrapper main-kin p-3 p-md-4 p-lg-5">
          <div className="logiform-container py-4">
            <div className="flex-container d-flex flex-wrap  bg-light p-0">
              <div className="column d-block p-3 p-md-4 p-lg-5 p getstarted-col">
                <div className="d-flex gap-4 content p-3 px-md-4 py-md-5 px-lg-5 child-w-100 flex-wrap position-relative h-100 align-items-center">
                  <div className="back-arrow position-relative">
                    <img src={newLogo} style={{ width: "80px" }} />
                  </div>
                  <div className="text-content position-relative">
                    <span className="text-secondary2">Hi Welcome!</span>
                    <h2 className="text-white">
                      SageMetrcis - Tech Support System.
                    </h2>
                    <p className="text-secondary2 mt-4">
                      Log in with your Vitel Wireless iPartner account to access
                      your dashboard and tools.
                    </p>
                  </div>
                  <div className="content-icon position-relative">
                    <img
                      src="https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png"
                      alt=""
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="column d-block inpulControl p-3 d-flex   h-100">
                <div className="content">
                  <div className="form-wrapper py-4">
                    <h2 className="mb-4">Login</h2>
                    <form action="">
                      <div className="form-input con-input-div mb-3 p-0">
                        <label
                          for="youremail"
                          className="text-secondary label-margin"
                        >
                          Email Address
                        </label>
                        <div className="input-relative position-relative mt-1 mt-lg-2">
                          <Input
                            type="text"
                            className="default-input  py-1 ps-3 py-lg-2 input-required"
                            name="yourEmail"
                            id="yourEmail"
                            maxlength="40"
                          ></Input>
                          <div className="nameinput-icon-feedback icon-feedback">
                            <i className="fa-solid fa-circle-exclamation text-danger icon"></i>
                            <i className="fa-solid fa-circle-check text-success icon"></i>
                          </div>
                        </div>
                        <small className="email-error-feedback error-feedback text-danger text-small"></small>
                      </div>
                      <div className="form-input con-input-div mb-3 p-0">
                        <label
                          for="yourpassword"
                          className="text-secondary label-margin"
                        >
                          Password
                        </label>
                        <div className="input-relative position-relative mt-1 mt-lg-2">
                          <Input
                            type="password"
                            className="default-input  py-1 ps-3 py-lg-2 input-required"
                            name="yourPassword"
                            id="yourPassword"
                            maxlength="40"
                          ></Input>
                          <div className="nameinput-icon-feedback icon-feedback">
                            <i className="fa-solid fa-circle-exclamation text-danger icon"></i>
                            <i className="fa-solid fa-circle-check text-success icon"></i>
                          </div>
                          <div id="showPassword" className="show-password">
                            <i className="fa-solid fa-eye icon"></i>
                            <i className="fa-solid fa-eye-slash icon"></i>
                          </div>
                        </div>
                        <small>
                          <a
                            href="javascript:void(0)"
                            className="show-password"
                          ></a>
                        </small>
                        <small className="pw-error-feedback error-feedback text-danger text-small"></small>
                      </div>
                      <div className="form-check mb-3 p-0 label-margin">
                        <input
                          type="checkbox"
                          name="rememberme"
                          id="rememberMe"
                        />
                        <label for="rememberMe ">Remember me</label>
                      </div>
                      <div className="form-submit">
                        <button
                          onClick={handleLogin}
                          id="btnCreateAccount"
                          type="button"
                          className="btn  w-100  py-lg-2 mt-1 mt-lg-2 "
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React from "react";
import './navBar.css';
import logo from "../../Images/redesignLogo2.jpg"

const NavBar = () => {
  return (
    <>
      <header>
        <div className="containe-main">
          <input type="checkbox" name="check" id="check" />
          <div className="logo-container">
            <h3 className="logo">
           Vitel<span>wireless</span>
            </h3>
          </div>

          <div className="nav-btn">
            <div className="nav-links">
              <ul>
                <li className="nav-link" style={{ "--i": ".6s" }}>
                  <a href="#">Home</a>
                </li>
                <li className="nav-link" style={{ "--i": ".85s" }}>
                  <a href="#">
                    Menu<i className="fas fa-caret-down"></i>
                  </a>
                  {/* <div className="dropdown">
                    <ul>
                      <li className="dropdown-link">
                        <a href="#">Link 1</a>
                      </li>
                      <li className="dropdown-link">
                        <a href="#">Link 2</a>
                      </li>
                      <li className="dropdown-link">
                        <a href="#">
                          Link 3<i className="fas fa-caret-down"></i>
                        </a>
                        <div className="dropdown second">
                          <ul>
                            <li className="dropdown-link">
                              <a href="#">Link 1</a>
                            </li>
                            <li className="dropdown-link">
                              <a href="#">Link 2</a>
                            </li>
                            <li className="dropdown-link">
                              <a href="#">Link 3</a>
                            </li>
                            <li className="dropdown-link">
                              <a href="#">
                                More<i className="fas fa-caret-down"></i>
                              </a>
                              <div className="dropdown second">
                                <ul>
                                  <li className="dropdown-link">
                                    <a href="#">Link 1</a>
                                  </li>
                                  <li className="dropdown-link">
                                    <a href="#">Link 2</a>
                                  </li>
                                  <li className="dropdown-link">
                                    <a href="#">Link 3</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="dropdown-link">
                        <a href="#">Link 4</a>
                      </li>
                    </ul>
                  </div> */}
                </li>
                <li className="nav-link" style={{ "--i": "1.1s" }}>
                  <a href="#">
                    Services<i className="fas fa-caret-down"></i>
                  </a>
                  <div className="dropdown">
                    <ul>
                      <li className="dropdown-link">
                        <a href="#">Link 1</a>
                      </li>
                      <li className="dropdown-link">
                        <a href="#">Link 2</a>
                      </li>
                      <li className="dropdown-link">
                        <a href="#">
                          Link 3<i className="fas fa-caret-down"></i>
                        </a>
                        <div className="dropdown second">
                          <ul>
                            <li className="dropdown-link">
                              <a href="#">Link 1</a>
                            </li>
                            <li className="dropdown-link">
                              <a href="#">Link 2</a>
                            </li>
                            <li className="dropdown-link">
                              <a href="#">Link 3</a>
                            </li>
                            <li className="dropdown-link">
                              <a href="#">
                                More<i className="fas fa-caret-down"></i>
                              </a>
                              <div className="dropdown second">
                                <ul>
                                  <li className="dropdown-link">
                                    <a href="#">Link 1</a>
                                  </li>
                                  <li className="dropdown-link">
                                    <a href="#">Link 2</a>
                                  </li>
                                  <li className="dropdown-link">
                                    <a href="#">Link 3</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="dropdown-link">
                        <a href="#">Link 4</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-link" style={{ "--i": "1.35s" }}>
                  <a href="#">About</a>
                </li>
              </ul>
            </div>
            {/* <div className="log-sign" style={{ "--i": "1.8s" }}>
              <a href="#" className="btn transparent">
                Log in
              </a>
              <a href="#" className="btn solid">
                Sign up
              </a>
            </div> */}
          </div>

          <div className="hamburger-menu-container">
            <div className="hamburger-menu">
              <div></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
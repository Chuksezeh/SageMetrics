import React, { use } from "react";
import './navBar.css';
import logo from "../../Images/redesignLogo2.jpg"
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const NavBar = () => {

    const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
      }
 const navigateToDashboard = () => {
        navigate("/dashboard");
      }
  

      const handleLogout = () => {
        localStorage.removeItem("SageData");
        navigate("/");
        
      }

  return (
    <>
      <header>
        <div className="containe-main">
          <input type="checkbox" name="check" id="check" />
          <div className="logo-container">
            <h3 className="logo" style={{color:"white", cursor:"pointer"}} onClick={navigateToHome}>
           Vitel<span style={{color:"#3ac1f1"}}>wireless</span>
            </h3>
          </div>

          <div className="nav-btn">
            <div className="nav-links">
              <ul>
                <li className="nav-link" style={{ "--i": ".6s" }} onClick={navigateToHome}>
                  <a href="#">Home</a>
                </li>
                <li className="nav-link" style={{ "--i": ".85s" }}>
                    {
                    userdata ? <a onClick={navigateToDashboard} style={{cursor:"pointer", color:"white", fontWeight:"bold"}}>
                     My Account <i className="fas fa-caret-down"></i>
                  </a> : <a  onClick={navigateToHome}><span style={{color:"white", fontWeight:"bold"}}>Login</span></a>
                    }
                 
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
           n                  </li>
                          </ul>
                        </div>
                      </li>
                      <li className="dropdown-link">
                        <a href="#">Link 4</a>
                        </li>
                    </ul>
                  </div> */}
                </li>
                   {/* <li className="nav-link" style={{ "--i": "1.1s" }}>
                  <a href="#">
                    Services <i className="fas fa-caret-down"></i>
                  </a>
                 
                   </li> */}
                  {
                    userdata ?  <li className="nav-link" style={{ "--i": "1.35s" }} onClick={handleLogout} >
                   <a href="#">Logout <i style={{marginLeft:"5px"}}><IoIosLogOut /></i></a>
                  </li> : null
                  }
                 


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
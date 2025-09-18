import React, { useEffect } from "react";
import "./dashboardCards.css";
import NavBar from "../Navbar/navBar";
import { Link } from "react-router-dom";
import MainContentDashboard from "./mainContentDasboard";
import { RiArrowRightSLine } from "react-icons/ri";
import { vitelWirelessSageMetrics } from "../../Utilities/axios";

const DashboardCards = () => {

const [partnerCode, setPartnerCode] = React.useState('');
const [codeMessage, setCodeMessage] = React.useState('');
const [verified, setVerified] = React.useState(false); 
const [invalidPartner, setInvalidPartner] = React.useState(false);
const [verifyLoadingPartner, setVerifyLoadingPartner] = React.useState(false);
const [partnerDetails, setPartnerDetails] = React.useState(null);
const [sendData, setSendData] = React.useState(null);     

const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));

 console.log("User Data:", userdata);
 
 const handleVerifyPartner = async data => {
        setVerifyLoadingPartner(true);
        const partner = {
            partnerCode: userdata?.partnerCode
        }
        setSendData(data);
        await vitelWirelessSageMetrics
            .post('/generals/checkPartnerCode', partner)
            .then(res => {
                console.log('respartner', res);
                if (res.data.success === true) {
                    setVerified(true)
                    setCodeMessage(res?.data?.message)
                    setInvalidPartner(false)
                    setPartnerDetails(res?.data?.partnerData)
                } else {
                    setVerified(false)
                    setCodeMessage(res?.data?.message)
                    setInvalidPartner(true)
                }
                setVerifyLoadingPartner(false);
            })
            .catch(err => {
                console.log('err', err);
                setVerifyLoadingPartner(false);
            });
    };

    useEffect(() => {       
        handleVerifyPartner();
    }, []);



  return (
    <div className="container">
         <h5 className=" mt-1 mt-md-0 ms-md-0 p-1"> <span style={{fontWeight:"bold", color: "black"}}> SageMetrics  </span> Dashboard</h5>
      {/* <div className="row">
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
      </div> */}

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
                style={{ fontSize: "16px", fontWeight: "700" }}
              >
                Open/edit Ticket <RiArrowRightSLine size={25}/>
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
                 style={{ fontSize: "16px", fontWeight: "700" }}
              >
                See FAQ’s  <RiArrowRightSLine size={25}/>
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
                style={{ fontSize: "16px", fontWeight: "700" }}
              >
               See How to  <RiArrowRightSLine size={25}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
       <MainContentDashboard />
    </div>
  );
};

export default DashboardCards;


import React, { useEffect, useRef, useState } from "react";
// import { Chart, registerables } from "chart.js";
import "./dashboardLayout.scss";
import Chart from "https://esm.sh/chart.js/auto";
import { vitelWirelessSageMetrics } from "../../Utilities/axios";
import moment from "moment";


const MainContentDashboard = () => {
  const chartRef = useRef(null);
  const paginationWrapperRef = useRef(null);
  const morphRef = useRef(null);


const [partnerCode, setPartnerCode] = React.useState('');
const [codeMessage, setCodeMessage] = React.useState('');
const [verified, setVerified] = React.useState(false); 
const [invalidPartner, setInvalidPartner] = React.useState(false);
const [verifyLoadingPartner, setVerifyLoadingPartner] = React.useState(false);
const [partnerDetails, setPartnerDetails] = React.useState(null);
// const [mainPartnerLocation, setMainPartnerLocation] = React.useState(null); 
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



//   const leaderboardData = [
//     {
//       rank: 1,
//       name: "John Doe",
//       points: 500,
//       department: "HR",
//       activity: "Running",
//       lastActive: "2 hours ago",
//       streak: 7,
//       totalActivityTime: "2 hours 30 minutes",
//       achievements: ["Completed Weekly Challenge", "Reached 10,000 Steps"]
//     },
//     {
//       rank: 2,
//       name: "Jane Smith",
//       points: 450,
//       department: "Marketing",
//       activity: "Cycling",
//       lastActive: "1 hour ago",
//       streak: 5,
//       totalActivityTime: "1 hour 45 minutes",
//       achievements: ["Completed Daily Workout"]
//     },
//     {
//       rank: 3,
//       name: "David Lee",
//       points: 400,
//       department: "Engineering",
//       activity: "Yoga",
//       lastActive: "Yesterday",
//       streak: 0,
//       totalActivityTime: "30 minutes",
//       achievements: []
//     },
//     {
//       rank: 4,
//       name: "Sarah Jones",
//       points: 380,
//       department: "Sales",
//       activity: "Swimming",
//       lastActive: "2 days ago",
//       streak: 3,
//       totalActivityTime: "1 hour 15 minutes",
//       achievements: ["Completed Weekly Challenge", "Reached 5000 Steps"]
//     },
//     {
//       rank: 5,
//       name: "Michael Brown",
//       points: 350,
//       department: "Finance",
//       activity: "Hiking",
//       lastActive: "3 days ago",
//       streak: 2,
//       totalActivityTime: "2 hours 00 minutes",
//       achievements: ["Completed Daily Workout"]
//     },
//     {
//       rank: 6,
//       name: "Emily Davis",
//       points: 320,
//       department: "Operations",
//       activity: "Walking",
//       lastActive: "Today",
//       streak: 1,
//       totalActivityTime: "45 minutes",
//       achievements: []
//     },
//     {
//       rank: 7,
//       name: "Daniel Garcia",
//       points: 280,
//       department: "Legal",
//       activity: "Weightlifting",
//       lastActive: "4 days ago",
//       streak: 0,
//       totalActivityTime: "1 hour 30 minutes",
//       achievements: ["Reached 10,000 Steps"]
//     },
//     {
//       rank: 8,
//       name: "Christopher Evans",
//       points: 250,
//       department: "Customer Support",
//       activity: "Running",
//       lastActive: "5 days ago",
//       streak: 1,
//       totalActivityTime: "1 hour 00 minutes",
//       achievements: ["Completed Daily Workout"]
//     },
//     {
//       rank: 9,
//       name: "Olivia Young",
//       points: 220,
//       department: "Design",
//       activity: "Yoga",
//       lastActive: "Today",
//       streak: 1,
//       totalActivityTime: "30 minutes",
//       achievements: []
//     },
//     {
//       rank: 10,
//       name: "James Wilson",
//       points: 200,
//       department: "IT",
//       activity: "Cycling",
//       lastActive: "2 days ago",
//       streak: 0,
//       totalActivityTime: "45 minutes",
//       achievements: ["Completed Weekly Challenge"]
//     }
//   ];

  const partnerLoc = userdata?.partnersloactions;
  console.log("Partner Locations:", partnerLoc);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(partnerLoc.length / 5);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    const activeButton = paginationWrapperRef.current.querySelector(
      `button[data-page="${pageNumber}"]`
    );
    const {
      left,
      top,
      width,
      height,
      borderRadius
    } = activeButton.getBoundingClientRect();
    const {
      left: paginationLeft,
      top: paginationTop
    } = paginationWrapperRef.current.getBoundingClientRect();

    morphRef.current.style.width = `${width}px`;
    morphRef.current.style.height = `${height}px`;
    morphRef.current.style.transform = `translate(${left - paginationLeft}px, ${
      top - paginationTop
    }px)`;
    morphRef.current.style.borderRadius = borderRadius;
    morphRef.current.classList.add("visible");

    // setTimeout(() => morphRef.current.classList.add("has-transition"), 10);
  };

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button
            className="page-link"
            data-page={i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    // const locationLength = partnerLoc?.length;
    

    return (
      <nav
        className="position-relative"
        aria-label="Page navigation"
        ref={paginationWrapperRef}
      >
        <ul className="pagination">{buttons}</ul>
        <div ref={morphRef} className="morph-bg"></div>
      </nav>
    );
  };

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August"
        ],
        datasets: [
          {
            label: "2025 Program",
            data: [12200, 12000, 8000, 18970, 11000, 14500, 9300, 9500],
            backgroundColor: "#4CAF50",
            borderRadius: 10,
            barThickness: 10
          },
          {
            label: "2024 Program",
            data: [9500, 11500, 7500, 16900, 4500, 11410, 8500, 9000],
            backgroundColor: "#A5D6A7",
            borderRadius: 10,
            barThickness: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top"
          }
        }
      }
    });

    return () => myChart.destroy();
  }, []);

  return (
    <div className="p-0 p-md-3">
      {/* <h1 className="h3 mt-4 mt-md-0 ms-md-0 mb-3">Dashboard</h1> */}
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title" style={{fontWeight:"bold"}}>{partnerDetails?.companyName}</h5>
              <p className="text-muted">
                {/* Your team has increased overall activity by 15% this week. Great
                progress! */}
               {partnerDetails?.partnerType}
              </p>
              <div className="row row-cols-1 row-cols-sm-2 g-3">
                <div className="col">
                  <div className="card card-stat h-100">
                    <div className="card-body">
                      <h5 className="card-title">Total Number of Tickets</h5>
                      <p className="card-text display-6 m-0"> 0 </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card card-stat h-100">
                    <div className="card-body">
                      <h5 className="card-title">Open Tickets</h5>
                      <p className="card-text display-6 m-0"> 0 </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card card-stat h-100">
                    <div className="card-body">
                      <h5 className="card-title">FAQ</h5>
                      <p className="card-text display-6 m-0"> 6 </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card card-stat h-100">
                    <div className="card-body">
                      <h5 className="card-title">Company Locations</h5>
                      <p className="card-text display-6 m-0"> {partnerLoc?.length} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Monthly Activity Comparison</h5>
              <div className="chart-wrap" style={{ height: "300px" }}>
                <canvas ref={chartRef} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Partner Locations</h5>
              <div className="row mb-3">
                {/* <div className="col-lg-4">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search by name or department"
                  />
                </div> */}
              </div>
              <table className="table">
                <thead className="bg-light">
                  <tr>
                    <th>SN</th>
                    <th>Location name</th>
                    <th>Date Created</th>
                    {/* <th>Points</th>
                    <th>Activity</th>
                    <th>Streak</th>
                    <th>Last Active</th> */}
                  </tr>
                </thead>
                <tbody>
                  {partnerLoc
                    .slice((currentPage - 1) * 5, currentPage * 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>
                          <a >{user?.businessLocationName}</a>
                        </td>
                        <td> {moment(user.createdDateTime).format("lll")}  </td>
                        {/* <td>{user.points}</td>
                        <td>{user.activity}</td>
                        <td>{user.streak}</td>
                        <td>{user.lastActive}</td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentDashboard;
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./TicketManagement.css";
import "./TicketTable.scss";
import { vitelWirelessSageMetrics } from "../../../Utilities/axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const TicketManagement = () => {
  const [activeTab, setActiveTab] = useState("open");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [pendingTicket, setPendingTicket] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 search state
  const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));
  const navigate = useNavigate();

  const getAllTicket = async () => {
    await vitelWirelessSageMetrics
      .get(`generals/getTicketMgt/${userdata?.partnerId}`)
      .then((res) => {
        setPendingTicket(false);
        console.log("res ticket ticket", res.data.data);
        setTickets(res.data.data);
      })
      .catch((error) => {
        setPendingTicket(false);
        setError(error.message);
        setPendingTicket(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTicket();
  }, []);

  console.log("userdata", userdata);

  useEffect(() => {
    if (!userdata) {
      navigate("/");
    }
  }, [userdata]);

  // Formik hook for edit form
  const editFormik = useFormik({
    initialValues: {
      description: "",
      status: "",
      createdBy: `${userdata?.firstName} ${userdata?.lastName}`,
      partnerId: userdata?.partnerId,
    },
    onSubmit: async (values, { resetForm }) => {
      console.log("Updating ticket:", values);
      await vitelWirelessSageMetrics
        .put(`generals/updateTicketMgt/${selectedTicket.id}`, values)
        .then((res) => {
          console.log("res", res);
          alert("Ticket updated successfully!");
          resetForm();
          setIsEditing(false);
        });
    },
  });

  const handleCreateTicket = () => {
    navigate("ticket-creation-form");
  };

  const handleEditTicket = (ticket) => {
    setIsEditing(true);
    setIsCreating(false);
    setIsViewing(false);
    setSelectedTicket(ticket);
  };

  const handleViewDetails = (ticket) => {
    navigate("ticket-details", { state: { ticket } });
  };

  const handleCloseForm = () => {
    setIsCreating(false);
    setIsEditing(false);
    setIsViewing(false);
    createFormik.resetForm();
    editFormik.resetForm();
  };

  console.log("ticket", tickets);

  // 🔹 Apply tab filter + search filter
  const filteredTickets = tickets
    .filter((ticket) => {
      if (activeTab === "open")
        return ticket.status === "open" || ticket.status === "In Progress";
      if (activeTab === "processing") return ticket.status === "processing";
      if (activeTab === "resolved") return ticket.status === "Resolved";
      return true;
    })
    .filter((ticket) =>
      searchTerm ? ticket.id.toString().includes(searchTerm.trim()) : true
    );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const statusArray = [
    { id: 3, name: "pending", value: "pending" },
    { id: 4, name: "processing", value: "processing" },
    { id: 5, name: "resolved", value: "resolved" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  // Calculate indexes
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  // Number of pages
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
  }
  const isMobile = useIsMobile();
  const wordLimit = isMobile ? 3 : 10;

  return (
    <div className="ticket-management">
      <div className="ticket-header">
        <h1>Ticket Management</h1>
        <button className="create-ticket-btn" onClick={handleCreateTicket}>
          Open New Ticket
        </button>
      </div>

      {/* Ticket Editing Form */}
      {isEditing && selectedTicket && (
        <div className="ticket-form-overlay">
          <div className="ticket-form">
            <div className="form-header">
              <h2>Edit Ticket</h2>
              <button className="close-form" onClick={handleCloseForm}>
                Close
              </button>
            </div>

            <form onSubmit={editFormik.handleSubmit}>
              {/* form content ... unchanged */}
            </form>
          </div>
        </div>
      )}

      {/* Ticket Details View */}

      {/* Tickets List */}
      {!isCreating && !isEditing && !isViewing && (
        <>
          <div className="ticket-tabs">
             <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              All Tickets
            </button>
            <button
              className={activeTab === "open" ? "active" : ""}
              onClick={() => setActiveTab("open")}
            >
              Open Tickets
            </button>
            <button
              className={activeTab === "processing" ? "active" : ""}
              onClick={() => setActiveTab("processing")}
            >
              Processing Tickets
            </button>
            <button
              className={activeTab === "resolved" ? "active" : ""}
              onClick={() => setActiveTab("resolved")}
            >
              Resolved Tickets
            </button>
           
          </div>

          {/* 🔹 Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Ticket ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="search-btn"
              onClick={() => setCurrentPage(1)}
            >
              Search
            </button>
          </div>

          {pendingTicket === true ? (
            <div className="loader-div-Ticket">
              <span className="loader"></span>
            </div>
          ) : null}

          <div className="tickets-list">
            {filteredTickets.length === 0 && !pendingTicket ? (
              <div className="no-tickets">
                <p>No {activeTab} tickets found.</p>
              </div>
            ) : (
              <div className="contai">
                <table className="table">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Ticket Type</th>
                      <th>Updated date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTickets.map((ticket, i) => (
                      <tr key={ticket.id}>
                        <td>{i + 1}</td>
                        <td
                          data-label="Description"
                          style={{ textTransform: "capitalize" }}
                        >
                          {ticket.description
                            ?.split(" ")
                            .slice(0, wordLimit)
                            .join(" ")}
                          {ticket.description?.split(" ").length > wordLimit &&
                            " ..."}
                        </td>
                        <td data-label="Status">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                            className={`status-badge 
                              ${ticket.status === "open" ? "active" : ""}
                              ${ticket.status === "processing" ? "processing" : ""}
                              ${ticket.status === "resolved" ? "resolved" : ""}
                              ${ticket.status === "closed" ? "closed" : ""}
                            `}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td data-label="Ticket Type">{ticket.type}</td>
                        <td data-label="Updated Date">
                          {moment(ticket.updated).format("lll")}
                        </td>

                        <div className="p-4 btn-group-div">
                          <button
                            className="action-btn view-btn"
                            onClick={() => handleViewDetails(ticket)}
                          >
                            View Details
                          </button>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination controls */}
                {filteredTickets.length > ticketsPerPage && (
                  <div className="pagination">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        className={currentPage === index + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketManagement;

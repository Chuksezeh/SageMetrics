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
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));
  const navigate = useNavigate();

  const getAllTicket = async () => {
    await vitelWirelessSageMetrics
      .get(`generals/getTicketMgt/${userdata?.partnerId}`)
      .then((res) => {
        console.log("res ticket ticket", res.data.data);
        setTickets(res.data.data);
        setPendingTicket(false);
      });
  };

  useEffect(() => {
    getAllTicket();
  }, []);

//   console.log("userdata", userdata);

  useEffect(() => {
    if (!userdata) {
      navigate("/");
    }
  }, [userdata]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]); // Clear search results if input is empty
      return;
    }
    const results = tickets.filter((ticket) =>
      ticket.id.toString().includes(searchTerm.trim())
    );
    setSearchResults(results);
  };

  const filteredTickets = searchResults.length > 0 ? searchResults : tickets.filter((ticket) => {
    if (activeTab === "open")
      return ticket.status === "open" || ticket.status === "In Progress";
    if (activeTab === "processing") return ticket.status === "processing";
    if (activeTab === "resolved") return ticket.status === "Resolved";
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

   const handleViewDetails = (ticket) => {
    navigate("ticket-details", { state: { ticket } });
  };

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

  return (
    <div className="ticket-management">
      <div className="ticket-header">
        <h1>Ticket Management</h1>
        <button className="create-ticket-btn" onClick={() => navigate("ticket-creation-form")}>
          Open New Ticket
        </button>
      </div>

      <div className="ticket-tabs">
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
          Processing
        </button>
        <button
          className={activeTab === "resolved" ? "active" : ""}
          onClick={() => setActiveTab("resolved")}
        >
          Resolved Tickets
        </button>
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Tickets
        </button>
      </div>

      <div className="search-container">
        <label>Search by Ticket ID:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Ticket ID"
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {pendingTicket ? (
        <div className="loader-div-Ticket">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="tickets-list">
          {filteredTickets.length === 0 ? (
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
                    <th>Updated Date</th>
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
                          .slice(0, 10)
                          .join(" ")}
                        {ticket.description?.split(" ").length > 10 && " ..."}
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
                          <button className="action-btn view-btn" onClick={() => handleViewDetails(ticket)}>
                            View Details
                          </button>
                        </div>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
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
      )}
    </div>
  );
};

// export default TicketManagement;
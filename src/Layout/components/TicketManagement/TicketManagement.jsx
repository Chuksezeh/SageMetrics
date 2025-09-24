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
  const [tickets, setTickets] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));
  const navigate = useNavigate();

  const getAllTicket = async () => {
    await vitelWirelessSageMetrics
      .get(`generals/getTicketMgt/${userdata?.partnerId}`)
      .then((res) => {
        console.log("res ticket ticket", res.data.data);
        setTickets(res.data.data);
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

  // const categories = ["Network", "Billing", "Device", "Account", "Service"];
  // const issueTypes = {
  //   Network: [
  //     "No Service",
  //     "Slow Speed",
  //     "Intermittent Connection",
  //     "Coverage Issue",
  //   ],
  //   Billing: ["Overcharge", "Payment Issue", "Plan Change", "Refund Request"],
  //   Device: [
  //     "Hardware Issue",
  //     "Software Problem",
  //     "Setup Assistance",
  //     "Warranty Claim",
  //   ],
  //   Account: [
  //     "Password Reset",
  //     "Information Update",
  //     "Security Concern",
  //     "Account Recovery",
  //   ],
  //   Service: ["New Service", "Upgrade", "Downgrade", "Cancellation"],
  // };

  // Validation schema for create form
  // const createValidationSchema = Yup.object({
  //   subscriber: Yup.string()
  //     .required("Subscriber number is required")
  //     .matches(
  //       /^[0-9-]+$/,
  //       "Subscriber number can only contain numbers and hyphens"
  //     )
  //     .min(10, "Subscriber number must be at least 10 characters"),
  //   category: Yup.string().required("Issue category is required"),
  //   type: Yup.string().required("Issue type is required"),
  //   description: Yup.string()
  //     .required("Description is required")
  //     .min(10, "Description must be at least 10 characters")
  //     .max(500, "Description cannot exceed 500 characters"),
  // });

  // // Validation schema for edit form
  // const editValidationSchema = Yup.object({
  //   description: Yup.string()
  //     .required("Comments are required")
  //     .min(10, "Comments must be at least 10 characters")
  //     .max(500, "Comments cannot exceed 500 characters"),
  //   status: Yup.string().required("Issue type is required"),
  // });

  // Formik hook for create form
  // const createFormik = useFormik({
  //   initialValues: {
  //     subscriber: "",
  //     category: "",
  //     type: "",
  //     status: "open",
  //     createdBy: `${userdata?.firstName} ${userdata?.lastName}`,
  //     partnerId: userdata?.partnerId,
  //     description: "",
  //   },
  //   validationSchema: createValidationSchema,
  //   onSubmit: async (values, { resetForm }) => {
  //     console.log("Creating new ticket:", values);
  //     vitelWirelessSageMetrics
  //       .post("generals/createTicketMgt", values)
  //       .then((res) => {
  //         console.log("res ==>", res);
  //         getAllTicket();
  //         alert("New ticket created successfully!");
  //         resetForm();
  //         setIsCreating(false);
  //       });
  //   },
  // });

  // Formik hook for edit form
  const editFormik = useFormik({
    initialValues: {
      description: "",
      status: "",
      createdBy: `${userdata?.firstName} ${userdata?.lastName}`,
      partnerId: userdata?.partnerId,
    },
    // validationSchema: editValidationSchema,
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
    // setIsCreating(true);
    // setIsEditing(false);
    // setIsViewing(false);
    // setSelectedTicket(null);
    // createFormik.resetForm();
    navigate("ticket-creation-form");
  };

  const handleEditTicket = (ticket) => {
    setIsEditing(true);
    setIsCreating(false);
    setIsViewing(false);
    setSelectedTicket(ticket);
    // editFormik.setValues({
    //   comments: "",
    //   status: ticket.status || "",
    // });
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

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "open")
      return ticket.status === "open" || ticket.status === "In Progress";
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

  const statusArray = [
    { id: 3, name: "pending", value: "pending" },
    { id: 4, name: "proccessing", value: "proccessing" },
    { id: 5, name: "resolved", value: "resolved" },
  ];

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
              <div className="form-grid">
                <div className="form-group">
                  <label>Subscriber Number</label>
                  <input
                    type="text"
                    value={selectedTicket.subscriber}
                    disabled
                    className="disabled-field"
                  />
                </div>

                <div className="form-group">
                  <label>Issue Category</label>
                  <input
                    type="text"
                    value={selectedTicket.category}
                    disabled
                    className="disabled-field"
                  />
                </div>

                <div className="form-group">
                  <label>Issue Type</label>
                  <input
                    type="text"
                    value={selectedTicket.type}
                    disabled
                    className="disabled-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={editFormik.values.status}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    className={
                      editFormik.touched.status && editFormik.errors.status
                        ? "error"
                        : ""
                    }
                  >
                    <option value="">Select status</option>
                    {statusArray &&
                      statusArray.map((status, index) => (
                        <option key={index + 1} value={status.value}>
                          {status.value}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="ticket-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">
                      {formatDate(selectedTicket.updated)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Updated By:</span>
                    <span className="detail-value">
                      {selectedTicket.updatedBy || "N/A"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">
                      {selectedTicket.status}
                    </span>
                  </div>
                </div>

                <div className="previous-notes">
                  <h3>Previous Notes:</h3>
                  {selectedTicket?.notes?.length > 0 ? (
                    selectedTicket.notes.map((note, index) => (
                      <div key={index} className="note-item">
                        <div className="note-header">
                          <span className="note-date">
                            {formatDate(note.date)}
                          </span>
                          <span className="note-author">
                            Created by {note.author}
                          </span>
                        </div>
                        <p className="note-text">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <p>No notes available</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comments">
                  Please enter additional comments
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editFormik.values.description}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  rows="4"
                  placeholder="Add your comments here..."
                  className={
                    editFormik.touched.description &&
                    editFormik.errors.description
                      ? "error"
                      : ""
                  }
                />
                {editFormik.touched.description &&
                  editFormik.errors.description && (
                    <div className="error-message">
                      {editFormik.errors.description}
                    </div>
                  )}
                <div className="character-count">
                  {editFormik.values.description.length}/500 characters
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={editFormik.isSubmitting}
                >
                  {editFormik.isSubmitting ? "Updating..." : "Update Ticket"}
                </button>
              </div>
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
              className={activeTab === "open" ? "active" : ""}
              onClick={() => setActiveTab("open")}
            >
              Open Tickets
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

          <div className="tickets-list">
            {filteredTickets.length === 0 ? (
              <div className="no-tickets">
                <p>No {activeTab} tickets found.</p>
              </div>
            ) : (
              // filteredTickets.map((ticket) => (
              //   <div key={ticket.id} className="ticket-card">
              //     <div className="ticket-main">
              //       <div className="ticket-id">{ticket.id}</div>
              //       <div className="ticket-subscriber">{ticket.subscriber}</div>
              //       <div className="ticket-category">{ticket.category}</div>
              //       <div className="ticket-type">{ticket.type}</div>
              //       <div
              //         className={`ticket-status ${ticket.status
              //           .toLowerCase()
              //           .replace(" ", "-")}`}
              //       >
              //         {ticket.status}
              //       </div>
              //       <div
              //         className={`ticket-priority ${ticket?.priority?.toLowerCase()}`}
              //       >
              //         {ticket.priority}
              //       </div>
              //     </div>

              //     <div className="ticket-description">
              //       <p>{ticket.description}</p>
              //     </div>

              //     <div className="ticket-footer">
              //       <div className="ticket-dates">
              //         <span>
              //           Created: {formatDate(ticket.created)} by{" "}
              //           {ticket.createdBy}
              //         </span>
              //         <span>
              //           Updated: {formatDate(ticket.updated)} by{" "}
              //           {ticket.updatedBy}
              //         </span>
              //       </div>

              //       <div className="ticket-actions">
              //         <button
              //           className="action-btn edit-btn"
              //           onClick={() => handleEditTicket(ticket)}
              //         >
              //           Edit
              //         </button>
              //         <button
              //           className="action-btn view-btn"
              //           onClick={() => handleViewDetails(ticket)}
              //         >
              //           View Details
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // ))

              <div class="contai">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Ticket Type</th>
                      <th>Updated date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td data-label="Description">{ticket.description} </td>
                        <td data-label="Status">
                          <span
                            className={`status-badge ${
                              ticket.status === "open" ? "active" : "Open"
                            } ${
                              ticket.status === "In Progress"
                                ? "in-progress"
                                : "Open"
                            } 
                  ${ticket.status === "Resolved" ? "resolved" : "Open"} ${
                              ticket.status === "closed" ? "closed" : "Open"
                            } ${
                              ticket.status === "cancelled"
                                ? "cancelled"
                                : "Open"
                            } ${
                              ticket.status === "proccessing"
                                ? "proccessing"
                                : "Open"
                            } 
                  ${ticket.status === "completed" ? "completed" : "Open"}  ${
                              ticket.status === "on-hold" ? "on-hold" : "Open"
                            }  ${
                              ticket.status === "reopened" ? "reopened" : "Open"
                            }  ${
                              ticket.status === "escalated"
                                ? "escalated"
                                : "Open"
                            }  
                  ${ticket.status === "new" ? "new" : "Open"}  ${
                              ticket.status === "assigned" ? "assigned" : "Open"
                            }  ${
                              ticket.status === "deferred" ? "deferred" : "Open"
                            }  ${
                              ticket.status === "waiting on customer"
                                ? "waiting-on-customer"
                                : "Open"
                            }  
                  ${
                    ticket.status === "waiting on third party"
                      ? "waiting-on-third-party"
                      : "Open"
                  }  ${ticket.status === "hold" ? "hold" : "Open"}  ${
                              ticket.status === "pending" ? "pending" : "Open"
                            }`}
                          >
                            {ticket.status === "pending" ? "pending" : "Open"}
                          </span>
                        </td>
                        <td data-label="Ticket Type">{ticket.type} </td>
                        <td data-label="Updated Date">
                          {" "}
                          {moment(ticket.updated).format("lll")}{" "}
                        </td>

                        <div className="p-4  btn-group-div">
                          {/* <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditTicket(ticket)}
                      >
                        Edit
                      </button> */}
                          <button
                            className="action-btn view-btn"
                            onClick={() => handleViewDetails(ticket)}
                          >
                            View Details
                          </button>
                        </div>
                      </tr>
                    ))}

                    {/* <tr>
                  <td data-label="first-name">July</td>
                  <td data-label="last-name">Dooley</td>
                  <td data-label="email">july@example.com</td>
                   <div className="p-4 btn-group-div">
                   <button
                        className="action-btn edit-btn"
                        // onClick={() => handleEditTicket(ticket)}
                      >
                        Edit
                      </button>
                  <button
                    className="action-btn view-btn"
                  // onClick={() => handleViewDetails(ticket)}
                  >
                    View Details
                  </button>
                   </div>
                 
                </tr> */}
                    {/* <tr>
                  <td data-label="first-name">July</td>
                  <td data-label="last-name">Dooley</td>
                  <td data-label="email">july@example.com</td>
                   <div className="p-4 btn-group-div">
                   <button
                        className="action-btn edit-btn"
                        // onClick={() => handleEditTicket(ticket)}
                      >
                        Edit
                      </button>
                  <button
                    className="action-btn view-btn"
                  // onClick={() => handleViewDetails(ticket)}
                  >
                    View Details
                  </button>
                   </div>
                 
                </tr> */}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketManagement;

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./TicketManagement.css";
import { vitelWirelessSageMetrics } from "../../../Utilities/axios";
import { useNavigate } from "react-router-dom";

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
        console.log("res", res.data.data);
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

  const categories = ["Network", "Billing", "Device", "Account", "Service"];
  const issueTypes = {
    Network: [
      "No Service",
      "Slow Speed",
      "Intermittent Connection",
      "Coverage Issue",
    ],
    Billing: ["Overcharge", "Payment Issue", "Plan Change", "Refund Request"],
    Device: [
      "Hardware Issue",
      "Software Problem",
      "Setup Assistance",
      "Warranty Claim",
    ],
    Account: [
      "Password Reset",
      "Information Update",
      "Security Concern",
      "Account Recovery",
    ],
    Service: ["New Service", "Upgrade", "Downgrade", "Cancellation"],
  };

  // Validation schema for create form
  const createValidationSchema = Yup.object({
    subscriber: Yup.string()
      .required("Subscriber number is required")
      .matches(
        /^[0-9-]+$/,
        "Subscriber number can only contain numbers and hyphens"
      )
      .min(10, "Subscriber number must be at least 10 characters"),
    category: Yup.string().required("Issue category is required"),
    type: Yup.string().required("Issue type is required"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description cannot exceed 500 characters"),
  });

  // Validation schema for edit form
  const editValidationSchema = Yup.object({
    description: Yup.string()
      .required("Comments are required")
      .min(10, "Comments must be at least 10 characters")
      .max(500, "Comments cannot exceed 500 characters"),
    status: Yup.string().required("Issue type is required"),
  });

  // Formik hook for create form
  const createFormik = useFormik({
    initialValues: {
      subscriber: "",
      category: "",
      type: "",
      status: "open",
      createdBy: `${userdata?.firstName} ${userdata?.lastName}`,
      partnerId: userdata?.partnerId,
      description: "",
    },
    validationSchema: createValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Creating new ticket:", values);
      vitelWirelessSageMetrics
        .post("generals/createTicketMgt", values)
        .then((res) => {
          console.log("res ==>", res);
          getAllTicket();
          alert("New ticket created successfully!");
          resetForm();
          setIsCreating(false);
        });
    },
  });

  // Formik hook for edit form
  const editFormik = useFormik({
    initialValues: {
      description: "",
      status: "",
      createdBy: `${userdata?.firstName} ${userdata?.lastName}`,
      partnerId: userdata?.partnerId,
    },
    validationSchema: editValidationSchema,
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
    setIsCreating(true);
    setIsEditing(false);
    setIsViewing(false);
    setSelectedTicket(null);
    createFormik.resetForm();
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
    setIsViewing(true);
    setIsCreating(false);
    setIsEditing(false);
    setSelectedTicket(ticket);
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

      {/* Ticket Creation Form */}
      {isCreating && (
        <div className="ticket-form-overlay">
          <div className="ticket-form">
            <div className="form-header">
              <h2>Open New Ticket</h2>
              <button className="close-form" onClick={handleCloseForm}>
                Close
              </button>
            </div>

            <form onSubmit={createFormik.handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="subscriber">Subscriber Number</label>
                  <input
                    id="subscriber"
                    type="text"
                    name="subscriber"
                    value={createFormik.values.subscriber}
                    onChange={createFormik.handleChange}
                    onBlur={createFormik.handleBlur}
                    placeholder="Enter subscriber number (e.g., 123-456-7890)"
                    className={
                      createFormik.touched.subscriber &&
                      createFormik.errors.subscriber
                        ? "error"
                        : ""
                    }
                  />
                  {createFormik.touched.subscriber &&
                    createFormik.errors.subscriber && (
                      <div className="error-message">
                        {createFormik.errors.subscriber}
                      </div>
                    )}
                </div>

                <div className="form-group">
                  <label htmlFor="category">Issue Category</label>
                  <select
                    id="category"
                    name="category"
                    value={createFormik.values.category}
                    onChange={createFormik.handleChange}
                    onBlur={createFormik.handleBlur}
                    className={
                      createFormik.touched.category &&
                      createFormik.errors.category
                        ? "error"
                        : ""
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {createFormik.touched.category &&
                    createFormik.errors.category && (
                      <div className="error-message">
                        {createFormik.errors.category}
                      </div>
                    )}
                </div>

                <div className="form-group">
                  <label htmlFor="type">Issue Type</label>
                  <select
                    id="type"
                    name="type"
                    value={createFormik.values.type}
                    onChange={createFormik.handleChange}
                    onBlur={createFormik.handleBlur}
                    disabled={!createFormik.values.category}
                    className={
                      createFormik.touched.type && createFormik.errors.type
                        ? "error"
                        : ""
                    }
                  >
                    <option value="">Select Type</option>
                    {createFormik.values.category &&
                      issueTypes[createFormik.values.category].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
                  {createFormik.touched.type && createFormik.errors.type && (
                    <div className="error-message">
                      {createFormik.errors.type}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Please describe the issue in details
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={createFormik.values.description}
                  onChange={createFormik.handleChange}
                  onBlur={createFormik.handleBlur}
                  rows="4"
                  placeholder="Describe the issue in detail..."
                  className={
                    createFormik.touched.description &&
                    createFormik.errors.description
                      ? "error"
                      : ""
                  }
                />
                {createFormik.touched.description &&
                  createFormik.errors.description && (
                    <div className="error-message">
                      {createFormik.errors.description}
                    </div>
                  )}
                <div className="character-count">
                  {createFormik.values.description.length}/500 characters
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={createFormik.isSubmitting}
                >
                  {createFormik.isSubmitting ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
      {isViewing && selectedTicket && (
        <div className="ticket-form-overlay">
          <div className="ticket-form">
            <div className="form-header">
              <h2>Ticket Details</h2>
              <button className="close-form" onClick={handleCloseForm}>
                Close
              </button>
            </div>

            <div className="ticket-details-view">
              <div className="details-grid">
                <div className="detail-row">
                  <span className="detail-label">Ticket ID:</span>
                  <span className="detail-value">{selectedTicket.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Subscriber Number:</span>
                  <span className="detail-value">
                    {selectedTicket.subscriber}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">
                    {selectedTicket.category}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{selectedTicket.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`detail-value status ${selectedTicket.status?.toLowerCase()}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">
                    {formatDate(selectedTicket.created)} by{" "}
                    {selectedTicket.createdBy || "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Updated:</span>
                  <span className="detail-value">
                    {formatDate(selectedTicket.updated)} by{" "}
                    {selectedTicket.updatedBy || "N/A"}
                  </span>
                </div>
              </div>

              <div className="description-section">
                <h3>Description</h3>
                <div className="description-content">
                  <p>{selectedTicket.description}</p>
                </div>
              </div>

              <div className="notes-section">
                <h3>Notes & Comments</h3>
                {selectedTicket?.notes?.length > 0 ? (
                  selectedTicket.notes.map((note, index) => (
                    <div key={index} className="note-item">
                      <div className="note-header">
                        <span className="note-date">
                          {formatDate(note.date)}
                        </span>
                        <span className="note-author">by {note.author}</span>
                      </div>
                      <p className="note-text">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-notes">No notes available</p>
                )}
              </div>

              <div className="view-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEditTicket(selectedTicket)}
                >
                  Edit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-main">
                    <div className="ticket-id">{ticket.id}</div>
                    <div className="ticket-subscriber">{ticket.subscriber}</div>
                    <div className="ticket-category">{ticket.category}</div>
                    <div className="ticket-type">{ticket.type}</div>
                    <div
                      className={`ticket-status ${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {ticket.status}
                    </div>
                    <div
                      className={`ticket-priority ${ticket?.priority?.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </div>
                  </div>

                  <div className="ticket-description">
                    <p>{ticket.description}</p>
                  </div>

                  <div className="ticket-footer">
                    <div className="ticket-dates">
                      <span>
                        Created: {formatDate(ticket.created)} by{" "}
                        {ticket.createdBy}
                      </span>
                      <span>
                        Updated: {formatDate(ticket.updated)} by{" "}
                        {ticket.updatedBy}
                      </span>
                    </div>

                    <div className="ticket-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditTicket(ticket)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewDetails(ticket)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketManagement;

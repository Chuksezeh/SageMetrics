import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./TicketManagement.css";

const TicketManagement = () => {
  const [activeTab, setActiveTab] = useState("open");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Sample data
  const tickets = [
    {
      id: "TKT-001",
      subscriber: "123-456-7890",
      category: "Network",
      type: "No Service",
      description: "Customer reports no network signal in their area",
      status: "Open",
      priority: "High",
      created: "2023-10-15 09:30",
      updated: "2023-10-16 14:15",
      createdBy: "John Doe",
      updatedBy: "Jane Smith",
      notes: [
        {
          date: "2023-10-15 09:30",
          author: "John Doe",
          text: "Ticket created - customer reports no service since morning",
        },
        {
          date: "2023-10-16 14:15",
          author: "Jane Smith",
          text: "Checked network status - outage reported in customer area. ETA for resolution: 2 hours",
        },
      ],
    },
    {
      id: "TKT-002",
      subscriber: "987-654-3210",
      category: "Billing",
      type: "Overcharge",
      description: "Customer disputing last month bill amount",
      status: "In Progress",
      priority: "Medium",
      created: "2023-10-14 11:20",
      updated: "2023-10-16 10:45",
      createdBy: "Mike Johnson",
      updatedBy: "Mike Johnson",
      notes: [
        {
          date: "2023-10-14 11:20",
          author: "Mike Johnson",
          text: "Customer states bill is $50 higher than expected",
        },
        {
          date: "2023-10-15 15:30",
          author: "Mike Johnson",
          text: "Reviewed bill details - found additional data charges",
        },
      ],
    },
    {
      id: "TKT-003",
      subscriber: "555-123-4567",
      category: "Device",
      type: "Hardware Issue",
      description: "Phone not charging properly",
      status: "Resolved",
      priority: "Medium",
      created: "2023-10-10 13:45",
      updated: "2023-10-12 16:20",
      createdBy: "Sarah Wilson",
      updatedBy: "Sarah Wilson",
      notes: [
        {
          date: "2023-10-10 13:45",
          author: "Sarah Wilson",
          text: "Customer reports charging port issues",
        },
        {
          date: "2023-10-12 16:20",
          author: "Sarah Wilson",
          text: "Recommended device replacement - customer agreed",
        },
      ],
    },
  ];

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
    comments: Yup.string()
      .required("Comments are required")
      .min(10, "Comments must be at least 10 characters")
      .max(500, "Comments cannot exceed 500 characters"),
  });

  // Formik hook for create form
  const createFormik = useFormik({
    initialValues: {
      subscriber: "",
      category: "",
      type: "",
      description: "",
    },
    validationSchema: createValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Creating new ticket:", values);
      alert("New ticket created successfully!");
      resetForm();
      setIsCreating(false);
    },
  });

  // Formik hook for edit form
  const editFormik = useFormik({
    initialValues: {
      comments: "",
    },
    validationSchema: editValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Updating ticket:", selectedTicket.id, values);
      alert("Ticket updated successfully!");
      resetForm();
      setIsEditing(false);
    },
  });

  const handleCreateTicket = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedTicket(null);
    createFormik.resetForm();
  };

  const handleEditTicket = (ticket) => {
    setIsEditing(true);
    setIsCreating(false);
    setSelectedTicket(ticket);
    editFormik.resetForm();
  };

  const handleCloseForm = () => {
    setIsCreating(false);
    setIsEditing(false);
    createFormik.resetForm();
    editFormik.resetForm();
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "open")
      return ticket.status === "Open" || ticket.status === "In Progress";
    if (activeTab === "resolved") return ticket.status === "Resolved";
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

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
                      {selectedTicket.updatedBy}
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
                  {selectedTicket.notes.map((note, index) => (
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
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comments">
                  Please enter additional comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={editFormik.values.comments}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  rows="4"
                  placeholder="Add your comments here..."
                  className={
                    editFormik.touched.comments && editFormik.errors.comments
                      ? "error"
                      : ""
                  }
                />
                {editFormik.touched.comments && editFormik.errors.comments && (
                  <div className="error-message">
                    {editFormik.errors.comments}
                  </div>
                )}
                <div className="character-count">
                  {editFormik.values.comments.length}/500 characters
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

      {/* Tickets List */}
      {!isCreating && !isEditing && (
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
                      className={`ticket-priority ${ticket.priority.toLowerCase()}`}
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
                      <button className="action-btn view-btn">
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

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiPaperclip, FiImage, FiX, FiSend } from "react-icons/fi";
import "./TicketDetails.css";
import { vitelWirelessSageMetrics } from "../../../Utilities/axios";

const TicketDetails = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [allTicketNote, setAllTicketNote] = useState([]);
  const [noteAttachments, setNoteAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("SageData") || "{}");
  const location = useLocation();
  let ticketId;

  useEffect(() => {
    if (location.state?.ticket) {
      setSelectedTicket(location.state.ticket);
      ticketId = location?.state?.ticket.id;
    }
  }, [location.state]);

  useEffect(() => {
    getTicketById();
  }, []);

  const getTicketById = async () => {
    console.log("selectedState");
    setLoading(true);
    ticketId = location?.state?.ticket.id;
    await vitelWirelessSageMetrics
      .get(`generals/getTicketNotes/${ticketId}`)
      .then((res) => {
        console.log("ticket note by id", res.data.data);
        setAllTicketNote(res.data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTicketByIdAuto();

    const interval = setInterval(getTicketByIdAuto, 8000);

    return () => clearInterval(interval);
  }, []);

  const getTicketByIdAuto = async () => {
    console.log("selectedState");

    ticketId = location?.state?.ticket.id;
    await vitelWirelessSageMetrics
      .get(`generals/getTicketNotes/${ticketId}`)
      .then((res) => {
        console.log("ticket note by id checking", res.data.data);
        setAllTicketNote(res.data.data);
      });
  };

  // console.log("selectedTicket", selectedTicket);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("files of image", file);

    if (!file) return;

    // Validate file type - only images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG, PNG, GIF, etc.)");
      event.target.value = "";
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large. Maximum size is 10MB.");
      event.target.value = "";
      return;
    }

    // Add new file to attachments array
    setNoteAttachments((prev) => [...prev, file]);
    event.target.value = "";
  };

  const removeAttachment = (index) => {
    setNoteAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/"))
      return <FiImage className="file-icon" />;
    return <FiPaperclip className="file-icon" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleAddNote = async () => {
    if (!newNote.trim() && noteAttachments.length === 0) return;

    setIsUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("noteText", newNote);
      formData.append("ticketId", selectedTicket.id);
      formData.append("author", `${userdata?.firstName} ${userdata?.lastName}`);
      formData.append("partnerId", userdata?.partnerId);
      formData.append("role", "customer");

      // Append attachments
      noteAttachments.forEach((file) => {
        formData.append("image", file);
      });

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await vitelWirelessSageMetrics
        .post("generals/addTicketNote", formData)
        .then((res) => {
          console.log("res", res.data);
          getTicketById();
          setNewNote("");
          setNoteAttachments([]);
        });
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const renderNoteAttachments = (attachments) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="note-attachments">
        {attachments.map((attachment, index) => (
          <div key={attachment.id || index} className="note-attachment-item">
            {attachment.type?.startsWith("image/") ? (
              <div className="note-image-attachment">
                <img
                  src={attachment.url}
                  alt={attachment.filename}
                  className="note-image"
                  onClick={() => window.open(attachment.url, "_blank")}
                />
                <span className="attachment-filename">
                  {attachment.filename}
                </span>
              </div>
            ) : (
              <div className="note-file-attachment">
                {getFileIcon(attachment)}
                <div className="file-info">
                  <span className="file-name">{attachment.filename}</span>
                  <span className="file-size">
                    {formatFileSize(attachment.size)}
                  </span>
                </div>
                <a
                  href={attachment.url}
                  download={attachment.filename}
                  className="download-link"
                >
                  Download
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {selectedTicket ? (
        <div className="ticket-detail-container">
          <div className="ticket-form-details">
            <div className="form-header">
              <h2>Ticket Details</h2>
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

                  {/* Display ticket attachments if any */}
                  {selectedTicket?.imageUrl &&
                    selectedTicket.imageUrl.trim() !== "" && (
                      <div className="description-images">
                        <h4>Attached Images</h4>
                        <div className="image-grid">
                          {selectedTicket?.imageUrl &&
                            selectedTicket.imageUrl.trim() !== "" && (
                              <div className="image-item">
                                <img
                                  src={selectedTicket.imageUrl}
                                  alt="note attachment"
                                  className="note-image"
                                />
                              </div>
                            )}

                          {/* <img
                          src={selectedTicket?.ticketImage}
                          alt="imaghe file"
                          className="description-image"
                        /> */}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="notes-section">
                <h3>Notes & Comments</h3>
                {loading ? (
                  <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading comments...</p>
                  </div>
                ) : (
                  <div className="notes-thread">
                    {allTicketNote?.length > 0 ? (
                      allTicketNote?.map((note, index) => (
                        <div
                          key={note?.noteId || index}
                          className={`note-item ${
                            note.role === "customer" ? "reply" : "admin-message"
                          }`}
                        >
                          <div className="note-header">
                            <span className="note-author">{note.author}</span>
                            <span className="note-date">
                              {formatDate(note.date)}
                            </span>
                          </div>
                          <p className="note-text">{note.text}</p>

                          {note?.imageUrl && note.imageUrl.trim() !== "" && (
                            <img
                              src={note.imageUrl}
                              alt="note attachment"
                              className="note-image"
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="no-notes">No notes available</p>
                    )}
                  </div>
                )}

                {/* Add Note Form */}
                <div className="add-note-form">
                  <h4>Add a Note</h4>
                  <textarea
                    className="note-textarea"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Type your note or comment here..."
                    rows={4}
                  />

                  {/* File Upload Section */}
                  <div className="note-file-upload">
                    <input
                      type="file"
                      id="note-file-input"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="file-input"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="note-file-input"
                      className="file-upload-label"
                    >
                      <FiPaperclip className="upload-icon" />
                      <span>Attach files (optional)</span>
                    </label>
                  </div>

                  {/* Attachments Preview */}
                  {noteAttachments.length > 0 && (
                    <div className="attachments-preview">
                      <h5>Attachments ({noteAttachments.length})</h5>
                      {noteAttachments.map((file, index) => (
                        <div key={index} className="attachment-preview-item">
                          {getFileIcon(file)}
                          <div className="file-preview-info">
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="remove-attachment-btn"
                            onClick={() => removeAttachment(index)}
                            disabled={isUploading}
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="add-note-actions">
                    <button
                      className="cancel-note-btn"
                      onClick={() => {
                        setNewNote("");
                        setNoteAttachments([]);
                      }}
                      disabled={isUploading}
                    >
                      Cancel
                    </button>
                    <button
                      className="add-note-btn"
                      onClick={handleAddNote}
                      disabled={
                        isUploading ||
                        (!newNote.trim() && noteAttachments.length === 0)
                      }
                    >
                      {isUploading ? (
                        <>
                          <div className="spinner"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <FiSend className="send-icon" />
                          Add Note
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-ticket-selected">
          <p>No ticket selected or ticket not found.</p>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;

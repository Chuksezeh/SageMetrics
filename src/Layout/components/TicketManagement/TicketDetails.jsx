import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiPaperclip, FiImage, FiX, FiSend } from "react-icons/fi";
import "./TicketDetails.css";

const TicketDetails = () => {
  const [selectedTicket, setSelectedTicket] = useState();
  const [newNote, setNewNote] = useState("");
  const [noteAttachments, setNoteAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSelectedTicket(location.state.ticket);
  }, [location.state.ticket]);

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
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      const isValidType =
        file.type.startsWith("image/") ||
        file.type === "application/pdf" ||
        file.type.startsWith("text/") ||
        file.type.includes("document");

      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit

      if (!isValidType) {
        alert(`File type not supported: ${file.name}`);
        return false;
      }

      if (!isValidSize) {
        alert(`File too large: ${file.name} (Max 10MB)`);
        return false;
      }

      return true;
    });

    setNoteAttachments((prev) => [...prev, ...validFiles]);
    event.target.value = ""; // Reset input
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
      formData.append("author", "Current User"); // Replace with actual user

      // Append attachments
      noteAttachments.forEach((file) => {
        formData.append("attachments", file);
      });

      // Simulate API call - replace with actual backend call
      const newNoteObj = {
        id: `NOTE-${Date.now()}`,
        date: new Date().toISOString(),
        author: "Current User",
        text: newNote,
        attachments: noteAttachments.map((file) => ({
          id: `ATT-${Date.now()}-${file.name}`,
          filename: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file), // For preview - in real app, use backend URL
        })),
      };

      const updatedTicket = {
        ...selectedTicket,
        notes: [...selectedTicket.notes, newNoteObj],
      };

      setSelectedTicket(updatedTicket);
      setNewNote("");
      setNoteAttachments([]);
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const isReply = (note, index, notes) => {
    return index > 0 && notes[index - 1].author !== note.author;
  };

  const renderNoteAttachments = (attachments) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="note-attachments">
        {attachments.map((attachment, index) => (
          <div key={attachment.id || index} className="note-attachment-item">
            {attachment.type.startsWith("image/") ? (
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
      {selectedTicket && (
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
                  {selectedTicket.attachments &&
                    selectedTicket.attachments.filter((att) =>
                      att.type?.startsWith("image/")
                    ).length > 0 && (
                      <div className="description-images">
                        <h4>Attached Images</h4>
                        <div className="image-grid">
                          {selectedTicket.attachments
                            .filter((att) => att.type?.startsWith("image/"))
                            .map((image, index) => (
                              <div
                                key={image.id || index}
                                className="image-item"
                              >
                                <img
                                  src={image.url}
                                  alt={image.filename}
                                  className="description-image"
                                />
                                <span className="image-filename">
                                  {image.filename}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="notes-section">
                <h3>Notes & Comments</h3>
                <div className="notes-thread">
                  {selectedTicket?.notes?.length > 0 ? (
                    selectedTicket.notes.map((note, index) => (
                      <div
                        key={note.id || index}
                        className={`note-item ${
                          isReply(note, index, selectedTicket.notes)
                            ? "reply"
                            : "admin-message"
                        }`}
                      >
                        <div className="note-header">
                          <span className="note-author">{note.author}</span>
                          <span className="note-date">
                            {formatDate(note.date)}
                          </span>
                        </div>
                        <p className="note-text">{note.text}</p>

                        {/* Display note attachments */}
                        {renderNoteAttachments(note.attachments)}
                      </div>
                    ))
                  ) : (
                    <p className="no-notes">No notes available</p>
                  )}
                </div>

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
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
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
      )}
    </div>
  );
};

export default TicketDetails;

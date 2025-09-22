import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TicketDetails.css";

const TicketDetails = () => {
  const [selectedTicket, setSelectedTicket] = useState();
  const [newNote, setNewNote] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSelectedTicket(location.state.ticket);
  }, [location.state.ticket]);

  console.log("location.state.ticket", location.state.ticket);

  

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newNoteObj = {
      date: new Date().toISOString(),
      author: "Current User", // You can replace this with actual user data
      text: newNote,
    };

    const updatedTicket = {
      ...selectedTicket,
      notes: [...selectedTicket.notes, newNoteObj],
    };

    setSelectedTicket(updatedTicket);
    setNewNote("");
  };

  const isReply = (note, index, notes) => {
   
    return index > 0 && notes[index - 1].author !== note.author;
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
                </div>
              </div>

              <div className="notes-section">
                <h3>Notes & Comments</h3>
                <div className="notes-thread">
                  {selectedTicket?.notes?.length > 0 ? (
                    selectedTicket.notes.map((note, index) => (
                      <div
                        key={index}
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
                  />
                  <div className="add-note-actions">
                    <button
                      className="cancel-note-btn"
                      onClick={() => setNewNote("")}
                    >
                      Cancel
                    </button>
                    <button className="add-note-btn" onClick={handleAddNote}>
                      Add Note
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="view-actions-details">
                <button className="edit-btn" onClick={() => handleEditTicket(selectedTicket)}>
                  Edit Ticket
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;

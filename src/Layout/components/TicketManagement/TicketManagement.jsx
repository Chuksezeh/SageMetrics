import React, { useState } from 'react';
import './TicketManagement.css';

const TicketManagement = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Sample data
  const tickets = [
    {
      id: 'TKT-001',
      subscriber: '123-456-7890',
      category: 'Network',
      type: 'No Service',
      description: 'Customer reports no network signal in their area',
      status: 'Open',
      priority: 'High',
      created: '2023-10-15 09:30',
      updated: '2023-10-16 14:15',
      createdBy: 'John Doe',
      updatedBy: 'Jane Smith',
      notes: [
        {
          date: '2023-10-15 09:30',
          author: 'John Doe',
          text: 'Ticket created - customer reports no service since morning'
        },
        {
          date: '2023-10-16 14:15',
          author: 'Jane Smith',
          text: 'Checked network status - outage reported in customer area. ETA for resolution: 2 hours'
        }
      ]
    },
    {
      id: 'TKT-002',
      subscriber: '987-654-3210',
      category: 'Billing',
      type: 'Overcharge',
      description: 'Customer disputing last month bill amount',
      status: 'In Progress',
      priority: 'Medium',
      created: '2023-10-14 11:20',
      updated: '2023-10-16 10:45',
      createdBy: 'Mike Johnson',
      updatedBy: 'Mike Johnson',
      notes: [
        {
          date: '2023-10-14 11:20',
          author: 'Mike Johnson',
          text: 'Customer states bill is $50 higher than expected'
        },
        {
          date: '2023-10-15 15:30',
          author: 'Mike Johnson',
          text: 'Reviewed bill details - found additional data charges'
        }
      ]
    },
    {
      id: 'TKT-003',
      subscriber: '555-123-4567',
      category: 'Device',
      type: 'Hardware Issue',
      description: 'Phone not charging properly',
      status: 'Resolved',
      priority: 'Medium',
      created: '2023-10-10 13:45',
      updated: '2023-10-12 16:20',
      createdBy: 'Sarah Wilson',
      updatedBy: 'Sarah Wilson',
      notes: [
        {
          date: '2023-10-10 13:45',
          author: 'Sarah Wilson',
          text: 'Customer reports charging port issues'
        },
        {
          date: '2023-10-12 16:20',
          author: 'Sarah Wilson',
          text: 'Recommended device replacement - customer agreed'
        }
      ]
    }
  ];

  const categories = ['Network', 'Billing', 'Device', 'Account', 'Service'];
  const issueTypes = {
    Network: ['No Service', 'Slow Speed', 'Intermittent Connection', 'Coverage Issue'],
    Billing: ['Overcharge', 'Payment Issue', 'Plan Change', 'Refund Request'],
    Device: ['Hardware Issue', 'Software Problem', 'Setup Assistance', 'Warranty Claim'],
    Account: ['Password Reset', 'Information Update', 'Security Concern', 'Account Recovery'],
    Service: ['New Service', 'Upgrade', 'Downgrade', 'Cancellation']
  };

  const [formData, setFormData] = useState({
    subscriber: '',
    category: '',
    type: '',
    description: '',
    comments: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateTicket = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedTicket(null);
    setFormData({
      subscriber: '',
      category: '',
      type: '',
      description: '',
      comments: ''
    });
  };

  const handleEditTicket = (ticket) => {
    setIsEditing(true);
    setIsCreating(false);
    setSelectedTicket(ticket);
    setFormData({
      subscriber: ticket.subscriber,
      category: ticket.category,
      type: ticket.type,
      description: '',
      comments: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (isCreating) {
      console.log('Creating new ticket:', formData);
      alert('New ticket created successfully!');
      setIsCreating(false);
    } else if (isEditing) {
      console.log('Updating ticket:', selectedTicket.id, formData);
      alert('Ticket updated successfully!');
      setIsEditing(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'open') return ticket.status === 'Open' || ticket.status === 'In Progress';
    if (activeTab === 'resolved') return ticket.status === 'Resolved';
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ticket-management">
      <div className="ticket-header">
        <h1>Ticket Management</h1>
        <button 
          className="create-ticket-btn"
          onClick={handleCreateTicket}
        >
          Open New Ticket
        </button>
      </div>

      {/* Ticket Creation/Editing Form */}
      {(isCreating || isEditing) && (
        <div className="ticket-form-overlay">
          <div className="ticket-form">
            <div className="form-header">
              <h2>{isCreating ? 'Open New Ticket' : 'Edit Ticket'}</h2>
              <button 
                className="close-form"
                onClick={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                }}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Subscriber Number</label>
                  <input
                    type="text"
                    name="subscriber"
                    value={formData.subscriber}
                    onChange={handleInputChange}
                    placeholder="Enter subscriber number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Issue Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Issue Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.category}
                  >
                    <option value="">Select Type</option>
                    {formData.category && issueTypes[formData.category].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  {isCreating ? 'Please describe the issue in details' : 'Please enter additional comments'}
                </label>
                <textarea
                  name={isCreating ? "description" : "comments"}
                  value={isCreating ? formData.description : formData.comments}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder={isCreating ? "Describe the issue..." : "Add your comments..."}
                  required
                />
              </div>

              {isEditing && selectedTicket && (
                <div className="ticket-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Last Updated:</span>
                      <span className="detail-value">{formatDate(selectedTicket.updated)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Updated By:</span>
                      <span className="detail-value">{selectedTicket.updatedBy}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">{selectedTicket.status}</span>
                    </div>
                  </div>

                  <div className="previous-notes">
                    <h3>Previous Notes:</h3>
                    {selectedTicket.notes.map((note, index) => (
                      <div key={index} className="note-item">
                        <div className="note-header">
                          <span className="note-date">{formatDate(note.date)}</span>
                          <span className="note-author">Created by {note.author}</span>
                        </div>
                        <p className="note-text">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Send
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
              className={activeTab === 'open' ? 'active' : ''}
              onClick={() => setActiveTab('open')}
            >
              Open Tickets
            </button>
            <button 
              className={activeTab === 'resolved' ? 'active' : ''}
              onClick={() => setActiveTab('resolved')}
            >
              Resolved Tickets
            </button>
            <button 
              className={activeTab === 'all' ? 'active' : ''}
              onClick={() => setActiveTab('all')}
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
              filteredTickets.map(ticket => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-main">
                    <div className="ticket-id">{ticket.id}</div>
                    <div className="ticket-subscriber">{ticket.subscriber}</div>
                    <div className="ticket-category">{ticket.category}</div>
                    <div className="ticket-type">{ticket.type}</div>
                    <div className={`ticket-status ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                      {ticket.status}
                    </div>
                    <div className={`ticket-priority ${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </div>
                  </div>
                  
                  <div className="ticket-description">
                    <p>{ticket.description}</p>
                  </div>
                  
                  <div className="ticket-footer">
                    <div className="ticket-dates">
                      <span>Created: {formatDate(ticket.created)} by {ticket.createdBy}</span>
                      <span>Updated: {formatDate(ticket.updated)} by {ticket.updatedBy}</span>
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
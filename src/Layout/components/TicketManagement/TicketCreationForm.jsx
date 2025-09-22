import React, { useState } from "react";
import { useFormik } from "formik";
import "./TicketCreationForm.css";
import * as Yup from "yup";
import { FiX, FiUpload, FiPaperclip, FiImage, FiFile } from "react-icons/fi";

const TicketCreationForm = ({ isOpen, onClose, onSubmit }) => {
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    subscriber: Yup.string()
      .required("Subscriber number is required")
      .matches(
        /^[0-9-]+$/,
        "Subscriber number must contain only numbers and hyphens"
      )
      .min(5, "Subscriber number must be at least 5 characters"),
    category: Yup.string().required("Category is required"),
    type: Yup.string().required("Issue type is required"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must not exceed 500 characters"),
    priority: Yup.string().required("Priority is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      subscriber: "",
      category: "",
      type: "",
      description: "",
      priority: "medium",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Prepare form data with files
        const formData = new FormData();

        // Append form values
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        // Append attachments
        attachments.forEach((file, index) => {
          formData.append(`attachments`, file);
        });

        // Append metadata
        formData.append("createdBy", "current_user_id"); // Replace with actual user
        formData.append("createdAt", new Date().toISOString());

        await onSubmit(formData);

        // Reset form on success
        resetForm();
        setAttachments([]);
        onClose();
      } catch (error) {
        console.error("Error creating ticket:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      // Validate file type and size
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

    setAttachments((prev) => [...prev, ...validFiles]);
    event.target.value = ""; // Reset input
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Get file icon based on type
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/"))
      return <FiImage className="file-icon" />;
    if (file.type === "application/pdf")
      return <FiFile className="file-icon" />;
    return <FiPaperclip className="file-icon" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Categories and issue types
  const categories = ["Network", "Billing", "Technical", "Account", "General"];
  const issueTypes = {
    Network: [
      "Slow Speed",
      "No Connection",
      "Intermittent Connection",
      "Router Issues",
    ],
    Billing: [
      "Overcharge",
      "Payment Issue",
      "Invoice Problem",
      "Refund Request",
    ],
    Technical: [
      "Hardware Issue",
      "Software Problem",
      "Configuration",
      "Performance",
    ],
    Account: [
      "Login Issues",
      "Profile Update",
      "Security Concern",
      "Account Recovery",
    ],
    General: ["Information Request", "Complaint", "Suggestion", "Other"],
  };

  //   if (!isOpen) return null;

  return (
    <div className="ticket-creation-overlay">
      <div className="ticket-creation-form">
        <div className="form-header">
          <h2>Create New Support Ticket</h2>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            disabled={formik.isSubmitting}
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-grid">
            {/* Subscriber Number */}
            <div className="form-group">
              <label htmlFor="subscriber" className="form-label">
                Subscriber Number *
              </label>
              <input
                id="subscriber"
                name="subscriber"
                type="text"
                placeholder="e.g., 071209000103"
                className={`form-input ${
                  formik.touched.subscriber && formik.errors.subscriber
                    ? "error"
                    : ""
                }`}
                {...formik.getFieldProps("subscriber")}
              />
              {formik.touched.subscriber && formik.errors.subscriber && (
                <div className="error-message">{formik.errors.subscriber}</div>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Issue Category *
              </label>
              <select
                id="category"
                name="category"
                className={`form-select ${
                  formik.touched.category && formik.errors.category
                    ? "error"
                    : ""
                }`}
                {...formik.getFieldProps("category")}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="error-message">{formik.errors.category}</div>
              )}
            </div>

            {/* Issue Type */}
            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Issue Type *
              </label>
              <select
                id="type"
                name="type"
                disabled={!formik.values.category}
                className={`form-select ${
                  formik.touched.type && formik.errors.type ? "error" : ""
                }`}
                {...formik.getFieldProps("type")}
              >
                <option value="">Select an issue type</option>
                {formik.values.category &&
                  issueTypes[formik.values.category]?.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
              {formik.touched.type && formik.errors.type && (
                <div className="error-message">{formik.errors.type}</div>
              )}
            </div>

            {/* Priority */}
            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority *
              </label>
              <select
                id="priority"
                name="priority"
                className={`form-select ${
                  formik.touched.priority && formik.errors.priority
                    ? "error"
                    : ""
                }`}
                {...formik.getFieldProps("priority")}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              {formik.touched.priority && formik.errors.priority && (
                <div className="error-message">{formik.errors.priority}</div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Please describe the issue in detail. Include any error messages, steps to reproduce, and what you've tried so far."
              className={`form-textarea ${
                formik.touched.description && formik.errors.description
                  ? "error"
                  : ""
              }`}
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error-message">{formik.errors.description}</div>
            )}
            <div className="character-count">
              {formik.values.description.length}/500 characters
            </div>
          </div>

          {/* File Attachments */}
          <div className="form-group">
            <label className="form-label">Attachments (Optional)</label>
            <div className="file-upload-section">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="file-input"
                disabled={isUploading}
              />
              <label htmlFor="file-upload" className="file-upload-label">
                <FiUpload className="upload-icon" />
                <span>Click to upload files</span>
                <small>Supports images, PDF, DOC (Max 10MB each)</small>
              </label>
            </div>

            {/* Attachments List */}
            {attachments.length > 0 && (
              <div className="attachments-list">
                <h4>Attached Files ({attachments.length})</h4>
                {attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    {getFileIcon(file)}
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeAttachment(index)}
                      disabled={formik.isSubmitting}
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Creating Ticket...
                </>
              ) : (
                "Create Ticket"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketCreationForm;

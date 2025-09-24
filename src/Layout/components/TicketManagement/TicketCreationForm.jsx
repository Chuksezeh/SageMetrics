import React, { useState } from "react";
import { useFormik } from "formik";
import "./TicketCreationForm.css";
import * as Yup from "yup";
import { FiX, FiUpload, FiImage, FiTrash2 } from "react-icons/fi";
import { vitelWirelessSageMetrics } from "../../../Utilities/axios";
import { useNavigate } from "react-router-dom";

const TicketCreationForm = ({ isOpen, onClose, onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));
  const navigate = useNavigate();

  //   const getAllTicket = async () => {
  //     await vitelWirelessSageMetrics
  //       .get(`generals/getTicketMgt/${userdata?.partnerId}`)
  //       .then((res) => {
  //         console.log("res", res.data.data);
  //         // setTickets(res.data.data);
  //       });
  //   };

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
      .max(250, "Description must not exceed 250 characters"),
    priority: Yup.string().required("Priority is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      subscriber: "",
      category: "",
      type: "",
      createdBy: `${userdata?.firstName} ${userdata?.lastName}`,
      partnerId: userdata?.partnerId,
      description: "",
      priority: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Prepare form data with files
        setIsUploading(true);
        const formData = new FormData();

        // Append form values
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        // Append single image if selected
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

        vitelWirelessSageMetrics
          .post("generals/createTicketMgt", formData)
          .then((res) => {
            console.log("res ==>", res);
            setIsUploading(false);
            navigate("/segametric-inside/manage-ticket");
            // navigator('/manage-ticket')
            alert("New ticket created successfully!");
            resetForm();
            setSelectedImage(null);
          });
      } catch (error) {
        console.error("Error creating ticket:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle single image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

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

    // Replace existing image with new one
    setSelectedImage(file);
    event.target.value = ""; // Reset input
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
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
              {formik.values.description.length}/250 characters
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Attach Image (Optional)</label>
            <div className="image-upload-section">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
                disabled={isUploading}
              />

              {!selectedImage ? (
                <label htmlFor="image-upload" className="image-upload-label">
                  <FiUpload className="upload-icon" />
                  <span>Click to upload an image</span>
                  <small>Supports JPG, PNG, GIF (Max 10MB)</small>
                </label>
              ) : (
                <div className="image-preview">
                  <div className="preview-header">
                    <span>Selected Image</span>
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={removeImage}
                      disabled={formik.isSubmitting}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <div className="preview-content">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="image-thumbnail"
                    />
                    <div className="image-info">
                      <span className="image-name">{selectedImage.name}</span>
                      <span className="image-size">
                        {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <div className="image-replace">
                    <label htmlFor="image-upload" className="replace-link">
                      Click to replace image
                    </label>
                  </div>
                </div>
              )}
            </div>
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
            <button type="submit" className="submit-btn" disabled={isUploading}>
              {isUploading ? (
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

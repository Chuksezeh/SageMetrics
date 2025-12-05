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
        /^(0\d{10}|234\d{10})$/,
        "Subscriber number must be a valid Nigerian phone number"
      ),
    category: Yup.string().required("Category is required"),
    type: Yup.string().required("Issue type is required"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(250, "Description must not exceed 250 characters"),
    priority: Yup.string().required("Priority is required"),
    userType: Yup.string().required("user type is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      subscriber: "",
      agentNumber: "",
      userType: "Subscriber",
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

        let subscriber = values.subscriber.trim();

        // Case 1: starts with "0" → replace with "234"
        if (subscriber.startsWith("0")) {
          subscriber = "234" + subscriber.slice(1);
        }
        // Case 2: starts with "2340" → remove the extra "0"
        else if (subscriber.startsWith("2340")) {
          subscriber = "234" + subscriber.slice(4);
        }

        const formattedValues = {
          ...values,
          subscriber,
        };

        console.log("Submitting:", formattedValues);

        // Append single image if selected
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

        vitelWirelessSageMetrics
          .post("generals/createTicketMgt", formData)
          .then((res) => {
            console.log("res ==>", res);
            setIsUploading(false);
            navigate("/segametric-dashboard/manage-ticket");
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
  const categories = ["Network", "Billing/Recharge", "Technical", "General"];
  const issueTypes = {
    Network: [
      "No Signal",
      "No Internet",
      "Stopped working",
      "Never worked",
      "Others",
    ],
    Billing: [
      "No wallet credit received",
      "Airtime Topup failed",
      "Data Topup Failed",
      "Wrong Amount C/D",
    ],
    Technical: ["Command", "iPartner", "Xphone", "Others"],

    General: ["Others"],
  };

  return (
    <div className="ticket-creation-overlay">
      <div className="ticket-creation-form">
        <div className="form-header">
          <h2>Create New Support Ticket</h2>
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
                placeholder="e.g., 23471209000103"
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

            <div className="form-group">
              <label htmlFor="userType" className="form-label">
                Type *
              </label>
              <select
                id="userType"
                name="userType"
                className={`form-select ${
                  formik.touched.userType && formik.errors.userType
                    ? "error"
                    : ""
                }`}
                {...formik.getFieldProps("userType")}
              >
                <option value="Subscriber">Subscriber</option>
                <option value="Agent">Agent</option>
                <option value="Others">Others </option>
              </select>
              {formik.touched.userType && formik.errors.userType && (
                <div className="error-message">{formik.errors.userType}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="agentNumber" className="form-label">
                Agent Number
              </label>
              <input
                id="agentNumber"
                name="agentNumber"
                type="text"
                placeholder="e.g., 234712"
                className={`form-input ${
                  formik.touched.agentNumber && formik.errors.agentNumber
                    ? "error"
                    : ""
                }`}
                {...formik.getFieldProps("agentNumber")}
              />
              {formik.touched.agentNumber && formik.errors.agentNumber && (
                <div className="error-message">{formik.errors.agentNumber}</div>
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

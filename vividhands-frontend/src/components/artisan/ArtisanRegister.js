import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiAlertCircle, FiCheckCircle, FiUpload } from "react-icons/fi";

const ArtisanRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    experience: "",
    certificate: null,
    mobile: "",
    location: "",
    materialsUsed: "",
    password: "",
    confirmPassword: "",
  });

  const categories = [
    "Pottery & Ceramics",
    "Textile & Weaving",
    "Metalwork",
    "Wood Carving",
    "Jewelry Making",
    "Glassblowing",
    "Leatherwork",
    "Basketry",
    "Stone Carving",
    "Traditional Painting",
  ];

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (alert.show && alert.type === "success") {
      const timer = setTimeout(() => navigate("/artisan-login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!mobileRegex.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.certificate)
      newErrors.certificate = "Certificate is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.materialsUsed.trim())
      newErrors.materialsUsed = "Materials & techniques are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formDataToSend.append(key, value);
      });

      await axios.post(
        "http://localhost:8080/api/artisan/auth/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAlert({
        show: true,
        message: "Registration Successful! Redirecting to login...",
        type: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-lg-9 col-xl-7 col-xxl-6"> {/* Adjusted column sizing */}
          <div className="card artisan-card shadow-lg" style={{ maxWidth: '1000px', margin: '0 auto' }}> {/* Added max-width constraint */}

            {/* Alert Notification */}
            {alert.show && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show`}
              >
                <div className="d-flex align-items-center gap-3">
                  {alert.type === "success" ? (
                    <FiCheckCircle className="fs-4" />
                  ) : (
                    <FiAlertCircle className="fs-4" />
                  )}
                  <div>
                    <h5 className="mb-1 text-uppercase letter-spacing-1">
                      {alert.type === "success" ? "Success" : "Attention"}
                    </h5>
                    <p className="mb-0 small">{alert.message}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="card-header text-center py-4 bg-primary text-white">
              <h2 className="mb-3">
                <span className="d-block h2 mb-2">Master Artisan Registry</span>
                <span className="h6 fw-light">
                  Preserving Excellence in Craftsmanship
                </span>
              </h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className={`form-control ${errors.name && "is-invalid"
                          }`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email & Category */}
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email && "is-invalid"
                          }`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label">Artisan Category</label>
                      <select
                        name="category"
                        className={`form-select ${errors.category && "is-invalid"
                          }`}
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.category}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Experience, Mobile, Location */}
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Experience (Years)</label>
                      <input
                        type="number"
                        name="experience"
                        className={`form-control ${errors.experience && "is-invalid"
                          }`}
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                      />
                      {errors.experience && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.experience}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        className={`form-control ${errors.mobile && "is-invalid"
                          }`}
                        value={formData.mobile}
                        onChange={handleChange}
                      />
                      {errors.mobile && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.mobile}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="location"
                        className={`form-control ${errors.location && "is-invalid"
                          }`}
                        value={formData.location}
                        onChange={handleChange}
                      />
                      {errors.location && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Passwords */}
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className={`form-control ${errors.password && "is-invalid"
                          }`}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword && "is-invalid"
                          }`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Materials & Techniques */}
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">
                        Primary Materials & Techniques Used
                      </label>
                      <textarea
                        name="materialsUsed"
                        className={`form-control ${errors.materialsUsed && "is-invalid"
                          }`}
                        value={formData.materialsUsed}
                        onChange={handleChange}
                        rows="4"
                      />
                      {errors.materialsUsed && (
                        <div className="invalid-feedback d-flex align-items-center gap-2">
                          <FiAlertCircle /> {errors.materialsUsed}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certificate Upload */}
                  <div className="col-12">
                    <div
                      className={`file-upload-card ${errors.certificate && "border-danger"
                        }`}
                    >
                      <label className="d-block text-center p-4 cursor-pointer">
                        <div className="mb-3">
                          <FiUpload className="h3 text-muted" />
                        </div>
                        <div className="mb-2">
                          <strong>Upload Certification</strong>
                        </div>
                        <small className="text-muted d-block">
                          PDF format (max 5MB)
                        </small>
                        {formData.certificate && (
                          <div className="mt-2 text-primary">
                            {formData.certificate.name}
                          </div>
                        )}
                        <input
                          type="file"
                          name="certificate"
                          className="d-none"
                          accept="application/pdf"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    {errors.certificate && (
                      <div className="text-danger small mt-2">
                        <FiAlertCircle /> {errors.certificate}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Registering...
                        </>
                      ) : (
                        "Enroll as Master Artisan"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
  .artisan-card {
    background: #ffffff;
    border: 1px solid #e0e0e0;
  }

  .card-header {
    background: linear-gradient(135deg, #1a365d, #2a5298) !important;
    border-bottom: none;
  }

  .form-label {
    color: #2d3748;
    font-weight: 600;
  }

  .form-control {
    border: 2px solid #cbd5e0;
    background: #fff;
  }

  .form-control:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  .btn-primary {
    background: #2a5298;
    border: none;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .btn-primary:hover {
    background: #1a365d;
  }

  .invalid-feedback {
    color: #e53e3e;
    font-size: 0.875rem;
  }

  .is-invalid {
    border-color: #e53e3e !important;
  }

  .is-invalid:focus {
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2);
  }

  .alert-success {
    background: #f0fff4;
    border: 1px solid #c6f6d5;
    color: #22543d;
  }

  .alert-error {
    background: #fff5f5;
    border: 1px solid #fed7d7;
    color: #742a2a;
  }

  .file-upload-card {
    border-color: #cbd5e0;
    background: #f7fafc;
  }

  .file-upload-card:hover {
    border-color: #2a5298;
    background: #ebf8ff;
  }

  .text-muted {
    color: #718096 !important;
  }

  .text-primary {
    color: #2a5298 !important;
  }

  .border-danger {
    border-color: #e53e3e !important;
  }

  .card-header h2 {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`}</style>    </div>
  );
};

export default ArtisanRegister;

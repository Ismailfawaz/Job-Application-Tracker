import React, { useState, useEffect } from "react";
import { CloseIcon, BriefcaseIcon, BuildingIcon, CalendarIcon, ExternalLinkIcon } from "./Icons";
import { getTodayDateString } from "../utils/formatters";
import { STATUS_LIST } from "../data/initialData";

export function ApplicationModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  defaultStatus = "Applied"
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState(getTodayDateString());
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("Applied");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  // Reset or populate fields whenever modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setCompany(initialData.company || "");
        setRole(initialData.role || "");
        setDate(initialData.date || getTodayDateString());
        setLink(initialData.link || "");
        setStatus(initialData.status || defaultStatus);
        setLocation(initialData.location || "");
        setSalary(initialData.salary || "");
        setNotes(initialData.notes || "");
      } else {
        setCompany("");
        setRole("");
        setDate(getTodayDateString());
        setLink("");
        setStatus(defaultStatus);
        setLocation("");
        setSalary("");
        setNotes("");
      }
      setErrors({});
    }
  }, [isOpen, initialData, defaultStatus]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!role.trim()) {
      newErrors.role = "Job role / title is required";
    }
    if (!date) {
      newErrors.date = "Application date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const applicationPayload = {
      id: isEditing ? initialData.id : `app-${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      date,
      link: link.trim(),
      status,
      location: location.trim(),
      salary: salary.trim(),
      notes: notes.trim(),
      updatedAt: new Date().toISOString()
    };

    onSave(applicationPayload);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <BriefcaseIcon size={20} />
            </div>
            <div>
              <h2 className="modal-title">
                {isEditing ? "Edit Application" : "New Job Application"}
              </h2>
              <p className="modal-subtitle">
                {isEditing
                  ? `Update application details for ${initialData?.company}`
                  : "Track a new job opportunity in your dashboard"}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Company Name */}
            <div className="form-group">
              <label htmlFor="company" className="form-label">
                Company Name <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <BuildingIcon size={16} className="input-icon" />
                <input
                  id="company"
                  type="text"
                  className={`form-input ${errors.company ? "input-error" : ""}`}
                  placeholder="e.g. Google, Microsoft, Startup Inc."
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    if (errors.company) setErrors({ ...errors, company: null });
                  }}
                  autoFocus
                />
              </div>
              {errors.company && <p className="error-text">{errors.company}</p>}
            </div>

            {/* Job Role */}
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Job Role / Title <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <BriefcaseIcon size={16} className="input-icon" />
                <input
                  id="role"
                  type="text"
                  className={`form-input ${errors.role ? "input-error" : ""}`}
                  placeholder="e.g. Frontend Engineer, Product Intern"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    if (errors.role) setErrors({ ...errors, role: null });
                  }}
                />
              </div>
              {errors.role && <p className="error-text">{errors.role}</p>}
            </div>

            {/* Application Date */}
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Application Date <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <CalendarIcon size={16} className="input-icon" />
                <input
                  id="date"
                  type="date"
                  className={`form-input ${errors.date ? "input-error" : ""}`}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors({ ...errors, date: null });
                  }}
                />
              </div>
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>

            {/* Status Select */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status <span className="required-star">*</span>
              </label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_LIST.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Link URL */}
            <div className="form-group form-col-span-2">
              <label htmlFor="link" className="form-label">
                Job Posting URL
              </label>
              <div className="input-with-icon">
                <ExternalLinkIcon size={16} className="input-icon" />
                <input
                  id="link"
                  type="text"
                  className="form-input"
                  placeholder="https://linkedin.com/jobs/view/... or careers page"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>

            {/* Location (Optional) */}
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location (Optional)
              </label>
              <input
                id="location"
                type="text"
                className="form-input"
                placeholder="e.g. Remote, San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Salary / Compensation (Optional) */}
            <div className="form-group">
              <label htmlFor="salary" className="form-label">
                Salary / Pay (Optional)
              </label>
              <input
                id="salary"
                type="text"
                className="form-input"
                placeholder="e.g. $120k/yr, $45/hr"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            {/* Notes / Details */}
            <div className="form-group form-col-span-2">
              <label htmlFor="notes" className="form-label">
                Notes & Interview Stages
              </label>
              <textarea
                id="notes"
                rows="3"
                className="form-textarea"
                placeholder="Add notes about rounds, recruiter contacts, technical requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? "Save Changes" : "Create Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

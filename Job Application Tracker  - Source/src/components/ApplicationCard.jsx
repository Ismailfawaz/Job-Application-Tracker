import React, { useState } from "react";
import {
  CalendarIcon,
  ExternalLinkIcon,
  EditIcon,
  TrashIcon,
  MapPinIcon,
  GripVerticalIcon,
} from "./Icons";
import { formatDate, sanitizeUrl, getCompanyInitials, getAvatarColor } from "../utils/formatters";
import { STATUS_LIST } from "../data/initialData";

export function ApplicationCard({
  application,
  onEdit,
  onDelete,
  onStatusChange,
  onDragStart,
  onDragEnd,
  isDragging
}) {
  const { id, company, role, date, link, status, location, salary, notes } = application;
  const initials = getCompanyInitials(company);
  const avatarStyle = getAvatarColor(company);
  const [showQuickStatus, setShowQuickStatus] = useState(false);

  return (
    <div
      className={`app-card card-status-${status.toLowerCase()} ${isDragging ? "is-dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragEnd={onDragEnd}
      tabIndex={0}
      aria-label={`${role} at ${company}`}
    >
      {/* Top Header */}
      <div className="app-card-header">
        <div className="company-info">
          <div
            className="company-avatar"
            style={{ backgroundColor: avatarStyle.bg, color: avatarStyle.text }}
            title={company}
          >
            {initials}
          </div>
          <div className="company-text">
            <h3 className="company-name" title={company}>{company}</h3>
            <span className="app-date">
              <CalendarIcon size={12} />
              {formatDate(date)}
            </span>
          </div>
        </div>
        <div className="drag-handle" title="Drag to move status">
          <GripVerticalIcon size={16} />
        </div>
      </div>

      {/* Role */}
      <div className="app-card-role-wrap">
        <h4 className="app-card-role" title={role}>{role}</h4>
      </div>

      {/* Meta Pills (Location, Salary) */}
      {(location || salary) && (
        <div className="app-card-pills">
          {location && (
            <span className="meta-pill" title={location}>
              <MapPinIcon size={12} />
              <span className="pill-text">{location}</span>
            </span>
          )}
          {salary && (
            <span className="meta-pill pill-salary" title={salary}>
              {salary}
            </span>
          )}
        </div>
      )}

      {/* Notes preview if present */}
      {notes && (
        <p className="app-card-notes" title={notes}>
          {notes}
        </p>
      )}

      {/* Card Footer: Links and Actions */}
      <div className="app-card-footer">
        <div className="card-left-actions">
          {link ? (
            <a
              href={sanitizeUrl(link)}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link-btn"
              title="Open job posting"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon size={13} />
              <span>Job Link</span>
            </a>
          ) : (
            <span className="card-no-link">No link</span>
          )}
        </div>

        <div className="card-right-actions">
          {/* Quick status dropdown for accessible/mobile switching without dragging */}
          <div className="quick-status-selector">
            <select
              className={`quick-status-select select-${status.toLowerCase()}`}
              value={status}
              onChange={(e) => onStatusChange(id, e.target.value)}
              title="Change application status"
              onClick={(e) => e.stopPropagation()}
            >
              {STATUS_LIST.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="action-icon-btn edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(application);
            }}
            title="Edit application"
            aria-label="Edit application"
          >
            <EditIcon size={14} />
          </button>

          <button
            type="button"
            className="action-icon-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(application);
            }}
            title="Delete application"
            aria-label="Delete application"
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

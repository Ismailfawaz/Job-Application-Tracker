import React from "react";
import {
  ExternalLinkIcon,
  EditIcon,
  TrashIcon,
  CalendarIcon,
  MapPinIcon,
  PlusIcon
} from "./Icons";
import { formatDate, sanitizeUrl, getCompanyInitials, getAvatarColor } from "../utils/formatters";
import { STATUS_LIST } from "../data/initialData";

export function ApplicationTable({
  applications,
  onEdit,
  onDelete,
  onStatusChange,
  onAddNew
}) {
  if (applications.length === 0) {
    return (
      <div className="table-empty-state">
        <div className="empty-state-icon">📂</div>
        <h3>No applications match your criteria</h3>
        <p>Try clearing your search query or status filter, or add a new job application.</p>
        <button type="button" className="btn btn-primary" onClick={onAddNew}>
          <PlusIcon size={16} />
          <span>Add New Application</span>
        </button>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="apps-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Job Link</th>
              <th>Details</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const initials = getCompanyInitials(app.company);
              const avatarStyle = getAvatarColor(app.company);
              return (
                <tr key={app.id} className={`table-row row-${app.status.toLowerCase()}`}>
                  {/* Company */}
                  <td>
                    <div className="table-company-cell">
                      <div
                        className="company-avatar-sm"
                        style={{ backgroundColor: avatarStyle.bg, color: avatarStyle.text }}
                      >
                        {initials}
                      </div>
                      <div className="table-company-text">
                        <span className="table-company-name">{app.company}</span>
                        {app.location && (
                          <span className="table-location">
                            <MapPinIcon size={11} />
                            {app.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <span className="table-role-text">{app.role}</span>
                  </td>

                  {/* Date */}
                  <td>
                    <span className="table-date-badge">
                      <CalendarIcon size={12} />
                      {formatDate(app.date)}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td>
                    <div className="table-status-cell">
                      <select
                        className={`table-status-select select-${app.status.toLowerCase()}`}
                        value={app.status}
                        onChange={(e) => onStatusChange(app.id, e.target.value)}
                        aria-label={`Change status for ${app.company}`}
                      >
                        {STATUS_LIST.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  {/* Job Link */}
                  <td>
                    {app.link ? (
                      <a
                        href={sanitizeUrl(app.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-link-btn"
                        title="View job posting"
                      >
                        <span>View</span>
                        <ExternalLinkIcon size={12} />
                      </a>
                    ) : (
                      <span className="text-muted-dash">—</span>
                    )}
                  </td>

                  {/* Notes / Salary */}
                  <td>
                    <div className="table-details-cell">
                      {app.salary && (
                        <span className="table-salary-tag">{app.salary}</span>
                      )}
                      {app.notes && (
                        <span className="table-notes-preview" title={app.notes}>
                          {app.notes}
                        </span>
                      )}
                      {!app.salary && !app.notes && (
                        <span className="text-muted-dash">—</span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="text-right">
                    <div className="table-actions">
                      <button
                        type="button"
                        className="action-icon-btn edit-btn"
                        onClick={() => onEdit(app)}
                        title="Edit application"
                        aria-label={`Edit ${app.company} application`}
                      >
                        <EditIcon size={15} />
                      </button>
                      <button
                        type="button"
                        className="action-icon-btn delete-btn"
                        onClick={() => onDelete(app)}
                        title="Delete application"
                        aria-label={`Delete ${app.company} application`}
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

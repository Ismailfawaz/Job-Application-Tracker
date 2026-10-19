import React, { useState } from "react";
import { ApplicationCard } from "./ApplicationCard";
import { STATUS_CONFIG } from "../data/initialData";
import { PlusIcon } from "./Icons";

export function KanbanColumn({
  status,
  applications,
  onEdit,
  onDelete,
  onStatusChange,
  onDropCard,
  draggedCardId,
  setDraggedCardId,
  onAddNewWithStatus
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const config = STATUS_CONFIG[status] || {};

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only deactivate if leaving the column boundary
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggedCardId) {
      onDropCard(draggedCardId, status);
    }
  };

  return (
    <div
      className={`kanban-column column-${status.toLowerCase()} ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="column-header">
        <div className="column-title-group">
          <span className={`status-pill pill-${status.toLowerCase()}`}>
            <span className={`status-dot dot-${status.toLowerCase()}`} />
            {status}
          </span>
          <span className="column-count">{applications.length}</span>
        </div>
        <button
          type="button"
          className="column-add-btn"
          onClick={() => onAddNewWithStatus(status)}
          title={`Add application directly to ${status}`}
          aria-label={`Add application to ${status}`}
        >
          <PlusIcon size={14} />
        </button>
      </div>

      {/* Cards List Container */}
      <div className="column-cards-container">
        {applications.length === 0 ? (
          <div className="empty-column-box">
            <p className="empty-column-text">No applications in {status}</p>
            <button
              type="button"
              className="btn-empty-column-add"
              onClick={() => onAddNewWithStatus(status)}
            >
              + Add {status}
            </button>
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onDragStart={(e, id) => {
                setDraggedCardId(id);
                e.dataTransfer.setData("text/plain", id);
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragEnd={() => setDraggedCardId(null)}
              isDragging={draggedCardId === app.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

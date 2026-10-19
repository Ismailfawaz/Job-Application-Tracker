import React, { useEffect } from "react";
import { TrashIcon, CloseIcon } from "./Icons";

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, application }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !application) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge badge-danger">
              <TrashIcon size={20} />
            </div>
            <div>
              <h2 className="modal-title">Delete Application?</h2>
              <p className="modal-subtitle">This action cannot be undone.</p>
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

        <div className="delete-modal-body">
          <p>
            Are you sure you want to delete the application for{" "}
            <strong>{application.role}</strong> at <strong>{application.company}</strong>?
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onConfirm(application.id);
              onClose();
            }}
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
}

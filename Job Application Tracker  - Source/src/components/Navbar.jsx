import React from "react";
import { BriefcaseIcon, PlusIcon, RefreshIcon, DownloadIcon } from "./Icons";

export function Navbar({ onAddNew, onResetData, onExportData, totalCount }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <img src="/favicon-64x64.png" alt="Job Application Tracker" className="brand-img" />
          </div>
          <div>
            <div className="brand-title-wrap">
              <h1 className="brand-title">Job Application Tracker</h1>
              <span className="brand-badge">{totalCount} Active</span>
            </div>
            <p className="brand-subtitle">Organize, monitor, and accelerate your career opportunities</p>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onResetData}
            title="Reset to default sample data"
          >
            <RefreshIcon size={15} />
            <span className="btn-label-desktop">Demo Data</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onExportData}
            title="Export your job applications as JSON"
          >
            <DownloadIcon size={15} />
            <span className="btn-label-desktop">Export</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-add"
            onClick={onAddNew}
          >
            <PlusIcon size={18} />
            <span>Add Application</span>
          </button>
        </div>
      </div>
    </header>
  );
}

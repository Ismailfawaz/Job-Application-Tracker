import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { StatsGrid } from "./components/StatsGrid";
import { FilterBar } from "./components/FilterBar";
import { KanbanBoard } from "./components/KanbanBoard";
import { ApplicationTable } from "./components/ApplicationTable";
import { ApplicationModal } from "./components/ApplicationModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { CheckCircleIcon, PlusIcon } from "./components/Icons";
import {
  getStoredApplications,
  saveStoredApplications,
  resetToDefaultApplications,
  exportApplicationsToJson,
} from "./utils/storage";

export function App() {
  // Application Data State
  const [applications, setApplications] = useState(() => getStoredApplications());

  // Search, Filter, Sort, View Modes
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewMode, setViewMode] = useState("kanban"); // "kanban" or "table"

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [defaultNewStatus, setDefaultNewStatus] = useState("Applied");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingApplication, setDeletingApplication] = useState(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    saveStoredApplications(applications);
  }, [applications]);

  // Show a momentary feedback toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Open modal to add a brand new application
  const handleOpenAddModal = (initialStatus = "Applied") => {
    setEditingApplication(null);
    setDefaultNewStatus(initialStatus);
    setModalOpen(true);
  };

  // Open modal to edit existing application
  const handleOpenEditModal = (application) => {
    setEditingApplication(application);
    setDefaultNewStatus(application.status);
    setModalOpen(true);
  };

  // Open delete confirmation modal
  const handleOpenDeleteModal = (application) => {
    setDeletingApplication(application);
    setDeleteModalOpen(true);
  };

  // Save (Create or Update) handler
  const handleSaveApplication = (applicationData) => {
    if (editingApplication) {
      // Edit existing
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationData.id ? applicationData : app))
      );
      showToast(`Updated "${applicationData.company}" application`);
    } else {
      // Add new
      setApplications((prev) => [applicationData, ...prev]);
      showToast(`Added "${applicationData.company}" to ${applicationData.status}`);
    }
  };

  // Confirm delete application
  const handleConfirmDelete = (id) => {
    const appToDelete = applications.find((a) => a.id === id);
    setApplications((prev) => prev.filter((app) => app.id !== id));
    showToast(`Deleted ${appToDelete ? `"${appToDelete.company}"` : "application"}`);
  };

  // Update status (used in drag-drop and quick select)
  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          if (app.status !== newStatus) {
            showToast(`Moved "${app.company}" to ${newStatus}`);
          }
          return { ...app, status: newStatus };
        }
        return app;
      })
    );
  };

  // Reset to initial demo applications
  const handleResetData = () => {
    if (window.confirm("Reset all applications to the demo sample data?")) {
      const resetList = resetToDefaultApplications();
      setApplications(resetList);
      setSearchQuery("");
      setStatusFilter("All");
      showToast("Reset to demo sample applications");
    }
  };

  // Export applications as JSON
  const handleExportData = () => {
    exportApplicationsToJson(applications);
    showToast("Downloaded applications JSON backup");
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
  };

  // Filter & Sort Logic
  const filteredAndSortedApplications = useMemo(() => {
    let result = [...applications];

    // 1. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(q) ||
          app.role.toLowerCase().includes(q) ||
          (app.location && app.location.toLowerCase().includes(q)) ||
          (app.notes && app.notes.toLowerCase().includes(q))
      );
    }

    // 2. Status Filter (Only applied to table view or when statusFilter is specific)
    if (statusFilter !== "All") {
      result = result.filter((app) => app.status === statusFilter);
    }

    // 3. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date || 0) - new Date(a.date || 0);
        case "date-asc":
          return new Date(a.date || 0) - new Date(b.date || 0);
        case "company-asc":
          return a.company.localeCompare(b.company);
        case "company-desc":
          return b.company.localeCompare(a.company);
        case "role-asc":
          return a.role.localeCompare(b.role);
        default:
          return 0;
      }
    });

    return result;
  }, [applications, searchQuery, statusFilter, sortBy]);

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <aside className="toast-notification" aria-live="polite" role="status">
          <CheckCircleIcon size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Top Navbar */}
      <Navbar
        onAddNew={() => handleOpenAddModal("Applied")}
        onResetData={handleResetData}
        onExportData={handleExportData}
        totalCount={applications.length}
      />

      <main className="main-content">
        {/* Dashboard Metric Summary */}
        <StatsGrid
          applications={applications}
          activeFilter={statusFilter}
          onSelectFilter={(selectedStatus) => {
            // Clicking the active filter resets to 'All'
            setStatusFilter((current) => (current === selectedStatus ? "All" : selectedStatus));
          }}
        />

        {/* Search, Filter, Sort & View Controls */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalMatching={filteredAndSortedApplications.length}
          totalApplications={applications.length}
          onClearFilters={handleClearFilters}
        />

        {/* View: Kanban Board vs Table View */}
        <section className="view-container">
          {viewMode === "kanban" ? (
            <KanbanBoard
              applications={filteredAndSortedApplications}
              statusFilter={statusFilter}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onStatusChange={handleStatusChange}
              onDropCard={handleStatusChange}
              onAddNewWithStatus={handleOpenAddModal}
            />
          ) : (
            <ApplicationTable
              applications={filteredAndSortedApplications}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onStatusChange={handleStatusChange}
              onAddNew={() => handleOpenAddModal("Applied")}
            />
          )}
        </section>
      </main>

      {/* Floating Action Button for Mobile */}
      <button
        type="button"
        className="mobile-fab"
        onClick={() => handleOpenAddModal("Applied")}
        aria-label="Add Application"
      >
        <PlusIcon size={24} />
      </button>

      {/* Add / Edit Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveApplication}
        initialData={editingApplication}
        defaultStatus={defaultNewStatus}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        application={deletingApplication}
      />

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Job Application Tracker &bull; Data stored securely in your browser &bull; Built with React & Vite
        </p>
      </footer>
    </div>
  );
}

export default App;

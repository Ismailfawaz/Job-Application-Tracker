import React from "react";
import { SearchIcon, CloseIcon, KanbanIcon, ListIcon, SortIcon, FilterIcon } from "./Icons";
import { STATUS_LIST } from "../data/initialData";

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalMatching,
  totalApplications,
  onClearFilters
}) {
  const isFiltered = searchQuery.trim() !== "" || statusFilter !== "All";

  return (
    <div className="filter-bar">
      <div className="filter-bar-top">
        {/* Search Input */}
        <div className="search-box">
          <SearchIcon size={17} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by company, role, or location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange("")}
              title="Clear search"
            >
              <CloseIcon size={14} />
            </button>
          )}
        </div>

        {/* View Switcher: Kanban vs Table */}
        <div className="view-toggle-group" role="group" aria-label="View toggle">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "kanban" ? "active" : ""}`}
            onClick={() => onViewModeChange("kanban")}
            title="Kanban Board View"
          >
            <KanbanIcon size={17} />
            <span>Board</span>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
            onClick={() => onViewModeChange("table")}
            title="Table List View"
          >
            <ListIcon size={17} />
            <span>List</span>
          </button>
        </div>
      </div>

      <div className="filter-bar-bottom">
        {/* Status Filter Chips */}
        <div className="status-chips-container" role="tablist" aria-label="Status filters">
          <button
            type="button"
            role="tab"
            aria-selected={statusFilter === "All"}
            className={`status-chip ${statusFilter === "All" ? "active" : ""}`}
            onClick={() => onStatusFilterChange("All")}
          >
            All
          </button>
          {STATUS_LIST.map((status) => (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={statusFilter === status}
              className={`status-chip chip-${status.toLowerCase()} ${statusFilter === status ? "active" : ""}`}
              onClick={() => onStatusFilterChange(status)}
            >
              <span className={`chip-dot dot-${status.toLowerCase()}`} />
              {status}
            </button>
          ))}
        </div>

        {/* Controls: Sort Dropdown & Clear Filters */}
        <div className="filter-controls-right">
          <div className="sort-control">
            <SortIcon size={15} className="sort-icon" />
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort applications"
            >
              <option value="date-desc">Date (Newest first)</option>
              <option value="date-asc">Date (Oldest first)</option>
              <option value="company-asc">Company (A to Z)</option>
              <option value="company-desc">Company (Z to A)</option>
              <option value="role-asc">Job Role (A to Z)</option>
            </select>
          </div>

          {isFiltered && (
            <button
              type="button"
              className="btn btn-clear-filter"
              onClick={onClearFilters}
              title="Clear all filters"
            >
              <CloseIcon size={13} />
              <span>Clear Filter</span>
              <span className="filter-count-badge">{totalMatching}/{totalApplications}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

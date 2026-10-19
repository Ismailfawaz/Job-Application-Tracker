import React, { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { STATUS_LIST } from "../data/initialData";

export function KanbanBoard({
  applications,
  statusFilter,
  onEdit,
  onDelete,
  onStatusChange,
  onDropCard,
  onAddNewWithStatus
}) {
  const [draggedCardId, setDraggedCardId] = useState(null);

  // If status filter is 'All', show all columns. If a specific status is chosen, show only that column.
  const displayColumns = statusFilter === "All" ? STATUS_LIST : [statusFilter];

  return (
    <div className="kanban-wrapper">
      <div className={`kanban-board grid-cols-${displayColumns.length}`}>
        {displayColumns.map((status) => {
          const columnApps = applications.filter((app) => app.status === status);
          return (
            <KanbanColumn
              key={status}
              status={status}
              applications={columnApps}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onDropCard={onDropCard}
              draggedCardId={draggedCardId}
              setDraggedCardId={setDraggedCardId}
              onAddNewWithStatus={onAddNewWithStatus}
            />
          );
        })}
      </div>
    </div>
  );
}

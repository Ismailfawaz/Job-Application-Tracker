# 💼 Job Application Tracker

A clean, modern, and responsive Job Application Tracker built with **React**, **Vite**, and **plain CSS**. Manage internship and full-time job applications seamlessly with a dashboard, Kanban board, and table view.

---

## ✨ Features

- 📊 **Dashboard Stats**: Real-time metrics for **Total Applications**, **Applied**, **Interviews**, **Offers**, and **Rejections** with interview and offer conversion rates.
- 📋 **Interactive Kanban Board**: 4 drag-and-drop columns:
  - `Applied` (Recruiter review)
  - `Interview` (Screening & technical rounds)
  - `Offer` (Job offers & negotiations)
  - `Rejected` (Archived applications)
- 📝 **Full CRUD Operations**:
  - Add new job applications with comprehensive details.
  - Edit existing applications with pre-filled modal forms.
  - Delete applications with safety confirmation dialogs.
  - Quick status dropdowns on cards for mobile & touch screen support.
- 🗃️ **Stored Fields**:
  - Company Name
  - Job Role / Title
  - Application Date
  - Job Posting Link (clickable external URL)
  - Status (`Applied`, `Interview`, `Offer`, `Rejected`)
  - Location (e.g. Remote, Hybrid, City)
  - Compensation / Salary
  - Notes & Interview stage details
- 🔍 **Search, Filter & Sort**:
  - Instant search across company names, roles, locations, and notes.
  - Status filter chips with quick counts.
  - Sorting options: Date (Newest/Oldest), Company (A-Z/Z-A), Job Role (A-Z).
  - One-click "Clear Filter" button with matching count indicator.
- 🔄 **View Switcher**: Toggle seamlessly between **Kanban Board View** and **Table / List View**.
- 💾 **Persistent Local Storage**: Data automatically persists across page refreshes using browser `localStorage`.
- 📦 **Data Tools**:
  - Reset to realistic sample data at any time.
  - Export all applications as a downloadable `.json` backup file.
- 📱 **Responsive Design**: Designed with modern plain CSS, custom properties, and fluid layouts for mobile, tablet, and desktop screens (including a mobile floating action button).

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or newer).

### 2. Run the Development Server
In your terminal, navigate to the project directory and start the Vite server:

```powershell
npm run dev
```

Open your browser at:
```
http://localhost:5173
```

### 3. Build for Production
To create an optimized production build:

```powershell
npm run build
```

---

## 📁 Project Structure

```
d:/Job Application Tracker/
├── index.html                   # Entry HTML with typography links
├── package.json                 # Project scripts and dependencies
├── vite.config.js               # Vite build configuration
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application state & logic
    ├── index.css                # Plain CSS design system & responsive styling
    ├── components/
    │   ├── Navbar.jsx           # Header with logo, badges, and quick actions
    │   ├── StatsGrid.jsx        # Dashboard metrics & interactive filter cards
    │   ├── FilterBar.jsx        # Search, status chips, sort, & view mode toggle
    │   ├── KanbanBoard.jsx      # Kanban container with columns
    │   ├── KanbanColumn.jsx     # Drop-target column with empty states
    │   ├── ApplicationCard.jsx  # Draggable card with company avatar & actions
    │   ├── ApplicationTable.jsx # Sleek data table / list view
    │   ├── ApplicationModal.jsx # Add & Edit modal with form validation
    │   ├── DeleteConfirmModal.jsx # Confirmation dialog for safe deletions
    │   └── Icons.jsx            # Lightweight, reusable inline SVG icons
    ├── data/
    │   └── initialData.js       # Preloaded sample applications & status configs
    └── utils/
        ├── storage.js           # LocalStorage helpers & JSON export
        └── formatters.js        # Date, URL, and monogram color helpers
```

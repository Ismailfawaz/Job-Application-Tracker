import React from "react";
import { BriefcaseIcon, ClockIcon, AwardIcon, XCircleIcon, CheckCircleIcon } from "./Icons";

export function StatsGrid({ applications, activeFilter, onSelectFilter }) {
  const total = applications.length;
  const appliedCount = applications.filter((a) => a.status === "Applied").length;
  const interviewCount = applications.filter((a) => a.status === "Interview").length;
  const offerCount = applications.filter((a) => a.status === "Offer").length;
  const rejectedCount = applications.filter((a) => a.status === "Rejected").length;

  const interviewRate = total > 0 ? Math.round((interviewCount / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((offerCount / total) * 100) : 0;

  const stats = [
    {
      id: "all",
      filterValue: "All",
      title: "Total Applications",
      count: total,
      subtext: `${interviewCount + offerCount} active in pipeline`,
      icon: <BriefcaseIcon size={22} />,
      colorClass: "stat-total",
      iconBg: "#eff6ff",
      iconColor: "#2563eb",
    },
    {
      id: "applied",
      filterValue: "Applied",
      title: "Applied",
      count: appliedCount,
      subtext: "Awaiting recruiter review",
      icon: <ClockIcon size={22} />,
      colorClass: "stat-applied",
      iconBg: "#f0fdf4",
      iconColor: "#3b82f6",
    },
    {
      id: "interview",
      filterValue: "Interview",
      title: "Interviews",
      count: interviewCount,
      subtext: `${interviewRate}% interview rate`,
      icon: <CheckCircleIcon size={22} />,
      colorClass: "stat-interview",
      iconBg: "#fffbeb",
      iconColor: "#d97706",
    },
    {
      id: "offer",
      filterValue: "Offer",
      title: "Offers",
      count: offerCount,
      subtext: `${offerRate}% offer conversion`,
      icon: <AwardIcon size={22} />,
      colorClass: "stat-offer",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
    },
    {
      id: "rejected",
      filterValue: "Rejected",
      title: "Rejected",
      count: rejectedCount,
      subtext: "Archived / not selected",
      icon: <XCircleIcon size={22} />,
      colorClass: "stat-rejected",
      iconBg: "#fff1f2",
      iconColor: "#e11d48",
    },
  ];

  return (
    <section className="stats-section" aria-label="Application statistics">
      <div className="stats-grid">
        {stats.map((stat) => {
          const isSelected = activeFilter === stat.filterValue;
          return (
            <div
              key={stat.id}
              className={`stat-card ${stat.colorClass} ${isSelected ? "is-active" : ""}`}
              onClick={() => onSelectFilter(stat.filterValue)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectFilter(stat.filterValue);
                }
              }}
              title={`Click to filter by ${stat.title}`}
            >
              <div className="stat-card-header">
                <span className="stat-card-title">{stat.title}</span>
                <div
                  className="stat-card-icon"
                  style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="stat-card-body">
                <div className="stat-card-count">{stat.count}</div>
                <div className="stat-card-subtext">{stat.subtext}</div>
              </div>
              {isSelected && <div className="stat-card-active-indicator" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Format ISO date string (YYYY-MM-DD) to friendly readable format like "Oct 14, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return "No date";
  try {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
}

/**
 * Ensures URL starts with http:// or https:// so it can open externally
 */
export function sanitizeUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Returns initials / 2-letter monogram for company logo avatar
 */
export function getCompanyInitials(name) {
  if (!name) return "CO";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Generate a pastel-accent avatar color based on company name
 */
export function getAvatarColor(name) {
  const colors = [
    { bg: "#e0e7ff", text: "#4338ca" }, // indigo
    { bg: "#ede9fe", text: "#6d28d9" }, // purple
    { bg: "#fae8ff", text: "#a21caf" }, // fuchsia
    { bg: "#dbeafe", text: "#1d4ed8" }, // blue
    { bg: "#ccfbf1", text: "#0f766e" }, // teal
    { bg: "#dcfce7", text: "#15803d" }, // green
    { bg: "#fef3c7", text: "#b45309" }, // amber
    { bg: "#fee2e2", text: "#b91c1c" }  // red
  ];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Returns today's date formatted as YYYY-MM-DD for date inputs
 */
export function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

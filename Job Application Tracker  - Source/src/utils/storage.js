import { INITIAL_APPLICATIONS } from "../data/initialData";

const STORAGE_KEY = "career_pulse_job_applications_v1";

/**
 * Load applications from localStorage.
 * Falls back to INITIAL_APPLICATIONS if no data is stored.
 */
export function getStoredApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First visit: save initial sample data
      saveStoredApplications(INITIAL_APPLICATIONS);
      return INITIAL_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_APPLICATIONS;
  } catch (error) {
    console.error("Error reading applications from localStorage:", error);
    return INITIAL_APPLICATIONS;
  }
}

/**
 * Save applications array to localStorage.
 */
export function saveStoredApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error("Error writing applications to localStorage:", error);
  }
}

/**
 * Reset localStorage to initial sample dataset.
 */
export function resetToDefaultApplications() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
    return INITIAL_APPLICATIONS;
  } catch (error) {
    console.error("Error resetting applications in localStorage:", error);
    return INITIAL_APPLICATIONS;
  }
}

/**
 * Export current applications as a downloadable JSON file.
 */
export function exportApplicationsToJson(applications) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applications, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `job-applications-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

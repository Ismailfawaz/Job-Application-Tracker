// Realistic initial data for first-time visitors
export const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    company: "Google",
    role: "Frontend Software Engineer Intern",
    date: "2026-10-10",
    link: "https://www.google.com/about/careers/applications/jobs/results",
    status: "Interview",
    location: "Mountain View, CA (Hybrid)",
    salary: "$55/hr",
    notes: "Technical round scheduled with senior UI engineer. Brush up on React performance and DOM internals."
  },
  {
    id: "app-2",
    company: "Stripe",
    role: "Full Stack Engineer",
    date: "2026-10-05",
    link: "https://stripe.com/jobs",
    status: "Offer",
    location: "Remote (US)",
    salary: "$145,000/year",
    notes: "Received official written offer letter! Need to review equity package and respond by next Friday."
  },
  {
    id: "app-3",
    company: "Airbnb",
    role: "Product Designer & UI Engineer",
    date: "2026-10-14",
    link: "https://careers.airbnb.com/",
    status: "Applied",
    location: "San Francisco, CA",
    salary: "$130,000/year",
    notes: "Submitted tailored portfolio and cover letter highlighting accessible design systems."
  },
  {
    id: "app-4",
    company: "Figma",
    role: "Junior Web Developer",
    date: "2026-09-28",
    link: "https://www.figma.com/careers/",
    status: "Rejected",
    location: "New York, NY",
    salary: "$110,000/year",
    notes: "Application closed after initial screening. Keep practicing WebGL and Canvas."
  },
  {
    id: "app-5",
    company: "Spotify",
    role: "React Native / Mobile Intern",
    date: "2026-10-12",
    link: "https://www.lifeatspotify.com/jobs",
    status: "Interview",
    location: "Stockholm / Remote",
    salary: "Competitive",
    notes: "Completed take-home assignment. Round 2 behavioural chat with hiring manager on Tuesday."
  },
  {
    id: "app-6",
    company: "Vercel",
    role: "Developer Relations Engineer",
    date: "2026-10-16",
    link: "https://vercel.com/careers",
    status: "Applied",
    location: "Remote",
    salary: "$125,000/year",
    notes: "Submitted application via referral from community Discord."
  }
];

export const STATUS_CONFIG = {
  Applied: {
    label: "Applied",
    color: "#2563eb",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    textColor: "#1d4ed8",
    dotColor: "#3b82f6",
    description: "Submitted applications awaiting response"
  },
  Interview: {
    label: "Interview",
    color: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    textColor: "#b45309",
    dotColor: "#f59e0b",
    description: "Screening, technical, or final rounds"
  },
  Offer: {
    label: "Offer",
    color: "#059669",
    bgColor: "#ecfdf5",
    borderColor: "#a7f3d0",
    textColor: "#047857",
    dotColor: "#10b981",
    description: "Offers received and negotiations"
  },
  Rejected: {
    label: "Rejected",
    color: "#e11d48",
    bgColor: "#fff1f2",
    borderColor: "#fecdd3",
    textColor: "#be123c",
    dotColor: "#f43f5e",
    description: "Applications closed or passed on"
  }
};

export const STATUS_LIST = ["Applied", "Interview", "Offer", "Rejected"];

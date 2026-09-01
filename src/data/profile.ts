import type { Profile, NavLink } from "../types";

export const profile: Profile = {
  name: "Abhishek Sharma",
  role: "Analyst",
  company: "Deloitte Consulting India",
  tagline: "I build the systems that move data reliably between people.",
  summary:
    "Software engineer working on enterprise workflow systems, event-driven notification platforms and backend services using Java, Spring Boot, React, PostgreSQL and Kafka.",
  currentFocus:
    "Currently contributing to the LAO-PDR-IFMIS program, building enterprise workflow systems, notification platforms and backend services.",
  location: "India",
  email: "shrm.abhishek31@gmail.com",
  phone: "+91 9411917270",
  linkedin: "https://www.linkedin.com/in/abhisheksharmait/",
  github: "https://github.com/abhishek031",
  githubUsername: "abhishek031",
  resumeUrl: "/resume.pdf",
  stats: [
    { value: "2.5+", label: "Years in Software Engineering" },
    { value: "7+", label: "Years Professional Experience" },
    { value: "10+", label: "Technologies" },
    { value: "3", label: "Organizations" },
  ],
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
  { label: "Activity", href: "#activity" },
];

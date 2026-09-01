export interface Profile {
  name: string;
  role: string;
  company: string;
  tagline: string;
  summary: string;
  currentFocus: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  githubUsername: string;
  resumeUrl: string;
  stats: { value: string; label: string }[];
}

export interface ExperienceEntry {
  organization: string;
  url: string;
  title: string;
  period: string;
  project?: string;
  stack: string[];
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectDetail {
  heading: string;
  body: string;
}

export interface Project {
  name: string;
  org?: string;
  featured?: boolean;
  summary: string;
  stack: string[];
  details?: ProjectDetail[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}

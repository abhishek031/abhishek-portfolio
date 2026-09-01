import { profile } from "./profile";
import { experience } from "./experience";
import { skills } from "./skills";
import { projects } from "./projects";
import { certifications } from "./certifications";

/**
 * Serializes all portfolio content into a single text block used as the
 * AI assistant's grounding context. Kept in src/data so both the
 * frontend and the /api serverless function read from the exact same
 * source of truth as the visible page content.
 */
export function buildPortfolioContext(): string {
  const experienceText = experience
    .map(
      (e) =>
        `- ${e.title} at ${e.organization} (${e.period})${
          e.project ? `, project: ${e.project}` : ""
        }. Stack: ${e.stack.join(", ")}. Highlights: ${e.highlights.join("; ")}.`
    )
    .join("\n");

  const skillsText = skills
    .map((g) => `- ${g.category}: ${g.items.join(", ")}`)
    .join("\n");

  const projectsText = projects
    .map(
      (p) =>
        `- ${p.name}${p.org ? ` (${p.org})` : ""}: ${p.summary} Stack: ${p.stack.join(", ")}.`
    )
    .join("\n");

  const certsText = certifications
    .map((c) => `- ${c.title}, ${c.issuer} (${c.year})`)
    .join("\n");

  return `
Name: ${profile.name}
Role: ${profile.role} at ${profile.company}
Summary: ${profile.summary}
Current focus: ${profile.currentFocus}
Contact: ${profile.email}, LinkedIn: ${profile.linkedin}, GitHub: ${profile.github}

Experience:
${experienceText}

Skills:
${skillsText}

Projects:
${projectsText}

Certifications:
${certsText}
`.trim();
}

import type { Project } from "../types";

export const projects: Project[] = [
  {
    name: "Enterprise Notification Engine",
    org: "Deloitte | LAO-PDR-IFMIS",
    featured: true,
    summary:
      "A centralized enterprise notification platform for IFMIS supporting event-driven processing, Kafka consumer integration, role-based routing, dynamic recipient resolution, multi-role delivery, WebSocket-based real-time updates, notification history and unread-notification management.",
    stack: ["React", "Spring Boot", "PostgreSQL", "Kafka", "WebSocket", "Keycloak"],
    details: [
      {
        heading: "Event processing",
        body: "Kafka consumer integration, notification event processing, real-time delivery.",
      },
      {
        heading: "Recipient resolution",
        body: "Dynamic recipient resolution using user management and role mapping.",
      },
      {
        heading: "Notification delivery",
        body: "WebSocket push notifications, read/unread tracking, notification history.",
      },
      {
        heading: "Security & access control",
        body: "Keycloak integration, role-scoped visibility, multi-role support.",
      },
    ],
  },
  {
    name: "Customer Onboarding Platform",
    summary:
      "Customer onboarding, account creation, validation workflows and API integrations.",
    stack: ["Java", "Spring Boot", "MySQL"],
  },
  {
    name: "Task Management Platform",
    summary:
      "Task creation, assignment, tracking and workflow management using Java and Spring Boot.",
    stack: ["Java", "Spring Boot", "JPA"],
  },
];

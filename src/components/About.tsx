import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function About() {
  return (
    <section id="about" className="border-b border-line py-24">
      <Container>
        <Reveal>
          <SectionHeading>About</SectionHeading>

          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-text-muted">
            <p>
              I'm a software engineer focused on building scalable
              enterprise applications and workflow-driven systems using
              Java, Spring Boot, React, PostgreSQL, Kafka and WebSocket.
            </p>
            <p>
              At Deloitte Consulting India, I contribute to the
              LAO-PDR-IFMIS program, working on enterprise solutions,
              notification services, system integrations, workflow
              automation and backend development — collaborating with
              business stakeholders, architects and development teams to
              design reliable, maintainable software.
            </p>
            <p>
              I have hands-on experience with REST APIs, microservices,
              event-driven systems, database design and application
              integration, and I'm particularly drawn to system design and
              software architecture for large-scale, business-critical
              platforms.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default About;

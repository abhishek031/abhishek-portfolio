import { profile } from "../data/profile";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function Contact() {
  return (
    <section id="contact" className="border-b border-line py-24">
      <Container>
        <Reveal>
          <SectionHeading>Contact</SectionHeading>

          <p className="mb-10 max-w-xl leading-relaxed text-text-muted">
            Open to software engineering, backend development and
            enterprise application roles, and always glad to talk system
            design. Reach out if any of that overlaps with what you're
            building.
          </p>

          <div className="grid gap-x-12 gap-y-6 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                window.location.href = `mailto:${profile.email}`;
              }}
              className="group border-t border-line pt-4 text-left transition hover:border-signal"
            >
              <h3 className="text-sm font-medium text-signal">Email</h3>
              <p className="mt-2 text-sm text-text-muted group-hover:text-text">
                {profile.email.replace("@", " [at] ")}
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = `tel:${profile.phone.replace(/\s/g, "")}`;
              }}
              className="group border-t border-line pt-4 text-left transition hover:border-signal"
            >
              <h3 className="text-sm font-medium text-signal">Phone</h3>
              <p className="mt-2 text-sm text-text-muted group-hover:text-text">
                {profile.phone}
              </p>
            </button>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-line pt-4 transition hover:border-signal"
            >
              <h3 className="text-sm font-medium text-signal">LinkedIn</h3>
              <p className="mt-2 text-sm text-text-muted group-hover:text-text">
                Connect professionally
              </p>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Contact;

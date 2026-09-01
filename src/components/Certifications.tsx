import { certifications } from "../data/certifications";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function Certifications() {
  return (
    <section id="certifications" className="border-b border-line py-24">
      <Container>
        <Reveal>
          <SectionHeading>Certifications</SectionHeading>

          <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-t border-line pt-4 transition hover:border-signal"
              >
                <h3 className="text-base font-medium text-text group-hover:text-signal">
                  {cert.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-text-faint">
                  {cert.issuer} · {cert.year}
                </p>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Certifications;

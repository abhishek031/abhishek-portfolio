import { experience } from "../data/experience";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Tag from "./ui/Tag";
import Reveal from "./ui/Reveal";

function Experience() {
  return (
    <section id="experience" className="border-b border-line py-24">
      <Container>
        <Reveal>
          <SectionHeading>Experience</SectionHeading>

          <div className="space-y-0">
            {experience.map((entry, i) => (
              <div
                key={entry.organization}
                className="grid gap-3 border-t border-line py-8 md:grid-cols-[140px_1fr]"
              >
                <div className="font-mono text-sm text-text-faint">
                  {String(i + 1).padStart(2, "0")}
                  <div className="mt-1 text-signal">{entry.period}</div>
                </div>

                <div>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-text transition hover:text-signal"
                  >
                    {entry.organization}
                  </a>
                  <p className="mt-1 text-sm text-text-muted">
                    {entry.title}
                    {entry.project && ` · ${entry.project}`}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-sm text-text-muted">
                    {entry.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {entry.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Experience;

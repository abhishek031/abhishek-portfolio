import { projects } from "../data/projects";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Tag from "./ui/Tag";
import Reveal from "./ui/Reveal";

function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="border-b border-line py-24">
      <Container>
        <Reveal>
          <SectionHeading>Projects</SectionHeading>

          {featured && (
            <div className="mb-12 border-l-2 border-signal pl-6">
              {featured.org && (
                <p className="mb-2 font-mono text-xs text-text-faint">
                  {featured.org}
                </p>
              )}
              <h3 className="text-2xl font-semibold text-text">
                {featured.name}
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-text-muted">
                {featured.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {featured.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              {featured.details && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {featured.details.map((d) => (
                    <div key={d.heading}>
                      <h4 className="mb-1 text-sm font-medium text-text">
                        {d.heading}
                      </h4>
                      <p className="text-sm leading-relaxed text-text-muted">
                        {d.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid gap-x-12 gap-y-8 border-t border-line pt-8 sm:grid-cols-2">
            {rest.map((project) => (
              <div key={project.name}>
                <h3 className="text-lg font-semibold text-text">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {project.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {project.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Projects;

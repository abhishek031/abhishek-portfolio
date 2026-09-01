import { profile } from "../data/profile";
import Container from "./ui/Container";
import EventFlow from "./ui/EventFlow";

function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center border-b border-line pt-24"
    >
      <Container>
        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="mb-5 font-mono text-sm text-signal">
              {profile.role} · {profile.company}
            </p>

            <h1 className="mb-6 text-5xl font-semibold leading-[1.05] tracking-tight text-text md:text-6xl">
              {profile.name}
            </h1>

            <p className="mb-6 max-w-xl text-xl leading-relaxed text-text">
              {profile.tagline}
            </p>

            <p className="mb-4 max-w-xl leading-relaxed text-text-muted">
              {profile.summary}
            </p>

            <p className="mb-10 max-w-xl text-sm leading-relaxed text-text-faint">
              {profile.currentFocus}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded border border-line px-5 py-2.5 text-sm font-medium text-text transition hover:border-signal hover:text-signal"
              >
                View projects
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-line px-5 py-2.5 text-sm font-medium text-text transition hover:border-signal hover:text-signal"
              >
                Resume
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-line px-5 py-2.5 text-sm font-medium text-text transition hover:border-signal hover:text-signal"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-10">
            <EventFlow />
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 font-mono">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl text-signal">{stat.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;

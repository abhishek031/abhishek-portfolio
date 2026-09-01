import { useGithubActivity } from "../hooks/useGithubActivity";
import { timeAgo } from "../lib/timeAgo";
import { profile } from "../data/profile";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function GithubActivity() {
  const { publicRepos, followers, commits, status } = useGithubActivity(
    profile.githubUsername
  );

  return (
    <section id="activity" className="border-b border-line py-24">
      <Container>
        <Reveal>
          <SectionHeading>Recently shipped</SectionHeading>

          {status === "error" && (
            <p className="text-sm text-text-faint">
              Couldn't reach GitHub right now — see the full activity on{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal hover:underline"
              >
                {profile.github.replace("https://", "")}
              </a>
              .
            </p>
          )}

          {status === "loading" && (
            <p className="font-mono text-sm text-text-faint">
              Fetching live activity…
            </p>
          )}

          {status === "ready" && (
            <div className="grid gap-10 md:grid-cols-[160px_1fr]">
              <dl className="flex gap-8 md:block md:space-y-6">
                <div>
                  <dd className="text-2xl text-signal">{publicRepos}</dd>
                  <dt className="mt-1 text-xs text-text-muted">
                    Public repos
                  </dt>
                </div>
                <div>
                  <dd className="text-2xl text-signal">{followers}</dd>
                  <dt className="mt-1 text-xs text-text-muted">Followers</dt>
                </div>
              </dl>

              <div>
                {commits.length === 0 ? (
                  <p className="text-sm text-text-faint">
                    No public pushes in the recent activity window — check
                    the full history on{" "}
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-signal hover:underline"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {commits.map((c) => (
                      <li
                        key={c.url}
                        className="border-t border-line pt-4 first:border-t-0 first:pt-0"
                      >
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-text transition hover:text-signal"
                        >
                          {c.message}
                        </a>
                        <p className="mt-1 font-mono text-xs text-text-faint">
                          {c.repo} · {timeAgo(c.date)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

export default GithubActivity;

import { useEffect, useState } from "react";

interface GithubCommit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

interface GithubActivityState {
  publicRepos: number | null;
  followers: number | null;
  commits: GithubCommit[];
  status: "loading" | "ready" | "error";
}

interface GithubEventPayloadCommit {
  sha: string;
  message: string;
}

interface GithubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: GithubEventPayloadCommit[] };
}

export function useGithubActivity(username: string) {
  const [state, setState] = useState<GithubActivityState>({
    publicRepos: null,
    followers: null,
    commits: [],
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/events/public`),
        ]);

        if (!profileRes.ok || !eventsRes.ok) throw new Error("GitHub API error");

        const profileData = await profileRes.json();
        const events: GithubEvent[] = await eventsRes.json();

        const commits: GithubCommit[] = events
          .filter((e) => e.type === "PushEvent" && e.payload?.commits?.length)
          .slice(0, 4)
          .map((e) => {
            const commit = e.payload!.commits![e.payload!.commits!.length - 1];
            return {
              repo: e.repo.name.replace(`${username}/`, ""),
              message: commit.message.split("\n")[0].slice(0, 72),
              date: e.created_at,
              url: `https://github.com/${e.repo.name}/commit/${commit.sha}`,
            };
          });

        if (!cancelled) {
          setState({
            publicRepos: profileData.public_repos ?? null,
            followers: profileData.followers ?? null,
            commits,
            status: "ready",
          });
        }
      } catch {
        if (!cancelled) setState((s) => ({ ...s, status: "error" }));
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
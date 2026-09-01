import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks, profile } from "../data/profile";

interface Command {
  label: string;
  hint: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(
    () => [
      ...navLinks.map((link) => ({
        label: `Go to ${link.label}`,
        hint: link.href,
        action: () => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
        },
      })),
      {
        label: "Open resume",
        hint: "PDF",
        action: () => window.open(profile.resumeUrl, "_blank"),
      },
      {
        label: "Open LinkedIn",
        hint: "external",
        action: () => window.open(profile.linkedin, "_blank"),
      },
      {
        label: "Email me",
        hint: profile.email,
        action: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
    ],
    []
  );

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isToggle) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function runCommand(cmd: Command) {
    cmd.action();
    setOpen(false);
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      runCommand(filtered[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded border border-line px-3 py-1.5 font-mono text-xs text-text-faint transition hover:border-signal hover:text-signal md:flex"
        aria-label="Open command palette"
      >
        Search
        <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px]">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/70 pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKeyDown}
            className="w-full max-w-lg overflow-hidden rounded-lg border border-line bg-surface shadow-2xl"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command…"
              className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm text-text outline-none placeholder:text-text-faint"
            />
            <ul className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-text-faint">
                  No matching command
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.label}>
                  <button
                    type="button"
                    onClick={() => runCommand(cmd)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${
                      i === activeIndex
                        ? "bg-surface-2 text-signal"
                        : "text-text-muted"
                    }`}
                  >
                    <span>{cmd.label}</span>
                    <span className="font-mono text-xs text-text-faint">
                      {cmd.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

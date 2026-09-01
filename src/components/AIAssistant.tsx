import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What has he built with Kafka?",
  "What's his experience with Spring Boot?",
  "Is he open to new roles?",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(0, -1),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach the assistant. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-signal-dim bg-surface text-signal shadow-lg transition hover:border-signal"
      >
        {open ? "×" : "AI"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[90] flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-2xl">
          <div className="border-b border-line px-4 py-3">
            <p className="text-sm font-medium text-text">
              Ask about Abhishek's work
            </p>
            <p className="mt-0.5 text-xs text-text-faint">
              Answers are grounded in this portfolio's content.
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <div className="space-y-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="block w-full rounded border border-line px-3 py-2 text-left text-xs text-text-muted transition hover:border-signal hover:text-signal"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-signal-dim/20 text-text"
                    : "bg-surface-2 text-text-muted"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="max-w-[85%] rounded bg-surface-2 px-3 py-2 text-sm text-text-faint">
                Thinking…
              </div>
            )}

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-line p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded border border-line bg-ink px-3 py-2 text-sm text-text outline-none placeholder:text-text-faint focus:border-signal"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded border border-line px-3 py-2 text-sm text-signal transition hover:border-signal disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

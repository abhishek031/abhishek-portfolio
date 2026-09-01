import { buildPortfolioContext } from "../src/data/aiContext";

export const config = { runtime: "edge" };

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 500;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({ error: "Server is not configured with an API key" }, 500);
  }

  let body: { message?: string; history?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const message = (body.message ?? "").trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return json({ error: "Message is empty or too long" }, 400);
  }

  const history = Array.isArray(body.history)
    ? body.history.slice(-MAX_HISTORY_MESSAGES)
    : [];

  const systemPrompt = `You are a helpful assistant embedded on Abhishek Sharma's personal portfolio website. You answer visitors' questions about Abhishek's experience, skills, projects and certifications, using ONLY the information below. Speak about Abhishek in the third person. Be concise (2-4 sentences unless asked for detail). If asked something outside this context (unrelated to Abhishek's work), politely say you can only answer questions about Abhishek's portfolio.

Portfolio data:
${buildPortfolioContext()}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: systemPrompt,
        messages: [...history, { role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return json({ error: "The assistant is unavailable right now" }, 502);
    }

    const data = await response.json();
    const reply = data.content
      ?.map((block: { type: string; text?: string }) =>
        block.type === "text" ? block.text : ""
      )
      .join("")
      .trim();

    return json({ reply: reply || "Sorry, I couldn't generate a response." });
  } catch (err) {
    console.error("Chat function error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * The one deliberate motion moment on the page: a small event-flow
 * diagram (topic -> consumer -> client) that mirrors the notification
 * architecture described in the Experience/Projects sections. Built with
 * native SVG animation so it needs no JS and respects reduced-motion via
 * the global CSS override in index.css.
 */
export default function EventFlow() {
  const nodes = [
    { x: 20, y: 90, label: "Kafka topic" },
    { x: 190, y: 90, label: "Consumer service" },
    { x: 360, y: 90, label: "Client" },
  ];

  return (
    <svg
      viewBox="0 0 380 140"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Diagram of an event flowing from a Kafka topic through a consumer service to a client, representing an event-driven notification pipeline"
    >
      <line
        x1="20"
        y1="90"
        x2="360"
        y2="90"
        stroke="var(--color-line)"
        strokeWidth="1.5"
      />

      {nodes.map((n, i) => {
        const anchor = i === 0 ? "start" : i === nodes.length - 1 ? "end" : "middle";
        return (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy={n.y}
              r="5"
              fill="var(--color-ink)"
              stroke="var(--color-signal-dim)"
              strokeWidth="1.5"
            />
            <text
              x={n.x}
              y={n.y + 26}
              textAnchor={anchor}
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--color-text-faint)"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      <circle r="4" fill="var(--color-signal)">
        <animateMotion
          dur="3.2s"
          repeatCount="indefinite"
          path="M20,90 L360,90"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.05;0.9;1"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
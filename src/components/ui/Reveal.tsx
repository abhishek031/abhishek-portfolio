import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={visible ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </div>
  );
}

export default function Tag({ children }: { children: string }) {
  return (
    <span className="font-mono text-[13px] tracking-tight text-text-muted border-b border-line pb-0.5">
      {children}
    </span>
  );
}

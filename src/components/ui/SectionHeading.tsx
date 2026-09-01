export default function SectionHeading({
  children,
  index,
}: {
  children: string;
  index?: string;
}) {
  return (
    <h2 className="mb-12 flex items-baseline gap-4 text-3xl font-semibold tracking-tight text-text md:text-4xl">
      {index && (
        <span className="font-mono text-base font-normal text-signal">
          {index}
        </span>
      )}
      {children}
    </h2>
  );
}

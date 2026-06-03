export default function InfoColumn({
  title,
  width = 191,
  children,
}: {
  title: string;
  /** Column width in px. Defaults to 191 (BCG's standard). */
  width?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex shrink-0 flex-col gap-2 text-subtext"
      style={{ width }}
    >
      <p className="text-gray-2">{title}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex self-start items-center border-b border-gray-1 pb-2">
      <p className="font-sans font-medium text-h3 whitespace-nowrap">
        {children}
      </p>
    </div>
  );
}

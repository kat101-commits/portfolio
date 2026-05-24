type SnapshotCardProps = {
  /** Photo content rendered inside the white padding. Should fill its container. */
  children: React.ReactNode;
  /** Outer card width in px (frame + padding). */
  width: number;
  /** Outer card height in px (frame + padding). */
  height: number;
  /** Padding around the photo (the white "polaroid" border). */
  padding?: number;
  /** Corner radius of the outer frame. */
  radius?: number;
  /** Rotation in degrees applied to the whole card. */
  rotation?: number;
  /** Positioning utility classes. */
  className?: string;
};

export default function SnapshotCard({
  children,
  width,
  height,
  padding = 11.88,
  radius = 4.752,
  rotation = 0,
  className,
}: SnapshotCardProps) {
  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{
        width,
        height,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        filter: "drop-shadow(2.2px 4.752px 2.376px rgba(0,0,0,0.25))",
      }}
    >
      <div
        className="absolute inset-0 bg-white"
        style={{ borderRadius: radius, padding }}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow: "inset 2.2px 2.2px 4.4px 0 rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
}

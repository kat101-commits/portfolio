type VideoPlaceholderProps = {
  src?: string;
  poster?: string;
  /** CSS aspect-ratio expression, e.g. "618/460" or "16/9". */
  aspectRatio: string;
  className?: string;
  /** "cover" (default) crops to fill; "contain" shows the full video letterboxed. */
  videoFit?: "cover" | "contain";
  children?: React.ReactNode;
};

export default function VideoPlaceholder({
  src,
  poster,
  aspectRatio,
  className,
  videoFit = "cover",
  children,
}: VideoPlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-placeholder ${className ?? ""}`}
      style={{ aspectRatio }}
    >
      {src ? (
        <video
          className={`absolute inset-0 h-full w-full ${
            videoFit === "contain" ? "object-contain" : "object-cover"
          }`}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : null}
      {children}
    </div>
  );
}

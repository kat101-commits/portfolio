type PolaroidPhotoProps = {
  src: string;
  alt: string;
  /** Card width including the cream border, in px. Defaults to 235. */
  width?: number;
  /** Card height including the cream border, in px. Defaults to 298. */
  height?: number;
  /** Rotation in degrees applied to the polaroid. Defaults to 0. */
  rotation?: number;
  /** Positioning utility classes (typically absolute + left + top). Omit when
   *  rendering inside a flex-centering wrapper. */
  className?: string;
  /** Optional inline style for the inner <img>. When set, the image is rendered
   *  with absolute positioning + max-w-none so percentage-based pan/zoom values
   *  (e.g. width: '110.19%', left: '-3.81%') can be applied. */
  imageStyle?: React.CSSProperties;
};

const FRAME_COLOR = "#fff7ec";

export default function PolaroidPhoto({
  src,
  alt,
  width = 235,
  height = 298,
  rotation = 0,
  className,
  imageStyle,
}: PolaroidPhotoProps) {
  const borderThin = +(width * 0.0333).toFixed(2);
  const borderBottom = +(width * 0.1).toFixed(2);
  const radius = +(width * 0.0167).toFixed(2);

  return (
    <div
      className={className}
      style={{ width, height, transform: `rotate(${rotation}deg)` }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          backgroundColor: FRAME_COLOR,
          borderColor: FRAME_COLOR,
          borderStyle: "solid",
          borderTopWidth: borderThin,
          borderLeftWidth: borderThin,
          borderRightWidth: borderThin,
          borderBottomWidth: borderBottom,
          borderRadius: radius,
          boxShadow: `${borderThin * 0.375}px ${borderThin * 0.5}px ${borderThin * 0.625}px 0 rgba(0,0,0,0.15)`,
        }}
      >
        {imageStyle ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute max-w-none"
            style={imageStyle}
            loading="eager"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        )}
      </div>
    </div>
  );
}

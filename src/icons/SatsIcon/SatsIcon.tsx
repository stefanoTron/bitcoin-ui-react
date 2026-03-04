import { SatsIconProps } from "./SatsIcon.types";

/** Satoshi symbol icon (three parallel lines with two vertical strikes). */
export function SatsIcon({
  alt = "Satoshis",
  backgroundColor = "transparent",
  className,
  color = "#000000",
  decorative = false,
  size = 16,
  style,
  tilted = false,
  ref,
}: SatsIconProps) {
  return (
    <svg
      ref={ref}
      className={className}
      height={size}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      style={style}
      viewBox="1 1 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...(tilted ? { transform: "rotate(14 0 0)" } : {})}
    >
      {!decorative && <title>{alt}</title>}
      <circle cx={257} cy={257} r={256} fill={backgroundColor} />
      <path
        fill={color}
        d="m295.637 49.385 32.47 8.62-14.733 55.485-32.469-8.621zM200.577 407.402l32.469 8.621-14.732 55.485-32.47-8.621zM399.965 188.586l-8.622 32.468-231.517-61.471 8.622-32.47zM377.199 274.327l-8.622 32.47-231.517-61.473 8.621-32.469zM355.09 357.659l-8.622 32.469-231.517-61.472 8.621-32.47z"
      />
    </svg>
  );
}

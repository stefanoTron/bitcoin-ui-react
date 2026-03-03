import { ConfirmationBadgeProps } from "./ConfirmationBadge.types";

export function ConfirmationBadge({
  confirmations,
  threshold = 6,
  unconfirmedColor = "#ef4444",
  confirmingColor = "#f59e0b",
  confirmedColor = "#22c55e",
  unconfirmedLabel = "Unconfirmed",
  confirmedLabel = "Confirmed",
  showCount = true,
  fontFamily = "inherit",
  className,
  style,
}: ConfirmationBadgeProps) {
  const clamped = Math.max(0, Math.trunc(confirmations));
  const isUnconfirmed = clamped === 0;
  const isConfirmed = clamped >= threshold;

  const color = isUnconfirmed
    ? unconfirmedColor
    : isConfirmed
      ? confirmedColor
      : confirmingColor;

  let label: string;
  if (isUnconfirmed) {
    label = unconfirmedLabel;
  } else if (isConfirmed) {
    label = confirmedLabel;
  } else {
    label = showCount ? `${clamped}/${threshold}` : "";
  }

  return (
    <span
      data-testid="confirmation-badge"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        color,
        fontFamily,
        ...style,
      }}
    >
      {label}
    </span>
  );
}

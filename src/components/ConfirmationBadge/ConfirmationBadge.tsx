import { ConfirmationBadgeProps } from "./ConfirmationBadge.types";

/** Three-state confirmation indicator showing unconfirmed, confirming, or confirmed status. */
export function ConfirmationBadge({
  confirmations,
  threshold = 6,
  unconfirmedColor = "var(--btc-ui-color-negative, #ef4444)",
  confirmingColor = "var(--btc-ui-color-warning, #f59e0b)",
  confirmedColor = "var(--btc-ui-color-positive, #22c55e)",
  unconfirmedLabel = "Unconfirmed",
  confirmedLabel = "Confirmed",
  confirmingAriaLabel,
  confirmingLabelFormatter = (count: number, thresh: number) => `${count}/${thresh}`,
  showCount = true,
  fontFamily = "inherit",
  className,
  style,
  ref,
}: ConfirmationBadgeProps) {
  const clamped = Math.max(0, Math.trunc(confirmations));
  const isUnconfirmed = clamped === 0;
  const isConfirmed = clamped >= threshold;

  const color = isUnconfirmed ? unconfirmedColor : isConfirmed ? confirmedColor : confirmingColor;

  let label: string;
  if (isUnconfirmed) {
    label = unconfirmedLabel;
  } else if (isConfirmed) {
    label = confirmedLabel;
  } else {
    label = showCount ? confirmingLabelFormatter(clamped, threshold) : "";
  }

  const ariaLabel =
    clamped === 0
      ? unconfirmedLabel
      : clamped >= threshold
        ? confirmedLabel
        : (confirmingAriaLabel ?? `${clamped} of ${threshold} confirmations`);

  return (
    <span
      ref={ref}
      data-testid="confirmation-badge"
      role="status"
      aria-label={ariaLabel}
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

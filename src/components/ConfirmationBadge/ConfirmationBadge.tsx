import { ConfirmationBadgeProps } from "./ConfirmationBadge.types";
import { useBTCUIContext } from "../../context";

/** Three-state confirmation indicator showing unconfirmed, confirming, or confirmed status. */
export function ConfirmationBadge(props: ConfirmationBadgeProps) {
  const ctx = useBTCUIContext();
  const d = ctx?.confirmationBadge;

  const {
    confirmations,
    threshold = d?.threshold ?? 6,
    unconfirmedColor = d?.unconfirmedColor ?? "var(--btc-ui-color-negative, #ef4444)",
    confirmingColor = d?.confirmingColor ?? "var(--btc-ui-color-warning, #f59e0b)",
    confirmedColor = d?.confirmedColor ?? "var(--btc-ui-color-positive, #22c55e)",
    unconfirmedLabel = d?.unconfirmedLabel ?? "Unconfirmed",
    confirmedLabel = d?.confirmedLabel ?? "Confirmed",
    confirmingAriaLabel,
    confirmingLabelFormatter = (count: number, thresh: number) => `${count}/${thresh}`,
    showCount = d?.showCount ?? true,
    fontFamily = d?.fontFamily ?? ctx?.fontFamily ?? "var(--btc-ui-font-family, inherit)",
    className,
    style,
    ref,
  } = props;

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
      data-btc-ui=""
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

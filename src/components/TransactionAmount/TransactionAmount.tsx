import { useMemo } from "react";
import { TransactionAmountProps } from "./TransactionAmount.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";
import { clampSats } from "../../utils/clampSats";
import { resolveSymbol } from "../../utils/resolveSymbol";

/** Signed, colored transaction amount with directional indicator (sent/received). */
export function TransactionAmount({
  amount,
  positiveColor = "var(--btc-ui-color-positive, #22c55e)",
  negativeColor = "var(--btc-ui-color-negative, #ef4444)",
  inactiveColor = "var(--btc-ui-color-inactive, #999999)",
  showSign = true,
  symbol,
  symbolPosition = "left",
  fontFamily = "inherit",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  ariaLabel: customAriaLabel,
  ariaLabelFormatter = (dir: string, btc: string) => `${dir} ${btc} BTC`,
  className,
  style,
  ref,
}: TransactionAmountProps) {
  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const activeColor = isPositive ? positiveColor : isNegative ? negativeColor : inactiveColor;
  const sign = showSign && isPositive ? "+" : showSign && isNegative ? "\u2212" : "";
  const absAmount = Math.abs(amount);
  const btcValue = (clampSats(absAmount) / 100_000_000).toFixed(8);
  const direction = amount >= 0 ? "received" : "sent";
  const defaultAriaLabel = ariaLabelFormatter(direction, btcValue);

  const iconEl = useMemo(() => resolveSymbol(symbol), [symbol]);

  return (
    <span
      ref={ref}
      data-testid="transaction-amount"
      role="img"
      aria-label={customAriaLabel ?? defaultAriaLabel}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: iconEl ? "0.2em" : undefined,
        color: activeColor,
        fontFamily,
        ...style,
      }}
    >
      {iconEl && symbolPosition === "left" && iconEl}
      {sign && <span>{sign}</span>}
      <BTCAmount
        amount={absAmount}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        satsSeparator={satsSeparator}
        btcSeparator={btcSeparator}
        animate={false}
        ariaLabel=""
      />
      {iconEl && symbolPosition === "right" && iconEl}
    </span>
  );
}

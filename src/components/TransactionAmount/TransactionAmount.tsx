import { useMemo } from "react";
import { TransactionAmountProps } from "./TransactionAmount.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";
import { clampSats } from "../../utils/clampSats";
import { resolveSymbol } from "../../utils/resolveSymbol";
import { useBTCUIContext } from "../../context";

/** Signed, colored transaction amount with directional indicator (sent/received). */
export function TransactionAmount(props: TransactionAmountProps) {
  const ctx = useBTCUIContext();
  const d = ctx?.transactionAmount;

  const {
    amount,
    positiveColor = d?.positiveColor ?? "var(--btc-ui-color-positive, #22c55e)",
    negativeColor = d?.negativeColor ?? "var(--btc-ui-color-negative, #ef4444)",
    inactiveColor = d?.inactiveColor ?? "var(--btc-ui-color-inactive, #999999)",
    showSign = d?.showSign ?? true,
    symbol = d?.symbol,
    symbolPosition = d?.symbolPosition ?? "left",
    fontFamily = d?.fontFamily ?? ctx?.fontFamily ?? "var(--btc-ui-font-family, inherit)",
    satsSeparator = d?.satsSeparator ?? "\u2009",
    btcSeparator = d?.btcSeparator ?? ".",
    ariaLabel: customAriaLabel,
    ariaLabelFormatter = (dir: string, btc: string) => `${dir} ${btc} BTC`,
    className,
    style,
    ref,
  } = props;

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
      data-btc-ui=""
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

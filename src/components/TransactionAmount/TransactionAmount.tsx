import { isValidElement } from "react";
import { TransactionAmountProps } from "./TransactionAmount.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";
import { BitcoinIcon } from "../../icons/BitcoinIcon/BitcoinIcon";
import { SatsIcon } from "../../icons/SatsIcon/SatsIcon";

export function TransactionAmount({
  amount,
  positiveColor = "#22c55e",
  negativeColor = "#ef4444",
  inactiveColor = "#999999",
  showSign = true,
  symbol,
  symbolPosition = "left",
  fontFamily = "inherit",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  ariaLabel: customAriaLabel,
  className,
  style,
}: TransactionAmountProps) {
  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const activeColor = isPositive ? positiveColor : isNegative ? negativeColor : inactiveColor;
  const sign = showSign && isPositive ? "+" : showSign && isNegative ? "\u2212" : "";
  const absAmount = Math.abs(amount);
  const btcValue = (Math.max(0, Math.trunc(isNaN(absAmount) ? 0 : absAmount)) / 100_000_000).toFixed(8);
  const direction = amount >= 0 ? "Received" : "Sent";
  const defaultAriaLabel = `${direction} ${btcValue} BTC`;

  const iconEl = symbol === "btc"
    ? <BitcoinIcon size="1em" />
    : symbol === "sats"
      ? <SatsIcon size="1em" tilted />
      : isValidElement(symbol)
        ? symbol
        : null;

  return (
    <span
      data-testid="transaction-amount"
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
      />
      {iconEl && symbolPosition === "right" && iconEl}
    </span>
  );
}

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
  className,
  style,
}: TransactionAmountProps) {
  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const activeColor = isPositive ? positiveColor : isNegative ? negativeColor : inactiveColor;
  const sign = showSign && isPositive ? "+" : showSign && isNegative ? "\u2212" : "";
  const absAmount = Math.abs(amount);

  const iconEl = symbol
    ? symbol === "btc" ? <BitcoinIcon size="1em" /> : <SatsIcon size="1em" tilted />
    : null;

  return (
    <span
      data-testid="transaction-amount"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: symbol ? "0.2em" : undefined,
        color: activeColor,
        fontFamily,
        ...style,
      }}
    >
      {sign && <span>{sign}</span>}
      {iconEl && symbolPosition === "left" && iconEl}
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

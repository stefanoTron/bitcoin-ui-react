import { TransactionAmountProps } from "./TransactionAmount.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";

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

  return (
    <span
      data-testid="transaction-amount"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        color: activeColor,
        fontFamily,
        ...style,
      }}
    >
      {sign && <span>{sign}</span>}
      <BTCAmount
        amount={absAmount}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        satsSeparator={satsSeparator}
        btcSeparator={btcSeparator}
        symbol={symbol}
        symbolPosition={symbolPosition}
        animate={false}
      />
    </span>
  );
}

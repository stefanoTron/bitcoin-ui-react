import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { BTCAmountProps } from "./BTCAmount.types";

/**
 * Format a satoshi amount into an array of digits, separators, and their colors.
 * Always produces format: X.XX XXX XXX (minimum 9 digits + separators).
 */
function formatDigits(
  amount: number,
  activeColor: string,
  inactiveColor: string,
  btcSeparator: string,
  satsSeparator: string,
) {
  const clamped = Math.max(0, Math.trunc(isNaN(amount) ? 0 : amount));
  const digits = clamped.toString().split("");

  while (digits.length < 9) {
    digits.unshift("0");
  }

  const firstNonZero = digits.findIndex((d) => d !== "0");

  const result: { char: string; color: string; key: string; isDigit: boolean }[] = [];

  for (let i = 0; i < digits.length; i++) {
    const posFromRight = digits.length - 1 - i;
    const isActive = firstNonZero !== -1 && i >= firstNonZero;
    const color = isActive ? activeColor : inactiveColor;

    result.push({
      char: digits[i],
      color,
      key: `d-${posFromRight}`,
      isDigit: true,
    });

    if (posFromRight === 8) {
      const sepColor = isActive ? activeColor : inactiveColor;
      result.push({
        char: btcSeparator,
        color: sepColor,
        key: "btc-sep",
        isDigit: false,
      });
    }

    if (posFromRight === 6 || posFromRight === 3) {
      result.push({
        char: satsSeparator,
        color: "inherit",
        key: `sats-sep-${posFromRight}`,
        isDigit: false,
      });
    }
  }

  return result;
}

export function BTCAmount({
  amount,
  activeColor = "currentColor",
  inactiveColor = "#999999",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  fontFamily = "inherit",
  animate: shouldAnimate = true,
}: BTCAmountProps) {
  const motionValue = useMotionValue(shouldAnimate ? 0 : amount);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 120 });
  const [displayAmount, setDisplayAmount] = useState(shouldAnimate ? 0 : amount);

  useEffect(() => {
    motionValue.set(amount);
  }, [amount, motionValue]);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayAmount(amount);
      return;
    }
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayAmount(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue, shouldAnimate, amount]);

  const clamped = Math.max(0, Math.trunc(isNaN(displayAmount) ? 0 : displayAmount));

  const formatted = useMemo(
    () => formatDigits(displayAmount, activeColor, inactiveColor, btcSeparator, satsSeparator),
    [displayAmount, activeColor, inactiveColor, btcSeparator, satsSeparator],
  );

  return (
    <span
      data-testid="btc-amount"
      aria-label={`${(clamped / 100_000_000).toFixed(8)} BTC`}
      style={{ fontFamily, display: "inline-flex", alignItems: "baseline" }}
    >
      {formatted.map((item) => (
        <span
          key={item.key}
          data-digit={item.isDigit ? item.char : undefined}
          style={{ color: item.color }}
        >
          {item.char}
        </span>
      ))}
    </span>
  );
}

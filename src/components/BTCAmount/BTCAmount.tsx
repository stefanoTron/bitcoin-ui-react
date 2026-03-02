import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  // Clamp to valid range
  const clamped = Math.max(0, Math.trunc(isNaN(amount) ? 0 : amount));
  const digits = clamped.toString().split("");

  // Pad to minimum 9 digits
  while (digits.length < 9) {
    digits.unshift("0");
  }

  // Find the first non-zero digit to determine active range
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

    // Insert BTC separator after the "ones" BTC digit (8 positions from right)
    if (posFromRight === 8) {
      const sepColor = isActive ? activeColor : inactiveColor;
      result.push({
        char: btcSeparator,
        color: sepColor,
        key: "btc-sep",
        isDigit: false,
      });
    }

    // Insert sats separator at positions 6 and 3 from right
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
  const clamped = Math.max(0, Math.trunc(isNaN(amount) ? 0 : amount));

  const formatted = useMemo(
    () => formatDigits(amount, activeColor, inactiveColor, btcSeparator, satsSeparator),
    [amount, activeColor, inactiveColor, btcSeparator, satsSeparator],
  );

  return (
    <span
      data-testid="btc-amount"
      aria-label={`${(clamped / 100_000_000).toFixed(8)} BTC`}
      style={{ fontFamily, display: "inline-flex", alignItems: "baseline" }}
    >
      {formatted.map((item) =>
        item.isDigit && shouldAnimate ? (
          <AnimatePresence mode="popLayout" key={item.key}>
            <motion.span
              key={`${item.key}-${item.char}`}
              data-digit={item.char}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-block", color: item.color }}
            >
              {item.char}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span
            key={item.key}
            data-digit={item.isDigit ? item.char : undefined}
            style={{ color: item.color }}
          >
            {item.char}
          </span>
        ),
      )}
    </span>
  );
}

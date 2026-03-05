import { useEffect, useMemo, useState } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { BTCAmountProps } from "./BTCAmount.types";
import { clampSats } from "../../utils/clampSats";
import { resolveSymbol } from "../../utils/resolveSymbol";

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
  const clamped = clampSats(amount);
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

/**
 * Formatted BTC amount display with color-coded significant digits and spring animation.
 *
 * For lists with many simultaneous animations, set `animate={false}` to avoid per-frame re-renders.
 */
export function BTCAmount({
  amount,
  activeColor = "currentColor",
  inactiveColor = "var(--btc-ui-color-inactive, #999999)",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  animate: shouldAnimate = true,
  symbol,
  symbolPosition = "left",
  fontFamily = "inherit",
  ariaLabel: customAriaLabel,
  ariaLabelFormatter = (btc: string) => `${btc} BTC`,
  className,
  style: userStyle,
  ref,
}: BTCAmountProps) {
  const prefersReducedMotion = useReducedMotion();
  const effectiveAnimate = shouldAnimate && !prefersReducedMotion;

  const motionValue = useMotionValue(amount);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 300 });
  const [displayAmount, setDisplayAmount] = useState(amount);

  useEffect(() => {
    motionValue.set(amount);
  }, [amount, motionValue]);

  useEffect(() => {
    if (!effectiveAnimate) {
      setDisplayAmount(amount);
      return;
    }
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayAmount(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue, effectiveAnimate, amount]);

  const formatted = useMemo(
    () => formatDigits(displayAmount, activeColor, inactiveColor, btcSeparator, satsSeparator),
    [displayAmount, activeColor, inactiveColor, btcSeparator, satsSeparator],
  );

  const symbolEl = useMemo(() => resolveSymbol(symbol), [symbol]);

  return (
    <span
      ref={ref}
      data-testid="btc-amount"
      role={customAriaLabel !== "" ? "img" : undefined}
      aria-label={
        customAriaLabel !== ""
          ? (customAriaLabel ?? ariaLabelFormatter((clampSats(displayAmount) / 100_000_000).toFixed(8)))
          : undefined
      }
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: symbolEl ? "0.2em" : undefined,
        fontFamily,
        ...userStyle,
      }}
    >
      {symbolEl && symbolPosition === "left" && symbolEl}
      <span aria-hidden="true" style={{ display: "contents" }}>
        {formatted.map((item) => (
          <span key={item.key} data-digit={item.isDigit ? item.char : undefined} style={{ color: item.color }}>
            {item.char}
          </span>
        ))}
      </span>
      {symbolEl && symbolPosition === "right" && symbolEl}
    </span>
  );
}

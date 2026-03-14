import { useCallback, useId, useMemo, useRef } from "react";
import { BTCInputProps } from "./BTCInput.types";
import { mergeRefs } from "../../utils/mergeRefs";
import { clampSats } from "../../utils/clampSats";
import { useIsomorphicLayoutEffect } from "../../utils/useIsomorphicLayoutEffect";
import { useBTCUIContext } from "../../context";

/**
 * Format satoshis into a display string: X.XX XXX XXX
 */
function formatSats(sats: number, btcSep: string, satsSep: string): string {
  const clamped = clampSats(sats);
  const str = clamped.toString().padStart(9, "0");

  // Split into BTC part and 8-digit decimal part
  const btcPart = str.slice(0, str.length - 8) || "0";
  const decPart = str.slice(str.length - 8);

  // Group decimal part as XX XXX XXX
  const group1 = decPart.slice(0, 2);
  const group2 = decPart.slice(2, 5);
  const group3 = decPart.slice(5, 8);

  return `${btcPart}${btcSep}${group1}${satsSep}${group2}${satsSep}${group3}`;
}

/**
 * Parse a formatted display string back to satoshis.
 * Strips ALL non-digit characters (including btcSeparator and satsSeparator).
 */
function parseSats(display: string): number {
  const digitsOnly = display.replace(/\D/g, "");
  const parsed = parseInt(digitsOnly, 10);
  return clampSats(parsed);
}

/** Count digit characters in str from position `start` to end. */
function countDigitsAfter(str: string, start: number): number {
  let count = 0;
  for (let i = start; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") count++;
  }
  return count;
}

/** Find the character position right after the Nth digit from the left. */
function charPosAfterNthDigit(str: string, n: number): number {
  if (n <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") {
      seen++;
      if (seen === n) return i + 1;
    }
  }
  return str.length;
}

/** Formatted BTC input with automatic digit grouping and cursor preservation. */
export function BTCInput(props: BTCInputProps) {
  const ctx = useBTCUIContext();
  const d = ctx?.btcInput;

  const {
    amount,
    onAmountChange,
    activeColor = d?.activeColor ?? "currentColor",
    inactiveColor = d?.inactiveColor ?? "var(--btc-ui-color-inactive, #999999)",
    satsSeparator = d?.satsSeparator ?? "\u2009",
    btcSeparator = d?.btcSeparator ?? ".",
    disabled = false,
    fontFamily = d?.fontFamily ?? ctx?.fontFamily ?? "var(--btc-ui-font-family, inherit)",
    placeholder = d?.placeholder ?? "0.00\u2009000\u2009000",
    ariaLabel = "Amount in BTC",
    descriptionFormatter = (btc: string) => `${btc} BTC`,
    style: userStyle,
    className,
    ref,
  } = props;

  const descId = useId();
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMemo(() => mergeRefs(internalRef, ref), [ref]);
  const cursorRef = useRef<number | null>(null);

  const displayValue = useMemo(
    () => (amount === 0 ? "" : formatSats(amount, btcSeparator, satsSeparator)),
    [amount, btcSeparator, satsSeparator],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const rawValue = input.value;
      const cursorPos = input.selectionStart ?? rawValue.length;

      // Count digits AFTER the cursor — this is stable across reformatting
      // because the rightmost digits don't shift when zero-padding changes.
      cursorRef.current = countDigitsAfter(rawValue, cursorPos);

      const newSats = parseSats(rawValue);
      onAmountChange(newSats);
    },
    [onAmountChange],
  );

  // Restore cursor position after React updates the controlled input value.
  useIsomorphicLayoutEffect(() => {
    const input = internalRef.current;
    if (!input || cursorRef.current === null) return;

    const digitsAfter = cursorRef.current;
    const formatted = input.value;
    const totalDigits = countDigitsAfter(formatted, 0);
    const charPos = charPosAfterNthDigit(formatted, Math.max(0, totalDigits - digitsAfter));
    input.setSelectionRange(charPos, charPos);
    cursorRef.current = null;
  });

  const clampedAmount = clampSats(amount);
  const btcDescription = descriptionFormatter((clampedAmount / 100_000_000).toFixed(8));

  return (
    <span style={{ display: "contents" }}>
      <input
        ref={mergedRef}
        className={className}
        data-btc-ui=""
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        aria-describedby={descId}
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily,
          fontSize: "inherit",
          color: clampedAmount > 0 ? activeColor : inactiveColor,
          caretColor: activeColor,
          border: "none",
          outline: "none",
          textAlign: "end",
          background: "transparent",
          padding: 0,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          ...userStyle,
        }}
      />
      <span
        id={descId}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        {btcDescription}
      </span>
    </span>
  );
}

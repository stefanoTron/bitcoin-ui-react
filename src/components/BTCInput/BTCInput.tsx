import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { BTCInputProps } from "./BTCInput.types";

const MAX_SATS = 2_100_000_000_000_000; // 21 million BTC in satoshis

/**
 * Format satoshis into a display string: X.XX XXX XXX
 */
function formatSats(sats: number, btcSep: string, satsSep: string): string {
  const clamped = Math.max(0, Math.min(MAX_SATS, Math.trunc(isNaN(sats) ? 0 : sats)));
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
 */
function parseSats(display: string): number {
  const digitsOnly = display.replace(/\D/g, "");
  const parsed = parseInt(digitsOnly, 10);
  if (isNaN(parsed)) return 0;
  return Math.min(parsed, MAX_SATS);
}

/** Count digit characters in str from position `start` to end. */
function countDigitsAfter(str: string, start: number): number {
  let count = 0;
  for (let i = start; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") count++;
  }
  return count;
}

/** Count total digit characters in str. */
function countAllDigits(str: string): number {
  return countDigitsAfter(str, 0);
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

export function BTCInput({
  amount,
  onAmountChange,
  activeColor = "currentColor",
  inactiveColor = "#999999",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  disabled = false,
  placeholder = "0.00\u2009000\u2009000",
}: BTCInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
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

      // Count how many digits are AFTER the cursor in the user-edited string.
      // This is stable across reformatting because digits shift from the left (padding).
      const digitsAfter = countDigitsAfter(rawValue, cursorPos);

      const newSats = parseSats(rawValue);

      // If amount won't change, React won't re-render — restore manually.
      if (newSats === amount) {
        const formatted = newSats === 0 ? "" : formatSats(newSats, btcSeparator, satsSeparator);
        input.value = formatted;
        const total = countAllDigits(formatted);
        const charPos = charPosAfterNthDigit(formatted, Math.max(0, total - digitsAfter));
        input.setSelectionRange(charPos, charPos);
        cursorRef.current = null;
        return;
      }

      cursorRef.current = digitsAfter;
      onAmountChange(newSats);
    },
    [onAmountChange, amount, btcSeparator, satsSeparator],
  );

  // Restore cursor position after React updates the controlled value.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input || cursorRef.current === null) return;

    const digitsAfter = cursorRef.current;
    const formatted = input.value;
    const total = countAllDigits(formatted);
    const charPos = charPosAfterNthDigit(formatted, Math.max(0, total - digitsAfter));
    input.setSelectionRange(charPos, charPos);
    cursorRef.current = null;
  });

  const clampedAmount = Math.max(0, Math.min(MAX_SATS, Math.trunc(isNaN(amount) ? 0 : amount)));

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      role="textbox"
      value={displayValue}
      onChange={handleChange}
      disabled={disabled}
      placeholder={placeholder}
      style={{
        fontFamily: "inherit",
        fontSize: "inherit",
        color: clampedAmount > 0 ? activeColor : inactiveColor,
        caretColor: activeColor,
        border: "none",
        background: "transparent",
        padding: 0,
      }}
    />
  );
}

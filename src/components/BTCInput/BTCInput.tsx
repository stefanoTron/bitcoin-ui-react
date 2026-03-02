import { useCallback, useMemo } from "react";
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
  const displayValue = useMemo(
    () => (amount === 0 ? "" : formatSats(amount, btcSeparator, satsSeparator)),
    [amount, btcSeparator, satsSeparator],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const newSats = parseSats(raw);
      onAmountChange(newSats);
    },
    [onAmountChange],
  );

  const clampedAmount = Math.max(0, Math.min(MAX_SATS, Math.trunc(isNaN(amount) ? 0 : amount)));

  return (
    <input
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

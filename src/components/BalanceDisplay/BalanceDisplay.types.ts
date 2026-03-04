import type { Ref } from "react";

export interface BalanceDisplayProps {
  /** Balance in satoshis. */
  amount: number;
  /** Fiat value of the balance. If omitted, fiat unit is excluded from toggle. */
  fiatValue?: number;
  /** ISO 4217 currency code for fiat display. Default: 'USD' */
  fiatCode?: string;
  /** Locale for fiat number formatting. Default: 'en-US' */
  fiatLocale?: string;
  /** Currently displayed unit. Uncontrolled by default (internal state). */
  unit?: "btc" | "sats" | "fiat";
  /** Called when the unit changes (via tap). */
  onUnitChange?: (unit: "btc" | "sats" | "fiat") => void;
  /** Color for the amount text. Default: 'currentColor' */
  activeColor?: string;
  /** Color for the unit label. Default: '#999999' */
  labelColor?: string;
  /** Whether the unit label is tappable. Default: true */
  showToggle?: boolean;
  /** Label for BTC unit. Default: 'BTC' */
  btcLabel?: string;
  /** Label for sats unit. Default: 'sats' */
  satsLabel?: string;
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** Accessible label for the toggle button. Default: 'Switch display unit' */
  toggleAriaLabel?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
  /** Ref forwarded to the root div element. */
  ref?: Ref<HTMLDivElement>;
}

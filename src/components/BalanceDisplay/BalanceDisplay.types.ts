import type { Ref } from "react";

export interface FiatEntry {
  /** ISO 4217 currency code (e.g. "USD", "EUR"). */
  code: string;
  /** Pre-converted fiat value. */
  value: number;
}

/** Unit identifier. "btc", "sats", "fiat" (alias for "fiat:0"), or "fiat:N" for multi-fiat. */
export type BalanceUnit = "btc" | "sats" | "fiat" | `fiat:${number}`;

export interface BalanceDisplayProps {
  /** Balance in satoshis. */
  amount: number;
  /** Multiple fiat currencies. Cycle: btc → sats → fiat[0] → fiat[1] → … → btc. Takes precedence over fiatValue/fiatCode. */
  fiats?: FiatEntry[];
  /** Fiat value of the balance. If omitted and fiats is not provided, fiat unit is excluded from toggle. */
  fiatValue?: number;
  /** ISO 4217 currency code for fiat display. Default: 'USD' */
  fiatCode?: string;
  /** Locale for number formatting (sats grouping and fiat currency). Default: 'en-US' */
  locale?: string;
  /** Currently displayed unit. Uncontrolled by default (internal state). Use "fiat:N" to select a specific fiat entry. */
  unit?: BalanceUnit;
  /** Called when the unit changes (via tap). Fires with "fiat:N" for multi-fiat. */
  onUnitChange?: (unit: BalanceUnit) => void;
  /** Color for the amount text. Default: 'currentColor' */
  activeColor?: string;
  /** Color for the unit label. Themeable via `--btc-ui-color-inactive`. Default: '#999999' */
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

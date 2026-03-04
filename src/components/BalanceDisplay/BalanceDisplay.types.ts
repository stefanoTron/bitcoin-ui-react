export interface BalanceDisplayProps {
  /** Balance in satoshis. */
  amount: number;
  /** Fiat value of the balance. If omitted, fiat unit is excluded from toggle. */
  fiatValue?: number;
  /** ISO 4217 currency code for fiat display. Default: "USD". */
  fiatCode?: string;
  /** Locale for fiat number formatting. Default: "en-US". */
  fiatLocale?: string;
  /** Currently displayed unit. Uncontrolled by default (internal state). */
  unit?: "btc" | "sats" | "fiat";
  /** Called when the unit changes (via tap). */
  onUnitChange?: (unit: "btc" | "sats" | "fiat") => void;
  /** Color for the amount text. Default: "currentColor". */
  activeColor?: string;
  /** Color for the unit label. Default: "#999". */
  labelColor?: string;
  /** Whether the unit label is tappable. Default: true. */
  showToggle?: boolean;
  /** Custom class name for the root element. */
  className?: string;
  /** Custom inline styles for the root element. */
  style?: React.CSSProperties;
}

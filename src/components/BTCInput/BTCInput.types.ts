export interface BTCInputProps {
  /** Current amount in satoshis (integer). */
  amount: number;
  /** Callback fired when the amount changes. Receives satoshis as integer. */
  onAmountChange: (satoshis: number) => void;
  /** Color for significant digits. Default: 'currentColor' */
  activeColor?: string;
  /** Color for insignificant digits. Default: '#999999' */
  inactiveColor?: string;
  /** Separator between 3-digit satoshi groups. Default: '\u2009' (thin space) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** Whether the input is disabled. Default: false */
  disabled?: boolean;
  /** Placeholder text. Default: '0.00\u2009000\u2009000' */
  placeholder?: string;
  /** Additional inline styles merged onto the input element. */
  style?: React.CSSProperties;
  /** CSS class name. */
  className?: string;
}

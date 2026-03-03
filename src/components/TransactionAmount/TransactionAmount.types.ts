export interface TransactionAmountProps {
  /** Signed amount in satoshis. Positive = received, negative = sent. */
  amount: number;
  /** Color for positive (received) amounts. Default: '#22c55e' */
  positiveColor?: string;
  /** Color for negative (sent) amounts. Default: '#ef4444' */
  negativeColor?: string;
  /** Color for insignificant (zero-padded) digits. Default: '#999999' */
  inactiveColor?: string;
  /** Show +/- sign prefix. Default: true */
  showSign?: boolean;
  /** Show a symbol icon before the amount. */
  symbol?: "btc" | "sats";
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** Separator between 3-digit satoshi groups. Default: '\u2009' (thin space) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

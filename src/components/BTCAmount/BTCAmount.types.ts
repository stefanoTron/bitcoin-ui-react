export interface BTCAmountProps {
  /** Amount in satoshis (integer). */
  amount: number;
  /** Color for significant (non-zero leading) digits. Default: 'currentColor' */
  activeColor?: string;
  /** Color for insignificant (zero-padded) digits. Default: '#999999' */
  inactiveColor?: string;
  /** Separator between 3-digit satoshi groups. Default: '\u2009' (thin space) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** Whether to animate value changes. Default: true */
  animate?: boolean;
  /** Show a symbol icon next to the amount. */
  symbol?: "btc" | "sats";
  /** Position of the symbol icon. Default: 'left' */
  symbolPosition?: "left" | "right";
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

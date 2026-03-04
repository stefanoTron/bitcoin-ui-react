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
  /** Symbol shown next to the amount. Use "btc" or "sats" for built-in icons, or pass a custom React element. */
  symbol?: "btc" | "sats" | React.ReactElement;
  /** Position of the symbol. Default: 'left' */
  symbolPosition?: "left" | "right";
  /** Custom aria-label override. If omitted, auto-generated from amount. */
  ariaLabel?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

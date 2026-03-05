import type { Ref } from "react";

export interface TransactionAmountProps {
  /** Signed amount in satoshis. Positive = received, negative = sent. */
  amount: number;
  /** Color for positive (received) amounts. Themeable via `--btc-ui-color-positive`. Default: '#22c55e' */
  positiveColor?: string;
  /** Color for negative (sent) amounts. Themeable via `--btc-ui-color-negative`. Default: '#ef4444' */
  negativeColor?: string;
  /** Color for insignificant (zero-padded) digits. Themeable via `--btc-ui-color-inactive`. Default: '#999999' */
  inactiveColor?: string;
  /** Show +/- sign prefix. Default: true */
  showSign?: boolean;
  /** Symbol shown next to the amount. Use "btc" or "sats" for built-in icons, or pass a custom React element. */
  symbol?: "btc" | "sats" | React.ReactElement;
  /** Position of the symbol. Default: 'left' */
  symbolPosition?: "left" | "right";
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** Separator between 3-digit satoshi groups. Default: '\u2009' (thin space) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** Custom aria-label override. If omitted, auto-generated with sign and amount. */
  ariaLabel?: string;
  /** Formatter for the auto-generated aria-label.
   *  Receives direction ("received" | "sent") and BTC value string (e.g. "1.23456789").
   *  Default: `` (dir, btc) => `${dir} ${btc} BTC` `` */
  ariaLabelFormatter?: (direction: "received" | "sent", btcValue: string) => string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
  /** Ref forwarded to the root span element. */
  ref?: Ref<HTMLSpanElement>;
}

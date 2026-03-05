import type { Ref } from "react";

export interface ConfirmationBadgeProps {
  /** Number of confirmations. */
  confirmations: number;
  /** Number of confirmations considered "settled". Default: 6 */
  threshold?: number;
  /** Color for 0 confirmations. Themeable via `--btc-ui-color-negative`. Default: '#ef4444' */
  unconfirmedColor?: string;
  /** Color for 1 to threshold-1 confirmations. Themeable via `--btc-ui-color-warning`. Default: '#f59e0b' */
  confirmingColor?: string;
  /** Color for threshold+ confirmations. Themeable via `--btc-ui-color-positive`. Default: '#22c55e' */
  confirmedColor?: string;
  /** Label for 0 confirmations. Default: 'Unconfirmed' */
  unconfirmedLabel?: string;
  /** Label for threshold+ confirmations. Default: 'Confirmed' */
  confirmedLabel?: string;
  /** Accessible label for the confirming state. Default: '{count} of {threshold} confirmations' */
  confirmingAriaLabel?: string;
  /** Formatter for the visible confirming-state text.
   *  Receives the clamped count and threshold.
   *  Default: `` (count, threshold) => `${count}/${threshold}` `` */
  confirmingLabelFormatter?: (count: number, threshold: number) => string;
  /** Show confirmation count in the badge. Default: true */
  showCount?: boolean;
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
  /** Ref forwarded to the root span element. */
  ref?: Ref<HTMLSpanElement>;
}

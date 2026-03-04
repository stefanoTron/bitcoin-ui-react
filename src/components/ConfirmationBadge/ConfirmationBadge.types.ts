export interface ConfirmationBadgeProps {
  /** Number of confirmations. */
  confirmations: number;
  /** Number of confirmations considered "settled". Default: 6 */
  threshold?: number;
  /** Color for 0 confirmations. Default: '#ef4444' */
  unconfirmedColor?: string;
  /** Color for 1 to threshold-1 confirmations. Default: '#f59e0b' */
  confirmingColor?: string;
  /** Color for threshold+ confirmations. Default: '#22c55e' */
  confirmedColor?: string;
  /** Label for 0 confirmations. Default: 'Unconfirmed' */
  unconfirmedLabel?: string;
  /** Label for threshold+ confirmations. Default: 'Confirmed' */
  confirmedLabel?: string;
  /** Accessible label for the confirming state. Default: '{count} of {threshold} confirmations' */
  confirmingLabel?: string;
  /** Show confirmation count in the badge. Default: true */
  showCount?: boolean;
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

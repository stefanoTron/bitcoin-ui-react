export interface AddressDisplayProps {
  /** Bitcoin address string. */
  address: string;
  /** Number of characters to show at the start. Default: 8 */
  prefixChars?: number;
  /** Number of characters to show at the end. Default: 5 */
  suffixChars?: number;
  /** Whether to truncate the address. Default: true */
  truncate?: boolean;
  /** Truncation indicator between prefix and suffix. Default: '...' */
  separator?: string;
  /** Enable click-to-copy and show copy icon. Default: true */
  copyable?: boolean;
  /** Callback fired after address is copied. */
  onCopy?: () => void;
  /** Color for the address text. Default: 'currentColor' */
  addressColor?: string;
  /** Color for the separator. Default: '#999999' */
  separatorColor?: string;
  /** Color for the copy icon. Default: '#999999' */
  copyIconColor?: string;
  /** Accessible label for the copy button. Default: 'Copy address' */
  copyAriaLabel?: string;
  /** Text shown briefly after copying. Default: 'Copied!' */
  copiedLabel?: string;
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

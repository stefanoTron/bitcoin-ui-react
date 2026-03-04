import type { Ref } from "react";

export interface SeedPhraseInputProps {
  /** The current words array. Length should match wordCount. */
  words: string[];
  /** Called when any word changes. Receives the full updated array. */
  onWordsChange: (words: string[]) => void;
  /** Number of seed words. Default: 12 */
  wordCount?: 12 | 24;
  /** Read-only mode for displaying a generated seed. Default: false */
  readOnly?: boolean;
  /** Fires when all fields contain valid BIP39 words. */
  onComplete?: (words: string[]) => void;
  /** Number of columns in the grid. Default: 2 */
  columns?: 2 | 3 | 4;
  /** Custom inline styles for each input field. Merged with defaults. */
  inputStyle?: React.CSSProperties;
  /** Custom inline styles for the autocomplete dropdown. Merged with defaults. */
  dropdownStyle?: React.CSSProperties;
  /** Custom BIP39 wordlist. Default: built-in English wordlist */
  wordlist?: string[];
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** Accessible label for the input group. Default: 'Seed phrase' */
  groupLabel?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
  /** Ref forwarded to the root div element. */
  ref?: Ref<HTMLDivElement>;
}

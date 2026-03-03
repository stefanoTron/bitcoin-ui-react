export interface SeedPhraseInputProps {
  /** The current words array. Length should match wordCount. */
  words: string[];
  /** Called when any word changes. Receives the full updated array. */
  onWordsChange: (words: string[]) => void;
  /** Number of seed words. Default: 12. */
  wordCount?: 12 | 24;
  /** Read-only mode for displaying a generated seed. Default: false. */
  readOnly?: boolean;
  /** Fires when all fields contain valid BIP39 words. */
  onComplete?: (words: string[]) => void;
  /** Number of columns in the grid. Default: 2. */
  columns?: 2 | 3 | 4;
  /** Custom class name for the root element. */
  className?: string;
  /** Custom inline styles for the root element. */
  style?: React.CSSProperties;
}

# SeedPhraseInput Component Design

## Overview

A grid-based seed phrase input component for importing/displaying 12 or 24 BIP39 mnemonic words. Pure UI with built-in autocomplete from the bundled BIP39 English wordlist.

## Props API

```typescript
interface SeedPhraseInputProps {
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
```

## Design Decisions

### Controlled component

Consumer owns the `words` array and receives updates via `onWordsChange`. Matches the library's pattern (see BTCInput).

### Built-in BIP39 English wordlist

Bundled as a const array in `bip39-english.ts` (~11KB raw, ~4KB gzipped). Exported from the package for consumer reuse. Autocomplete uses prefix matching.

### Grid of individual inputs

Each word gets its own numbered input field. CSS Grid layout via inline styles with configurable column count (2, 3, or 4).

### onComplete callback

Fires when every field contains a word present in the BIP39 wordlist. This is a UI-level check (word exists in list), not cryptographic validation (no checksum verification).

### No multi-word paste

Each field accepts a single word only. No auto-distribution of pasted phrases.

## Autocomplete Behavior

- Dropdown appears below the active field as user types
- Prefix-based filtering against BIP39 wordlist
- Selecting a suggestion (click or Enter) fills the field and auto-focuses next empty field
- Tab advances to next field
- Dropdown is an absolutely-positioned `<ul>` rendered inline-styled
- Max visible suggestions capped (e.g., 6-8 items) with scroll

## Grid Layout

- Root: CSS Grid with `gridTemplateColumns: repeat(columns, 1fr)`
- Each cell: numbered label + input field
- Default 2 columns: 6 rows for 12 words, 12 rows for 24 words
- Columns prop allows 3 or 4 for wider layouts

## Read-Only Mode

- Same grid layout, inputs replaced with styled `<span>` elements
- Words are visible (not masked) — intended for backup verification
- No autocomplete, no focus management

## Validation

- No built-in error styling — consumer responsibility
- Consumer can compare `words` against their own validation logic
- External styling via className/style props

## BIP39 Wordlist

- File: `src/data/bip39-english.ts`
- Exported as `BIP39_ENGLISH_WORDLIST: readonly string[]`
- 2048 sorted English words per BIP39 spec
- Re-exported from package root for consumer use

## File Structure

```
src/
  components/
    SeedPhraseInput/
      SeedPhraseInput.tsx
      SeedPhraseInput.types.ts
      SeedPhraseInput.test.tsx
      SeedPhraseInput.stories.tsx
      index.ts
  data/
    bip39-english.ts
```

## Storybook Stories

- **Empty12** — 12 empty fields, default state
- **Empty24** — 24 empty fields
- **PartiallyFilled** — some words entered, showing mixed state
- **Complete** — all 12 words filled with valid BIP39 words
- **ReadOnly** — display mode with pre-filled words (backup verification)
- **ReadOnly24** — 24-word read-only display
- **ThreeColumns** — 3-column grid layout
- **FourColumns** — 4-column grid layout
- **WithAutocomplete** — interactive story demonstrating autocomplete behavior
- **Interactive** — full interactive story with state, showing onComplete firing
- **DarkTheme** — custom styling for dark backgrounds
- **InAForm** — realistic context: seed input inside a wallet recovery form with submit button
- **SideBySide** — 12-word and 24-word grids shown together for comparison

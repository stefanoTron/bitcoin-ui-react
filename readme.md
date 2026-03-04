# bitcoin-ui-react

React components for displaying and inputting Bitcoin amounts with satoshi precision.

## Install

```bash
npm install bitcoin-ui-react
```

Peer dependencies: `react >= 18`, `react-dom >= 18`

## Components

### BTCAmount

Display a formatted Bitcoin amount from satoshis with color-coded digits and animated transitions.

```tsx
import { BTCAmount } from "bitcoin-ui-react";

<BTCAmount amount={12537829} />
// Renders: 0.12 537 829
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | required | Amount in satoshis |
| `activeColor` | `string` | `'currentColor'` | Color for significant digits |
| `inactiveColor` | `string` | `'#999999'` | Color for zero-padded digits |
| `satsSeparator` | `string` | `' '` (thin space) | Separator between 3-digit groups |
| `btcSeparator` | `string` | `'.'` | Decimal separator |
| `animate` | `boolean` | `true` | Animate digit changes |
| `symbol` | `'btc' \| 'sats' \| ReactElement` | — | Built-in icon shorthand or custom element |
| `symbolPosition` | `'left' \| 'right'` | `'left'` | Position of the symbol |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `ariaLabel` | `string` | — | Custom aria-label override. If omitted, auto-generated from amount |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<HTMLSpanElement>` | — | Forwarded ref |

### BTCInput

Controlled input for entering Bitcoin amounts. Formats as user types.

```tsx
import { useState } from "react";
import { BTCInput } from "bitcoin-ui-react";

const [sats, setSats] = useState(0);
<BTCInput amount={sats} onAmountChange={setSats} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | required | Amount in satoshis |
| `onAmountChange` | `(sats: number) => void` | required | Callback when amount changes |
| `activeColor` | `string` | `'currentColor'` | Color for significant digits |
| `inactiveColor` | `string` | `'#999999'` | Color for zero-padded digits |
| `satsSeparator` | `string` | `' '` (thin space) | Separator between 3-digit groups |
| `btcSeparator` | `string` | `'.'` | Decimal separator |
| `disabled` | `boolean` | `false` | Disable the input |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `placeholder` | `string` | `'0.00 000 000'` | Placeholder text |
| `ariaLabel` | `string` | `'Amount in BTC'` | Accessible label for the input |
| `style` | `React.CSSProperties` | — | Additional inline styles for the input |
| `className` | `string` | — | CSS class name |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref |

### AddressDisplay

Truncated Bitcoin address with copy-to-clipboard.

```tsx
import { AddressDisplay } from "bitcoin-ui-react";

<AddressDisplay address="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" />
// Renders: bc1qxy2k...x0wlh [copy icon]
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `string` | required | Bitcoin address string |
| `prefixChars` | `number` | `8` | Characters shown at start |
| `suffixChars` | `number` | `5` | Characters shown at end |
| `truncate` | `boolean` | `true` | Whether to truncate the address |
| `separator` | `string` | `'...'` | Truncation indicator |
| `copyable` | `boolean` | `true` | Enable click-to-copy |
| `onCopy` | `() => void` | — | Callback after copy |
| `addressColor` | `string` | `'currentColor'` | Address text color |
| `separatorColor` | `string` | `'#999999'` | Separator color |
| `copyIconColor` | `string` | `'#999999'` | Copy icon color |
| `copyAriaLabel` | `string` | `'Copy address'` | Accessible label for the copy button |
| `copiedLabel` | `string` | `'Copied!'` | Feedback text after copy |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<HTMLSpanElement>` | — | Forwarded ref |

### TransactionAmount

Signed BTC amount for transaction lists. Color-coded: green for received, red for sent.

```tsx
import { TransactionAmount } from "bitcoin-ui-react";

<TransactionAmount amount={50000} />   // +0.00 050 000 (green)
<TransactionAmount amount={-120000} /> // −0.00 120 000 (red)
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | required | Signed amount in satoshis |
| `positiveColor` | `string` | `'#22c55e'` | Color for positive amounts |
| `negativeColor` | `string` | `'#ef4444'` | Color for negative amounts |
| `inactiveColor` | `string` | `'#999999'` | Color for zero-padded digits |
| `showSign` | `boolean` | `true` | Show +/− sign prefix |
| `symbol` | `'btc' \| 'sats' \| ReactElement` | — | Built-in icon shorthand or custom element |
| `symbolPosition` | `'left' \| 'right'` | `'left'` | Position of the symbol |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `satsSeparator` | `string` | `' '` (thin space) | Separator between groups |
| `btcSeparator` | `string` | `'.'` | Decimal separator |
| `ariaLabel` | `string` | — | Custom aria-label override. If omitted, auto-generated with sign and amount |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<HTMLSpanElement>` | — | Forwarded ref |

### ConfirmationBadge

Visual indicator for transaction confirmation count.

```tsx
import { ConfirmationBadge } from "bitcoin-ui-react";

<ConfirmationBadge confirmations={0} />   // "Unconfirmed" (red)
<ConfirmationBadge confirmations={3} />   // "3/6" (yellow)
<ConfirmationBadge confirmations={6} />   // "Confirmed" (green)
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `confirmations` | `number` | required | Number of confirmations |
| `threshold` | `number` | `6` | Confirmations for "settled" |
| `unconfirmedColor` | `string` | `'#ef4444'` | Color for 0 confirmations |
| `confirmingColor` | `string` | `'#f59e0b'` | Color for 1 to threshold−1 |
| `confirmedColor` | `string` | `'#22c55e'` | Color for threshold+ |
| `unconfirmedLabel` | `string` | `'Unconfirmed'` | Label for 0 confirmations |
| `confirmedLabel` | `string` | `'Confirmed'` | Label for threshold+ |
| `confirmingAriaLabel` | `string` | `'{count} of {threshold} confirmations'` | Accessible label for the confirming state |
| `showCount` | `boolean` | `true` | Show count in badge |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<HTMLSpanElement>` | — | Forwarded ref |

### SeedPhraseInput

Grid of input fields for entering or displaying a BIP39 seed phrase, with autocomplete suggestions from the BIP39 English wordlist.

```tsx
import { useState } from "react";
import { SeedPhraseInput } from "bitcoin-ui-react";

const [words, setWords] = useState(Array(12).fill(""));
<SeedPhraseInput
  words={words}
  onWordsChange={setWords}
  onComplete={(validWords) => console.log("Seed:", validWords)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `words` | `string[]` | required | The current words array. Length should match `wordCount` |
| `onWordsChange` | `(words: string[]) => void` | required | Called when any word changes. Receives the full updated array |
| `wordCount` | `12 \| 24` | `12` | Number of seed words |
| `readOnly` | `boolean` | `false` | Read-only mode for displaying a generated seed |
| `onComplete` | `(words: string[]) => void` | — | Fires when all fields contain valid BIP39 words |
| `columns` | `2 \| 3 \| 4` | `2` | Number of columns in the grid |
| `inputStyle` | `CSSProperties` | — | Custom inline styles for each input field. Merged with defaults |
| `dropdownStyle` | `CSSProperties` | — | Custom inline styles for the autocomplete dropdown. Merged with defaults |
| `wordlist` | `string[]` | built-in English | Custom BIP39 wordlist |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `groupLabel` | `string` | `'Seed phrase'` | Accessible label for the input group |
| `labelFormatter` | `(index: number) => string` | `` (i) => `Word ${i}` `` | Custom label formatter for word inputs. Receives 1-based index |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

### BalanceDisplay

Tappable balance display that cycles between BTC, sats, and fiat units. Works as both a controlled and uncontrolled component.

```tsx
import { BalanceDisplay } from "bitcoin-ui-react";

<BalanceDisplay amount={123_456_789} fiatValue={55_432.10} />
// Tap the label to cycle: BTC → sats → USD → BTC
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | required | Balance in satoshis |
| `fiatValue` | `number` | — | Fiat value of the balance. If omitted, fiat unit is excluded from toggle |
| `fiatCode` | `string` | `'USD'` | ISO 4217 currency code for fiat display |
| `locale` | `string` | `'en-US'` | Locale for number formatting (sats grouping and fiat currency) |
| `unit` | `'btc' \| 'sats' \| 'fiat'` | — | Currently displayed unit. Uncontrolled by default (internal state) |
| `onUnitChange` | `(unit: 'btc' \| 'sats' \| 'fiat') => void` | — | Called when the unit changes (via tap) |
| `activeColor` | `string` | `'currentColor'` | Color for the amount text |
| `labelColor` | `string` | `'#999999'` | Color for the unit label |
| `showToggle` | `boolean` | `true` | Whether the unit label is tappable |
| `btcLabel` | `string` | `'BTC'` | Label for BTC unit |
| `satsLabel` | `string` | `'sats'` | Label for sats unit |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `toggleAriaLabel` | `string` | `'Switch display unit'` | Accessible label for the toggle button |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

### BitcoinIcon

SVG Bitcoin logo icon.

```tsx
import { BitcoinIcon } from "bitcoin-ui-react";

<BitcoinIcon size={32} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `16` | Icon size in pixels, or a CSS length string like `'1em'` |
| `color` | `string` | `'#ffffff'` | Symbol color |
| `backgroundColor` | `string` | `'#f7931a'` | Background color |
| `alt` | `string` | `'Bitcoin'` | Accessibility label |
| `decorative` | `boolean` | `false` | Hide from screen readers when used decoratively |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<SVGSVGElement>` | — | Forwarded ref |

### SatsIcon

SVG Satoshis icon.

```tsx
import { SatsIcon } from "bitcoin-ui-react";

<SatsIcon size={32} tilted />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `16` | Icon size in pixels, or a CSS length string like `'1em'` |
| `color` | `string` | `'#000000'` | Symbol color |
| `backgroundColor` | `string` | `'transparent'` | Background color |
| `alt` | `string` | `'Satoshis'` | Accessibility label |
| `decorative` | `boolean` | `false` | Hide from screen readers when used decoratively |
| `tilted` | `boolean` | `false` | Apply tilt rotation |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |
| `ref` | `Ref<SVGSVGElement>` | — | Forwarded ref |

## Tree-shaking

If you only use `SeedPhraseInput`, import from the dedicated entry point to keep the BIP39 wordlist out of other bundles:

```tsx
import { SeedPhraseInput } from "bitcoin-ui-react/seed-phrase";
```

The main entry (`bitcoin-ui-react`) re-exports everything including `SeedPhraseInput` for convenience.

## License

MIT

# bitcoin-ui-react

[![npm version](https://img.shields.io/npm/v/bitcoin-ui-react)](https://www.npmjs.com/package/bitcoin-ui-react)
[![CI](https://github.com/stefanoTron/bitcoin-ui-react/actions/workflows/ci.yml/badge.svg)](https://github.com/stefanoTron/bitcoin-ui-react/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/npm/l/bitcoin-ui-react)](https://github.com/stefanoTron/bitcoin-ui-react/blob/main/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/bitcoin-ui-react)](https://bundlephobia.com/package/bitcoin-ui-react)
[![npm downloads](https://img.shields.io/npm/dm/bitcoin-ui-react)](https://www.npmjs.com/package/bitcoin-ui-react)

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

<BTCAmount amount={12537829} />;
// Renders: 0.12 537 829
```

| Prop                 | Type                              | Default                     | Description                                                        |
| -------------------- | --------------------------------- | --------------------------- | ------------------------------------------------------------------ |
| `amount`             | `number`                          | required                    | Amount in satoshis                                                 |
| `activeColor`        | `string`                          | `'currentColor'`            | Color for significant digits                                       |
| `inactiveColor`      | `string`                          | `'#999999'`                 | Color for zero-padded digits                                       |
| `satsSeparator`      | `string`                          | `' '` (thin space)          | Separator between 3-digit groups                                   |
| `btcSeparator`       | `string`                          | `'.'`                       | Decimal separator                                                  |
| `animate`            | `boolean`                         | `true`                      | Animate digit changes                                              |
| `symbol`             | `'btc' \| 'sats' \| ReactElement` | —                           | Built-in icon shorthand or custom element                          |
| `symbolPosition`     | `'left' \| 'right'`               | `'left'`                    | Position of the symbol                                             |
| `fontFamily`         | `string`                          | `'inherit'`                 | Font family                                                        |
| `ariaLabel`          | `string`                          | —                           | Custom aria-label override. If omitted, auto-generated from amount |
| `ariaLabelFormatter` | `(btcValue: string) => string`    | `` (btc) => `${btc} BTC` `` | Formatter for the auto-generated aria-label                        |
| `className`          | `string`                          | —                           | CSS class name                                                     |
| `style`              | `CSSProperties`                   | —                           | Additional inline styles                                           |
| `ref`                | `Ref<HTMLSpanElement>`            | —                           | Forwarded ref                                                      |

### BTCInput

Controlled input for entering Bitcoin amounts. Formats as user types.

```tsx
import { useState } from "react";
import { BTCInput } from "bitcoin-ui-react";

const [sats, setSats] = useState(0);
<BTCInput amount={sats} onAmountChange={setSats} />;
```

| Prop                   | Type                           | Default                     | Description                                                 |
| ---------------------- | ------------------------------ | --------------------------- | ----------------------------------------------------------- |
| `amount`               | `number`                       | required                    | Amount in satoshis                                          |
| `onAmountChange`       | `(sats: number) => void`       | required                    | Callback when amount changes                                |
| `activeColor`          | `string`                       | `'currentColor'`            | Color for significant digits                                |
| `inactiveColor`        | `string`                       | `'#999999'`                 | Color for zero-padded digits                                |
| `satsSeparator`        | `string`                       | `' '` (thin space)          | Separator between 3-digit groups                            |
| `btcSeparator`         | `string`                       | `'.'`                       | Decimal separator                                           |
| `disabled`             | `boolean`                      | `false`                     | Disable the input                                           |
| `fontFamily`           | `string`                       | `'inherit'`                 | Font family                                                 |
| `placeholder`          | `string`                       | `'0.00 000 000'`            | Placeholder text                                            |
| `ariaLabel`            | `string`                       | `'Amount in BTC'`           | Accessible label for the input                              |
| `descriptionFormatter` | `(btcValue: string) => string` | `` (btc) => `${btc} BTC` `` | Formatter for the visually-hidden screen reader description |
| `style`                | `React.CSSProperties`          | —                           | Additional inline styles for the input                      |
| `className`            | `string`                       | —                           | CSS class name                                              |
| `ref`                  | `Ref<HTMLInputElement>`        | —                           | Forwarded ref                                               |

### AddressDisplay

Truncated Bitcoin address with copy-to-clipboard.

```tsx
import { AddressDisplay } from "bitcoin-ui-react";

<AddressDisplay address="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" />;
// Renders: bc1qxy2k...x0wlh [copy icon]
```

| Prop             | Type                   | Default          | Description                          |
| ---------------- | ---------------------- | ---------------- | ------------------------------------ |
| `address`        | `string`               | required         | Bitcoin address string               |
| `prefixChars`    | `number`               | `8`              | Characters shown at start            |
| `suffixChars`    | `number`               | `5`              | Characters shown at end              |
| `truncate`       | `boolean`              | `true`           | Whether to truncate the address      |
| `separator`      | `string`               | `'...'`          | Truncation indicator                 |
| `copyable`       | `boolean`              | `true`           | Enable click-to-copy                 |
| `onCopy`         | `() => void`           | —                | Callback after copy                  |
| `addressColor`   | `string`               | `'currentColor'` | Address text color                   |
| `separatorColor` | `string`               | `'#999999'`      | Separator color                      |
| `copyIconColor`  | `string`               | `'#999999'`      | Copy icon color                      |
| `copyAriaLabel`  | `string`               | `'Copy address'` | Accessible label for the copy button |
| `copiedLabel`    | `string`               | `'Copied!'`      | Feedback text after copy             |
| `fontFamily`     | `string`               | `'inherit'`      | Font family                          |
| `className`      | `string`               | —                | CSS class name                       |
| `style`          | `CSSProperties`        | —                | Additional inline styles             |
| `ref`            | `Ref<HTMLSpanElement>` | —                | Forwarded ref                        |

### TransactionAmount

Signed BTC amount for transaction lists. Color-coded: green for received, red for sent.

```tsx
import { TransactionAmount } from "bitcoin-ui-react";

<TransactionAmount amount={50000} />   // +0.00 050 000 (green)
<TransactionAmount amount={-120000} /> // −0.00 120 000 (red)
```

| Prop                 | Type                                                            | Default                                 | Description                                                                 |
| -------------------- | --------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| `amount`             | `number`                                                        | required                                | Signed amount in satoshis                                                   |
| `positiveColor`      | `string`                                                        | `'#22c55e'`                             | Color for positive amounts                                                  |
| `negativeColor`      | `string`                                                        | `'#ef4444'`                             | Color for negative amounts                                                  |
| `inactiveColor`      | `string`                                                        | `'#999999'`                             | Color for zero-padded digits                                                |
| `showSign`           | `boolean`                                                       | `true`                                  | Show +/− sign prefix                                                        |
| `symbol`             | `'btc' \| 'sats' \| ReactElement`                               | —                                       | Built-in icon shorthand or custom element                                   |
| `symbolPosition`     | `'left' \| 'right'`                                             | `'left'`                                | Position of the symbol                                                      |
| `fontFamily`         | `string`                                                        | `'inherit'`                             | Font family                                                                 |
| `satsSeparator`      | `string`                                                        | `' '` (thin space)                      | Separator between groups                                                    |
| `btcSeparator`       | `string`                                                        | `'.'`                                   | Decimal separator                                                           |
| `ariaLabel`          | `string`                                                        | —                                       | Custom aria-label override. If omitted, auto-generated with sign and amount |
| `ariaLabelFormatter` | `(direction: "received" \| "sent", btcValue: string) => string` | `` (dir, btc) => `${dir} ${btc} BTC` `` | Formatter for the auto-generated aria-label                                 |
| `className`          | `string`                                                        | —                                       | CSS class name                                                              |
| `style`              | `CSSProperties`                                                 | —                                       | Additional inline styles                                                    |
| `ref`                | `Ref<HTMLSpanElement>`                                          | —                                       | Forwarded ref                                                               |

### ConfirmationBadge

Visual indicator for transaction confirmation count.

```tsx
import { ConfirmationBadge } from "bitcoin-ui-react";

<ConfirmationBadge confirmations={0} />   // "Unconfirmed" (red)
<ConfirmationBadge confirmations={3} />   // "3/6" (yellow)
<ConfirmationBadge confirmations={6} />   // "Confirmed" (green)
```

| Prop                       | Type                                           | Default                                  | Description                                     |
| -------------------------- | ---------------------------------------------- | ---------------------------------------- | ----------------------------------------------- |
| `confirmations`            | `number`                                       | required                                 | Number of confirmations                         |
| `threshold`                | `number`                                       | `6`                                      | Confirmations for "settled"                     |
| `unconfirmedColor`         | `string`                                       | `'#ef4444'`                              | Color for 0 confirmations                       |
| `confirmingColor`          | `string`                                       | `'#f59e0b'`                              | Color for 1 to threshold−1                      |
| `confirmedColor`           | `string`                                       | `'#22c55e'`                              | Color for threshold+                            |
| `unconfirmedLabel`         | `string`                                       | `'Unconfirmed'`                          | Label for 0 confirmations                       |
| `confirmedLabel`           | `string`                                       | `'Confirmed'`                            | Label for threshold+                            |
| `confirmingAriaLabel`      | `string`                                       | `'{count} of {threshold} confirmations'` | Accessible label for the confirming state       |
| `confirmingLabelFormatter` | `(count: number, threshold: number) => string` | `` (c, t) => `${c}/${t}` ``              | Formatter for the visible confirming-state text |
| `showCount`                | `boolean`                                      | `true`                                   | Show count in badge                             |
| `fontFamily`               | `string`                                       | `'inherit'`                              | Font family                                     |
| `className`                | `string`                                       | —                                        | CSS class name                                  |
| `style`                    | `CSSProperties`                                | —                                        | Additional inline styles                        |
| `ref`                      | `Ref<HTMLSpanElement>`                         | —                                        | Forwarded ref                                   |

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
/>;
```

| Prop             | Type                        | Default                  | Description                                                              |
| ---------------- | --------------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `words`          | `string[]`                  | required                 | The current words array. Length should match `wordCount`                 |
| `onWordsChange`  | `(words: string[]) => void` | required                 | Called when any word changes. Receives the full updated array            |
| `wordCount`      | `12 \| 24`                  | `12`                     | Number of seed words                                                     |
| `readOnly`       | `boolean`                   | `false`                  | Read-only mode for displaying a generated seed                           |
| `onComplete`     | `(words: string[]) => void` | —                        | Fires when all fields contain valid BIP39 words                          |
| `columns`        | `2 \| 3 \| 4`               | `2`                      | Number of columns in the grid                                            |
| `inputStyle`     | `CSSProperties`             | —                        | Custom inline styles for each input field. Merged with defaults          |
| `dropdownStyle`  | `CSSProperties`             | —                        | Custom inline styles for the autocomplete dropdown. Merged with defaults |
| `wordlist`       | `string[]`                  | built-in English         | Custom BIP39 wordlist                                                    |
| `fontFamily`     | `string`                    | `'inherit'`              | Font family                                                              |
| `groupLabel`     | `string`                    | `'Seed phrase'`          | Accessible label for the input group                                     |
| `labelFormatter` | `(index: number) => string` | `` (i) => `Word ${i}` `` | Custom label formatter for word inputs. Receives 1-based index           |
| `className`      | `string`                    | —                        | CSS class name                                                           |
| `style`          | `CSSProperties`             | —                        | Additional inline styles                                                 |
| `ref`            | `Ref<HTMLDivElement>`       | —                        | Forwarded ref                                                            |

### BalanceDisplay

Tappable balance display that cycles between BTC, sats, and fiat units. Works as both a controlled and uncontrolled component.

```tsx
import { BalanceDisplay } from "bitcoin-ui-react";

<BalanceDisplay amount={123_456_789} fiatValue={55_432.1} />;
// Tap the label to cycle: BTC → sats → USD → BTC
```

| Prop              | Type                                        | Default                 | Description                                                              |
| ----------------- | ------------------------------------------- | ----------------------- | ------------------------------------------------------------------------ |
| `amount`          | `number`                                    | required                | Balance in satoshis                                                      |
| `fiatValue`       | `number`                                    | —                       | Fiat value of the balance. If omitted, fiat unit is excluded from toggle |
| `fiatCode`        | `string`                                    | `'USD'`                 | ISO 4217 currency code for fiat display                                  |
| `locale`          | `string`                                    | `'en-US'`               | Locale for number formatting (sats grouping and fiat currency)           |
| `unit`            | `'btc' \| 'sats' \| 'fiat'`                 | —                       | Currently displayed unit. Uncontrolled by default (internal state)       |
| `onUnitChange`    | `(unit: 'btc' \| 'sats' \| 'fiat') => void` | —                       | Called when the unit changes (via tap)                                   |
| `activeColor`     | `string`                                    | `'currentColor'`        | Color for the amount text                                                |
| `labelColor`      | `string`                                    | `'#999999'`             | Color for the unit label                                                 |
| `showToggle`      | `boolean`                                   | `true`                  | Whether the unit label is tappable                                       |
| `btcLabel`        | `string`                                    | `'BTC'`                 | Label for BTC unit                                                       |
| `satsLabel`       | `string`                                    | `'sats'`                | Label for sats unit                                                      |
| `fontFamily`      | `string`                                    | `'inherit'`             | Font family                                                              |
| `toggleAriaLabel` | `string`                                    | `'Switch display unit'` | Accessible label for the toggle button                                   |
| `className`       | `string`                                    | —                       | CSS class name                                                           |
| `style`           | `CSSProperties`                             | —                       | Additional inline styles                                                 |
| `ref`             | `Ref<HTMLDivElement>`                       | —                       | Forwarded ref                                                            |

### BitcoinIcon

SVG Bitcoin logo icon.

```tsx
import { BitcoinIcon } from "bitcoin-ui-react";

<BitcoinIcon size={32} />;
```

| Prop              | Type                 | Default     | Description                                              |
| ----------------- | -------------------- | ----------- | -------------------------------------------------------- |
| `size`            | `number \| string`   | `16`        | Icon size in pixels, or a CSS length string like `'1em'` |
| `color`           | `string`             | `'#ffffff'` | Symbol color                                             |
| `backgroundColor` | `string`             | `'#f7931a'` | Background color                                         |
| `alt`             | `string`             | `'Bitcoin'` | Accessibility label                                      |
| `decorative`      | `boolean`            | `false`     | Hide from screen readers when used decoratively          |
| `className`       | `string`             | —           | CSS class name                                           |
| `style`           | `CSSProperties`      | —           | Additional inline styles                                 |
| `ref`             | `Ref<SVGSVGElement>` | —           | Forwarded ref                                            |

### SatsIcon

SVG Satoshis icon.

```tsx
import { SatsIcon } from "bitcoin-ui-react";

<SatsIcon size={32} tilted />;
```

| Prop              | Type                 | Default         | Description                                              |
| ----------------- | -------------------- | --------------- | -------------------------------------------------------- |
| `size`            | `number \| string`   | `16`            | Icon size in pixels, or a CSS length string like `'1em'` |
| `color`           | `string`             | `'#000000'`     | Symbol color                                             |
| `backgroundColor` | `string`             | `'transparent'` | Background color                                         |
| `alt`             | `string`             | `'Satoshis'`    | Accessibility label                                      |
| `decorative`      | `boolean`            | `false`         | Hide from screen readers when used decoratively          |
| `tilted`          | `boolean`            | `false`         | Apply tilt rotation                                      |
| `className`       | `string`             | —               | CSS class name                                           |
| `style`           | `CSSProperties`      | —               | Additional inline styles                                 |
| `ref`             | `Ref<SVGSVGElement>` | —               | Forwarded ref                                            |

## Utilities

### clampSats / MAX_SATS

Clamp a value to valid satoshi range (0 to 2,100,000,000,000,000). Used internally by all components; exported for consumer-side validation.

```tsx
import { clampSats, MAX_SATS } from "bitcoin-ui-react";

clampSats(-100); // 0
clampSats(1.7); // 1 (truncated)
clampSats(9e15); // 2_100_000_000_000_000 (MAX_SATS)
```

## Performance

`BTCAmount` animates digit changes using spring animations. Each digit runs its own `useSpring`, which triggers per-frame re-renders during transitions. For large lists of amounts, pass `animate={false}` to disable animations and avoid unnecessary re-renders:

```tsx
<BTCAmount amount={sats} animate={false} />
```

## Security

`SeedPhraseInput` holds seed phrase words in React state. React state is **not** designed for secrets — values may persist in memory, appear in devtools, or be captured by browser extensions. For production wallets, clear words from state as soon as they are consumed and consider using the component only in secure contexts (e.g., onboarding flows, not long-lived screens).

## RTL Support

All components use logical CSS properties (`text-align: end` instead of `right`) where applicable. Separators and layout should work correctly in RTL contexts. If you use a custom `satsSeparator` or `btcSeparator`, ensure the characters are appropriate for your locale.

## Tree-shaking

If you only use `SeedPhraseInput`, import from the dedicated entry point to keep the BIP39 wordlist out of other bundles:

```tsx
import { SeedPhraseInput } from "bitcoin-ui-react/seed-phrase";
```

The main entry (`bitcoin-ui-react`) re-exports everything including `SeedPhraseInput` for convenience.

## Development

```bash
git clone https://github.com/stefanoTron/bitcoin-ui-react.git
cd bitcoin-ui-react
nvm use
npm install
```

| Command                   | Description                |
| ------------------------- | -------------------------- |
| `npm test`                | Run tests                  |
| `npm run typecheck`       | Type-check with TypeScript |
| `npm run lint`            | Lint with ESLint           |
| `npm run build`           | Build CJS + ESM + DTS      |
| `npm run storybook`       | Start Storybook dev server |
| `npm run build-storybook` | Build static Storybook     |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Ensure all checks pass (`npm run lint && npm run typecheck && npm test && npm run build`)
5. Commit your changes
6. Open a pull request

## License

MIT

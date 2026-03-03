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
| `symbol` | `'btc' \| 'sats'` | — | Show a symbol icon before the amount |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |

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
| `placeholder` | `string` | `'0.00 000 000'` | Placeholder text |
| `style` | `React.CSSProperties` | — | Additional inline styles for the input |
| `className` | `string` | — | CSS class name |

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
| `separator` | `string` | `'...'` | Truncation indicator |
| `copyable` | `boolean` | `true` | Enable click-to-copy |
| `onCopy` | `() => void` | — | Callback after copy |
| `addressColor` | `string` | `'currentColor'` | Address text color |
| `separatorColor` | `string` | `'#999999'` | Separator color |
| `copyIconColor` | `string` | `'#999999'` | Copy icon color |
| `copiedLabel` | `string` | `'Copied!'` | Feedback text after copy |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |

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
| `symbol` | `'btc' \| 'sats'` | — | Symbol icon before amount |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `satsSeparator` | `string` | `' '` (thin space) | Separator between groups |
| `btcSeparator` | `string` | `'.'` | Decimal separator |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |

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
| `showCount` | `boolean` | `true` | Show count in badge |
| `fontFamily` | `string` | `'inherit'` | Font family |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |

### BitcoinIcon

SVG Bitcoin logo icon.

```tsx
import { BitcoinIcon } from "bitcoin-ui-react";

<BitcoinIcon size={32} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `16` | Icon size in pixels |
| `color` | `string` | `'#ffffff'` | Symbol color |
| `backgroundColor` | `string` | `'#f7931a'` | Background color |
| `alt` | `string` | `'Bitcoin'` | Accessibility label |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |

### SatsIcon

SVG Satoshis icon.

```tsx
import { SatsIcon } from "bitcoin-ui-react";

<SatsIcon size={32} tilted />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `16` | Icon size in pixels |
| `color` | `string` | `'#000000'` | Symbol color |
| `backgroundColor` | `string` | `'transparent'` | Background color |
| `alt` | `string` | `'Satoshis'` | Accessibility label |
| `tilted` | `boolean` | `false` | Apply tilt rotation |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Additional inline styles |

## License

MIT

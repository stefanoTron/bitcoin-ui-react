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
| `fontFamily` | `string` | `'inherit'` | Font family override |
| `animate` | `boolean` | `true` | Animate digit changes |
| `symbol` | `'btc' \| 'sats'` | — | Show a symbol icon before the amount |

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

## License

MIT

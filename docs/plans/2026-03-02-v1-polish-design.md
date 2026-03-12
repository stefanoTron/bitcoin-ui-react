# v1 Polish & New Components Design

**Goal:** Harden existing component APIs and add 3 wallet-focused components before publishing v1 to npm.

**Audience:** Bitcoin wallet developers building production React apps.

**Constraints:** No new dependencies. Inline styles + className. BTC/sats only (no fiat).

---

## Existing Component Fixes

### All components: add `className` and `style` props

Every component should accept `className?: string` and `style?: React.CSSProperties` for Tailwind/CSS-in-JS compatibility. Currently only BTCInput has `style`.

### BTCAmount: drop `fontFamily` prop

Remove `fontFamily` — users can achieve the same result via `style={{ fontFamily: "monospace" }}`. Less API surface, more consistent with other components.

### SatsIcon: fix `tilted` semantics

Currently backwards: `tilted={false}` applies rotation, `tilted={true}` removes it. Flip so `tilted={true}` applies the tilt rotation and `tilted={false}` (default) renders upright.

### BTCInput: add `className` prop

Already has `style`, just needs `className`.

---

## New Components

### 1. AddressDisplay

Truncated Bitcoin address with copy-to-clipboard.

```tsx
<AddressDisplay address="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" />
// Renders: bc1qxy2k...x0wlh [copy icon]
```

**Props:**

| Prop             | Type            | Default          |
| ---------------- | --------------- | ---------------- |
| `address`        | `string`        | required         |
| `prefixChars`    | `number`        | `8`              |
| `suffixChars`    | `number`        | `5`              |
| `separator`      | `string`        | `'...'`          |
| `copyable`       | `boolean`       | `true`           |
| `onCopy`         | `() => void`    | —                |
| `addressColor`   | `string`        | `'currentColor'` |
| `separatorColor` | `string`        | `'#999999'`      |
| `copyIconColor`  | `string`        | `'#999999'`      |
| `copiedLabel`    | `string`        | `'Copied!'`      |
| `fontFamily`     | `string`        | `'inherit'`      |
| `className`      | `string`        | —                |
| `style`          | `CSSProperties` | —                |

Uses `navigator.clipboard.writeText` for copy. Shows brief "Copied!" feedback after clicking.

### 2. TransactionAmount

Signed BTC amount for transaction lists. Positive = received (green), negative = sent (red).

```tsx
<TransactionAmount amount={50000} />     // +0.00 050 000
<TransactionAmount amount={-120000} />   // -0.00 120 000
```

**Props:**

| Prop            | Type              | Default     |
| --------------- | ----------------- | ----------- |
| `amount`        | `number`          | required    |
| `positiveColor` | `string`          | `'#22c55e'` |
| `negativeColor` | `string`          | `'#ef4444'` |
| `inactiveColor` | `string`          | `'#999999'` |
| `showSign`      | `boolean`         | `true`      |
| `symbol`        | `'btc' \| 'sats'` | —           |
| `fontFamily`    | `string`          | `'inherit'` |
| `satsSeparator` | `string`          | `'\u2009'`  |
| `btcSeparator`  | `string`          | `'.'`       |
| `className`     | `string`          | —           |
| `style`         | `CSSProperties`   | —           |

Wraps BTCAmount internally. Adds sign prefix and color based on positive/negative.

### 3. ConfirmationBadge

Visual indicator for transaction confirmation count. Three states based on threshold.

```tsx
<ConfirmationBadge confirmations={0} />   // "Unconfirmed" (red)
<ConfirmationBadge confirmations={3} />   // "3/6" (yellow)
<ConfirmationBadge confirmations={6} />   // "Confirmed" (green)
```

**Props:**

| Prop               | Type            | Default         |
| ------------------ | --------------- | --------------- |
| `confirmations`    | `number`        | required        |
| `threshold`        | `number`        | `6`             |
| `unconfirmedColor` | `string`        | `'#ef4444'`     |
| `confirmingColor`  | `string`        | `'#f59e0b'`     |
| `confirmedColor`   | `string`        | `'#22c55e'`     |
| `unconfirmedLabel` | `string`        | `'Unconfirmed'` |
| `confirmedLabel`   | `string`        | `'Confirmed'`   |
| `showCount`        | `boolean`       | `true`          |
| `fontFamily`       | `string`        | `'inherit'`     |
| `className`        | `string`        | —               |
| `style`            | `CSSProperties` | —               |

Three states: 0 = unconfirmed (red), 1 to threshold-1 = confirming (yellow, shows "N/threshold"), threshold+ = confirmed (green).

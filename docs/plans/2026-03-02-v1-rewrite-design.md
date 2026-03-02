# bitcoin-ui-react v1 — Clean Room Rewrite Design

## Goal

Ship a working v1 of `bitcoin-ui-react`: a focused React component library for Bitcoin amount display and input with satoshi-level precision.

## Decisions

- **Package name:** `bitcoin-ui-react`
- **Scope:** 4 components only — BTCAmount, BTCInput, BitcoinIcon, SatsIcon
- **Removed:** Generic Button and Input components (no value over existing UI libraries)
- **Bundler:** tsup (replaces Rollup + 6 plugins)
- **Styling:** Inline styles only (no CSS modules, zero CSS overhead for consumers)
- **Animation:** Keep framer-motion for BTCAmount digit transitions
- **Approach:** Clean room rewrite of all components against updated dependencies

## Dependency Updates

All dependencies updated to latest major versions:

- React 18 → React 19 (peer dep, support both 18 and 19)
- TypeScript 5.2 → 5.7+
- Storybook 8.0 → 8.5+
- framer-motion 10 → 11
- Jest, React Testing Library, Babel — all to latest
- **Added:** tsup
- **Removed:** rollup, rollup-plugin-dts, rollup-plugin-terser, @rollup/plugin-commonjs, @rollup/plugin-node-resolve, @rollup/plugin-typescript, rollup-plugin-peer-deps-external, rollup.config.mjs

## Project Structure

```
src/
├── index.ts
├── components/
│   ├── index.ts
│   ├── BTCInput/
│   │   ├── BTCInput.tsx
│   │   ├── BTCInput.types.ts
│   │   ├── BTCInput.test.tsx
│   │   ├── BTCInput.stories.tsx
│   │   └── index.ts
│   └── BTCAmount/
│       ├── BTCAmount.tsx
│       ├── BTCAmount.types.ts
│       ├── BTCAmount.test.tsx
│       ├── BTCAmount.stories.tsx
│       └── index.ts
└── icons/
    ├── index.ts
    ├── BitcoinIcon/
    │   ├── BitcoinIcon.tsx
    │   ├── BitcoinIcon.types.ts
    │   ├── BitcoinIcon.test.tsx
    │   ├── BitcoinIcon.stories.tsx
    │   └── index.ts
    └── SatsIcon/
        ├── SatsIcon.tsx
        ├── SatsIcon.types.ts
        ├── SatsIcon.test.tsx
        ├── SatsIcon.stories.tsx
        └── index.ts
```

**Removed files:** Button/, Input/, typings.d.ts, *.module.css, rollup.config.mjs

## Component APIs

### BTCAmount

Display-only component rendering a formatted BTC amount from satoshis with color-coded digits and animated transitions.

```tsx
interface BTCAmountProps {
  /** Amount in satoshis */
  amount: number
  /** Color for significant (non-zero leading) digits. Default: currentColor */
  activeColor?: string
  /** Color for insignificant digits. Default: '#999' */
  inactiveColor?: string
  /** Separator between sats groups (3-digit). Default: ' ' (thin space) */
  satsSeparator?: string
  /** Separator between BTC whole and decimal. Default: '.' */
  btcSeparator?: string
  /** Font family override. Default: inherit */
  fontFamily?: string
  /** Animate value changes. Default: true */
  animate?: boolean
}
```

Rendering: `1.00 000 000` — each digit in a `<span>` with active/inactive color. Animation via framer-motion `AnimatePresence` on digit changes.

### BTCInput

Controlled input component for Bitcoin amount entry with formatting.

```tsx
interface BTCInputProps {
  /** Current amount in satoshis */
  amount: number
  /** Callback when amount changes */
  onAmountChange: (satoshis: number) => void
  /** Color for significant digits. Default: currentColor */
  activeColor?: string
  /** Color for insignificant digits. Default: '#999' */
  inactiveColor?: string
  /** Separator between sats groups. Default: ' ' */
  satsSeparator?: string
  /** Separator between BTC whole and decimal. Default: '.' */
  btcSeparator?: string
  /** Disabled state */
  disabled?: boolean
  /** Placeholder text. Default: '0.00 000 000' */
  placeholder?: string
}
```

Controlled via `amount` + `onAmountChange`. Formats display as user types, strips non-numeric input, clamps to valid satoshi range (0 to 2,100,000,000,000,000).

### BitcoinIcon

```tsx
interface BitcoinIconProps {
  /** Icon size in px. Default: 16 */
  size?: number
  /** Symbol color. Default: '#fff' */
  color?: string
  /** Background color. Default: '#f7931a' */
  backgroundColor?: string
  /** Accessibility label */
  alt?: string
}
```

### SatsIcon

```tsx
interface SatsIconProps {
  /** Icon size in px. Default: 16 */
  size?: number
  /** Symbol color. Default: '#000' */
  color?: string
  /** Background color. Default: 'transparent' */
  backgroundColor?: string
  /** Accessibility label */
  alt?: string
  /** Rotate the icon. Default: false */
  tilted?: boolean
}
```

## Testing

Jest + React Testing Library (latest versions).

- **BTCAmount:** Correct formatted output for various satoshi values, active/inactive color application, edge cases (0, max supply 2.1 quadrillion sats)
- **BTCInput:** Controlled input behavior, format on keystroke, reject non-numeric, clamp to valid range, onAmountChange callback with correct satoshi value
- **BitcoinIcon:** Renders SVG, applies size/color/backgroundColor
- **SatsIcon:** Renders SVG, applies props, tilted rotation

No coverage thresholds in v1.

## Storybook

Comprehensive stories with full props documentation via JSDoc → argTypes.

- **BTCAmount:** Zero, small amounts, large amounts, max supply, custom colors, custom separators, animation on/off, font family override
- **BTCInput:** Interactive with live state, disabled, custom colors, custom separators, edge cases (paste, backspace, max value)
- **BitcoinIcon:** Default, size variants, custom colors, custom background
- **SatsIcon:** Default, tilted, size variants, custom colors
- **Docs page** per component with full props table and usage examples

## Publishing

- Package name: `bitcoin-ui-react`
- `"files": ["dist"]` in package.json
- Entry points: `main` (CJS), `module` (ESM), `types` (DTS)
- Peer deps: `react >= 18`, `react-dom >= 18`
- Build via tsup

## README

Correct package name, installation, usage example per component, props tables. Under 100 lines.

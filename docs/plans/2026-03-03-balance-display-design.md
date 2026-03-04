# BalanceDisplay Component Design

## Overview

A large-format balance component that cycles through BTC, sats, and fiat display on tap. Wraps BTCAmount internally for BTC/sats rendering. Crossfade animation between units via motion/react.

## Props API

```typescript
interface BalanceDisplayProps {
  /** Balance in satoshis. */
  amount: number;
  /** Fiat value of the balance. If omitted, fiat unit is excluded from toggle. */
  fiatValue?: number;
  /** ISO 4217 currency code for fiat display (e.g. "USD", "EUR"). Default: "USD". */
  fiatCode?: string;
  /** Locale for fiat number formatting. Default: "en-US". */
  fiatLocale?: string;
  /** Currently displayed unit. Uncontrolled by default (internal state). */
  unit?: "btc" | "sats" | "fiat";
  /** Called when the unit changes (via tap). */
  onUnitChange?: (unit: "btc" | "sats" | "fiat") => void;
  /** Color for the amount text. Default: "currentColor". */
  activeColor?: string;
  /** Color for the unit label. Default: "#999". */
  labelColor?: string;
  /** Whether the unit label is tappable. Default: true. */
  showToggle?: boolean;

  className?: string;
  style?: React.CSSProperties;
}
```

## Behavior

- **Uncontrolled (default):** internal state starts at "btc", cycles btc → sats → fiat → btc on tap
- **Controlled:** consumer passes `unit` + `onUnitChange`, component doesn't manage state
- **No fiat:** if `fiatValue` is undefined, toggle skips fiat (btc ↔ sats only)
- **Crossfade:** uses motion/react AnimatePresence for smooth transition between displays
- **BTC/sats rendering:** delegates to BTCAmount (reuses digit coloring, formatting)
- **Fiat rendering:** Intl.NumberFormat with fiatCode and fiatLocale

## Unit Label

Tappable text below/beside the amount showing "BTC", "sats", or the currency symbol. Tapping cycles to the next unit.

## File Structure

```
src/
  components/
    BalanceDisplay/
      BalanceDisplay.tsx
      BalanceDisplay.types.ts
      BalanceDisplay.test.tsx
      BalanceDisplay.stories.tsx
      index.ts
```

## Storybook Stories

- **Default** — interactive with toggle, starts at BTC
- **Sats** — starts showing sats
- **WithFiat** — BTC/sats/fiat cycle with USD value
- **FiatEuro** — fiat in EUR with European locale
- **NoToggle** — showToggle=false, static BTC display
- **Controlled** — external unit state with buttons
- **NoFiat** — no fiatValue, cycles btc ↔ sats only
- **DarkTheme** — dark background with custom colors
- **LargeBalance** — whale balance (21M BTC)
- **ZeroBalance** — empty wallet
- **InACard** — realistic wallet card context

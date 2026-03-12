# Changelog

## 1.0.0 (2026-03-04)

Initial release.

### Components

- **BTCAmount** — Formatted BTC display with color-coded digits and spring animation
- **BTCInput** — Controlled input with automatic digit grouping and cursor preservation
- **AddressDisplay** — Truncated Bitcoin address with copy-to-clipboard
- **TransactionAmount** — Signed, colored transaction amount (wraps BTCAmount)
- **ConfirmationBadge** — Three-state confirmation indicator (unconfirmed → confirming → confirmed)
- **BalanceDisplay** — Tappable balance that cycles BTC / sats / fiat units
- **SeedPhraseInput** — BIP39 seed phrase grid with autocomplete suggestions
- **BitcoinIcon** — SVG Bitcoin logo
- **SatsIcon** — SVG Satoshis icon

### Utilities

- **clampSats** — Clamp a value to valid satoshi range
- **MAX_SATS** — Maximum satoshis constant (21M BTC)

### Features

- Dual CJS/ESM build with TypeScript declarations
- Tree-shakeable secondary entry point (`bitcoin-ui-react/seed-phrase`)
- All labels and accessible descriptions customizable for i18n
- Inline styles only — no CSS files or runtime dependencies besides `motion`
- Full WAI-ARIA support including combobox pattern for SeedPhraseInput

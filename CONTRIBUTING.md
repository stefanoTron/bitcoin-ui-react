# Contributing to bitcoin-ui-react

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
git clone https://github.com/stefanoTron/bitcoin-ui-react.git
cd bitcoin-ui-react
npm ci          # requires Node >= 20
npm run storybook
```

## Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run storybook`    | Start Storybook dev server on port 6006 |
| `npm test`             | Run tests with coverage                 |
| `npm run typecheck`    | Type-check without emitting             |
| `npm run lint`         | Lint source files                       |
| `npm run format`       | Format all files with Prettier          |
| `npm run format:check` | Check formatting (runs in CI)           |
| `npm run build`        | Build CJS + ESM + DTS output            |
| `npm run size:check`   | Verify bundle stays under 50 kB         |

## Project Structure

```
src/
├── components/       # React components
│   ├── BTCAmount/
│   ├── BTCInput/
│   ├── AddressDisplay/
│   ├── TransactionAmount/
│   ├── ConfirmationBadge/
│   ├── BalanceDisplay/
│   ├── SeedPhraseInput/
│   ├── ErrorBoundary/
│   └── index.ts      # Barrel exports
├── icons/            # SVG icon components
├── utils/            # Shared utilities
├── data/             # BIP39 wordlist
└── index.ts          # Main entry point
```

## Conventions

- **No `import React`** — the project uses `jsx: react-jsx`
- **Named exports only** — no default exports
- **Types in separate files** — each component has a `.types.ts` file
- **Inline styles only** — no CSS files, use CSS custom properties for theming
- **No new dependencies** — only `motion` is allowed as a runtime dependency
- **All components** must accept `className`, `style`, and `ref` props
- **Barrel exports** — component/index.ts -> components/index.ts -> src/index.ts

## Adding a Component

1. Create a directory under `src/components/YourComponent/`
2. Add the following files:
   - `YourComponent.tsx` — implementation
   - `YourComponent.types.ts` — prop interface with JSDoc
   - `YourComponent.test.tsx` — tests (including jest-axe accessibility check)
   - `YourComponent.stories.tsx` — Storybook stories
   - `index.ts` — barrel export
3. Export from `src/components/index.ts` and `src/index.ts`
4. Add a changeset: `npx changeset`

## Testing

Tests use Jest + React Testing Library + jest-axe. Coverage thresholds are enforced:

- Statements: 95%
- Branches: 90%
- Functions: 95%
- Lines: 95%

Every component must include an accessibility test:

```tsx
test("has no accessibility violations", async () => {
  const { container } = render(<YourComponent />);
  expect(await axe(container)).toHaveNoViolations();
});
```

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all checks pass: `npm run typecheck && npm run lint && npm run format:check && npm test && npm run build && npm run size:check`
4. Add a changeset describing your changes: `npx changeset`
5. Open a PR against `main`

## Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning. When making a user-facing change:

```bash
npx changeset
```

Choose the appropriate semver bump:

- **patch** — bug fixes, documentation
- **minor** — new features, non-breaking additions
- **major** — breaking changes

## Code Style

- Prettier handles formatting (double quotes, trailing commas, 120 char width)
- ESLint enforces TypeScript and React Hooks rules
- Run `npm run format` before committing

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

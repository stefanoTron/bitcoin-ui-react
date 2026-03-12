# bitcoin-ui-react v1 Clean Room Rewrite — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite bitcoin-ui-lib as `bitcoin-ui-react` — a focused React component library for Bitcoin amount display/input with 4 components (BTCAmount, BTCInput, BitcoinIcon, SatsIcon), updated to latest dependencies, fully tested, with comprehensive Storybook docs.

**Architecture:** Each component lives in its own directory with types, tests, stories, and barrel export. Build with tsup (CJS + ESM + DTS). No CSS files — all inline styles. Animation via `motion` package (successor to framer-motion). Controlled component pattern for BTCInput.

**Tech Stack:** React 19, TypeScript 5.9, tsup 8.5, motion 12, Storybook 10 (Vite), Jest 29 + ts-jest, React Testing Library 16

---

### Task 1: Strip old files and configs

Remove everything that's being replaced. Start with a clean slate.

**Files to delete:**

- `src/components/Button/` (entire directory)
- `src/components/Input/` (entire directory)
- `src/components/BTCInput/BTCInput.module.css`
- `src/components/BTCAmount/BTCAmount.module.css`
- `src/typings.d.ts`
- `rollup.config.mjs`
- `.babelrc.json`
- `.storybook/` (entire directory — will be recreated)
- `dist/` (entire directory)

**Step 1: Delete the files**

```bash
rm -rf src/components/Button src/components/Input
rm -f src/components/BTCInput/BTCInput.module.css
rm -f src/components/BTCAmount/BTCAmount.module.css
rm -f src/typings.d.ts rollup.config.mjs .babelrc.json
rm -rf .storybook dist
```

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: strip old files before v1 rewrite

Remove Button/Input components, CSS modules, Rollup config, Babel config,
and Storybook config. All will be replaced in subsequent commits."
```

---

### Task 2: Rewrite package.json and install dependencies

**Step 1: Rewrite package.json**

Replace the entire `package.json` with:

```json
{
  "name": "bitcoin-ui-react",
  "version": "1.0.0",
  "description": "React components for Bitcoin amount display and input",
  "author": "Stefano Tron",
  "license": "MIT",
  "keywords": ["bitcoin", "ui", "react", "sats", "btc", "components"],
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup",
    "test": "jest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "dependencies": {
    "motion": "^12.0.0"
  },
  "devDependencies": {
    "@storybook/addon-docs": "^10.0.0",
    "@storybook/react": "^10.0.0",
    "@storybook/react-vite": "^10.0.0",
    "@testing-library/jest-dom": "^6.9.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.0",
    "@types/jest": "^29.5.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "storybook": "^10.0.0",
    "ts-jest": "^29.4.0",
    "tsup": "^8.5.0",
    "typescript": "^5.9.0"
  }
}
```

**Step 2: Delete node_modules and lockfile, reinstall**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: Clean install with no errors. If there are peer dep warnings, that's OK.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: rewrite package.json with updated deps

Rename to bitcoin-ui-react. Switch to tsup, motion, Storybook 10,
Jest 29 + ts-jest, React 19, TypeScript 5.9."
```

---

### Task 3: Configure tsup, TypeScript, and Jest

**Step 1: Create `tsup.config.ts`**

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});
```

**Step 2: Rewrite `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules", "**/*.test.tsx", "**/*.stories.tsx"]
}
```

Key changes from old config:

- `jsx: "react-jsx"` (modern JSX transform — no `import React` needed)
- `moduleResolution: "bundler"` (modern resolution)
- `target: "ES2020"` (modern baseline)

**Step 3: Rewrite `jest.config.js` → `jest.config.ts`**

Delete the old `jest.config.js` and create `jest.config.ts`:

```ts
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

export default config;
```

**Step 4: Verify build works**

Create a minimal `src/index.ts` placeholder:

```ts
// Components
export {};
```

Run:

```bash
npx tsup
```

Expected: Build succeeds, creates `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`.

**Step 5: Verify Jest works**

Create a minimal test file `src/__smoke__.test.ts`:

```ts
test("smoke test", () => {
  expect(1 + 1).toBe(2);
});
```

Run:

```bash
npx jest
```

Expected: 1 test passes. Then delete `src/__smoke__.test.ts`.

**Step 6: Commit**

```bash
git add tsup.config.ts tsconfig.json jest.config.ts src/index.ts
git rm jest.config.js
git commit -m "chore: configure tsup, TypeScript 5.9, and Jest with ts-jest"
```

---

### Task 4: Configure Storybook 10

**Step 1: Create `.storybook/main.ts`**

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/react-vite",
};

export default config;
```

**Step 2: Create `.storybook/preview.ts`**

```ts
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
};

export default preview;
```

**Step 3: Verify Storybook starts**

```bash
npx storybook dev -p 6006
```

Expected: Storybook starts (may show "no stories found" — that's fine). Stop with Ctrl+C.

**Step 4: Commit**

```bash
git add .storybook/
git commit -m "chore: configure Storybook 10 with Vite"
```

---

### Task 5: Rewrite BitcoinIcon (TDD)

**Files:**

- Rewrite: `src/icons/BitcoinIcon/BitcoinIcon.types.ts`
- Rewrite: `src/icons/BitcoinIcon/BitcoinIcon.tsx`
- Rewrite: `src/icons/BitcoinIcon/BitcoinIcon.test.tsx`
- Create: `src/icons/BitcoinIcon/index.ts`

**Step 1: Write the types**

`src/icons/BitcoinIcon/BitcoinIcon.types.ts`:

```ts
export interface BitcoinIconProps {
  /** Icon size in pixels. Default: 16 */
  size?: number;
  /** Symbol color. Default: '#ffffff' */
  color?: string;
  /** Background circle color. Default: '#f7931a' */
  backgroundColor?: string;
  /** Accessibility label. Default: 'Bitcoin' */
  alt?: string;
}
```

**Step 2: Write the failing tests**

`src/icons/BitcoinIcon/BitcoinIcon.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BitcoinIcon } from "./BitcoinIcon";

describe("BitcoinIcon", () => {
  test("renders an SVG with default title", () => {
    render(<BitcoinIcon />);
    expect(screen.getByTitle("Bitcoin")).toBeInTheDocument();
  });

  test("renders at default size 16", () => {
    render(<BitcoinIcon />);
    const svg = screen.getByTitle("Bitcoin").closest("svg")!;
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
  });

  test("applies custom size", () => {
    render(<BitcoinIcon size={64} />);
    const svg = screen.getByTitle("Bitcoin").closest("svg")!;
    expect(svg).toHaveAttribute("width", "64");
    expect(svg).toHaveAttribute("height", "64");
  });

  test("applies custom alt text", () => {
    render(<BitcoinIcon alt="BTC" />);
    expect(screen.getByTitle("BTC")).toBeInTheDocument();
  });

  test("has role=img for accessibility", () => {
    render(<BitcoinIcon />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
```

**Step 3: Run tests to verify they fail**

```bash
npx jest src/icons/BitcoinIcon
```

Expected: FAIL — module not found or component not exported.

**Step 4: Write the implementation**

`src/icons/BitcoinIcon/BitcoinIcon.tsx`:

```tsx
import { BitcoinIconProps } from "./BitcoinIcon.types";

export function BitcoinIcon({
  alt = "Bitcoin",
  backgroundColor = "#f7931a",
  color = "#ffffff",
  size = 16,
}: BitcoinIconProps) {
  return (
    <svg height={size} role="img" viewBox="0 0 512 512" width={size} xmlns="http://www.w3.org/2000/svg">
      <title>{alt}</title>
      <path
        fill={backgroundColor}
        d="M504.342 317.927C470.147 455.071 331.226 538.534 194.05 504.335 56.93 470.145-26.542 331.23 7.667 194.099 41.847 56.939 180.767-26.53 317.902 7.66 455.068 41.851 538.536 180.78 504.338 317.93l.002-.003z"
      />
      <path
        fill={color}
        d="M368.898 219.526c5.096-34.068-20.844-52.38-56.315-64.597l11.507-46.148-28.095-7-11.202 44.933c-7.386-1.842-14.97-3.577-22.51-5.298l11.284-45.23-28.078-6.999-11.513 46.133c-6.112-1.391-12.116-2.767-17.94-4.216l.033-.145-38.744-9.674-7.474 30.004s20.845 4.778 20.405 5.072c11.377 2.839 13.435 10.37 13.093 16.338l-13.108 52.573c.784.2 1.8.487 2.921.937-.937-.232-1.934-.486-2.97-.734l-18.372 73.648c-1.39 3.456-4.92 8.642-12.874 6.673.282.408-20.42-5.095-20.42-5.095l-13.948 32.155 36.56 9.114c6.803 1.705 13.468 3.49 20.032 5.168l-11.626 46.677 28.062 7 11.513-46.182c7.667 2.08 15.107 4 22.39 5.81l-11.474 45.964 28.096 7 11.625-46.59c47.908 9.065 83.93 5.41 99.093-37.917 12.218-34.884-.608-55.005-25.812-68.126 18.357-4.233 32.185-16.306 35.871-41.244l-.008-.006zm-64.19 90.001c-8.683 34.884-67.423 16.027-86.468 11.298l15.428-61.839c19.043 4.754 80.114 14.16 71.041 50.541zm8.689-90.506c-7.92 31.73-56.811 15.61-72.67 11.657l13.987-56.085c15.86 3.953 66.933 11.33 58.685 44.428h-.002z"
      />
    </svg>
  );
}
```

`src/icons/BitcoinIcon/index.ts`:

```ts
export { BitcoinIcon } from "./BitcoinIcon";
export type { BitcoinIconProps } from "./BitcoinIcon.types";
```

**Step 5: Run tests to verify they pass**

```bash
npx jest src/icons/BitcoinIcon
```

Expected: 5 tests pass.

**Step 6: Commit**

```bash
git add src/icons/BitcoinIcon/
git commit -m "feat: rewrite BitcoinIcon with tests"
```

---

### Task 6: Rewrite SatsIcon (TDD)

**Files:**

- Rewrite: `src/icons/SatsIcon/SatsIcon.types.ts`
- Rewrite: `src/icons/SatsIcon/SatsIcon.tsx`
- Rewrite: `src/icons/SatsIcon/SatsIcon.test.tsx`
- Create: `src/icons/SatsIcon/index.ts`

**Step 1: Write the types**

`src/icons/SatsIcon/SatsIcon.types.ts`:

```ts
export interface SatsIconProps {
  /** Icon size in pixels. Default: 16 */
  size?: number;
  /** Symbol color. Default: '#000000' */
  color?: string;
  /** Background circle color. Default: 'transparent' */
  backgroundColor?: string;
  /** Accessibility label. Default: 'Satoshis' */
  alt?: string;
  /** Apply a tilt rotation to the icon. Default: false */
  tilted?: boolean;
}
```

**Step 2: Write the failing tests**

`src/icons/SatsIcon/SatsIcon.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SatsIcon } from "./SatsIcon";

describe("SatsIcon", () => {
  test("renders an SVG with default title", () => {
    render(<SatsIcon />);
    expect(screen.getByTitle("Satoshis")).toBeInTheDocument();
  });

  test("renders at default size 16", () => {
    render(<SatsIcon />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
  });

  test("applies custom size", () => {
    render(<SatsIcon size={128} />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).toHaveAttribute("width", "128");
    expect(svg).toHaveAttribute("height", "128");
  });

  test("applies rotation when not tilted (default)", () => {
    render(<SatsIcon />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).toHaveAttribute("transform");
  });

  test("does not apply rotation when tilted", () => {
    render(<SatsIcon tilted />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).not.toHaveAttribute("transform");
  });

  test("has role=img for accessibility", () => {
    render(<SatsIcon />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
```

**Step 3: Run tests to verify they fail**

```bash
npx jest src/icons/SatsIcon
```

Expected: FAIL.

**Step 4: Write the implementation**

`src/icons/SatsIcon/SatsIcon.tsx`:

```tsx
import { SatsIconProps } from "./SatsIcon.types";

export function SatsIcon({
  alt = "Satoshis",
  backgroundColor = "transparent",
  color = "#000000",
  size = 16,
  tilted = false,
}: SatsIconProps) {
  return (
    <svg
      height={size}
      role="img"
      viewBox="1 1 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...(!tilted ? { transform: "rotate(-14 0 0)" } : {})}
    >
      <title>{alt}</title>
      <circle cx={257} cy={257} r={256} fill={backgroundColor} />
      <path
        fill={color}
        d="m295.637 49.385 32.47 8.62-14.733 55.485-32.469-8.621zM200.577 407.402l32.469 8.621-14.732 55.485-32.47-8.621zM399.965 188.586l-8.622 32.468-231.517-61.471 8.622-32.47zM377.199 274.327l-8.622 32.47-231.517-61.473 8.621-32.469zM355.09 357.659l-8.622 32.469-231.517-61.472 8.621-32.47z"
      />
    </svg>
  );
}
```

`src/icons/SatsIcon/index.ts`:

```ts
export { SatsIcon } from "./SatsIcon";
export type { SatsIconProps } from "./SatsIcon.types";
```

**Step 5: Run tests to verify they pass**

```bash
npx jest src/icons/SatsIcon
```

Expected: 6 tests pass.

**Step 6: Commit**

```bash
git add src/icons/SatsIcon/
git commit -m "feat: rewrite SatsIcon with tests"
```

---

### Task 7: Rewrite BTCAmount (TDD)

This is the most complex component. It formats a satoshi amount as `X.XX XXX XXX` with per-digit color coding and animated transitions.

**Files:**

- Rewrite: `src/components/BTCAmount/BTCAmount.types.ts`
- Rewrite: `src/components/BTCAmount/BTCAmount.tsx`
- Rewrite: `src/components/BTCAmount/BTCAmount.test.tsx`
- Create: `src/components/BTCAmount/index.ts`

**Step 1: Write the types**

`src/components/BTCAmount/BTCAmount.types.ts`:

```ts
export interface BTCAmountProps {
  /** Amount in satoshis (integer). */
  amount: number;
  /** Color for significant (non-zero leading) digits. Default: 'currentColor' */
  activeColor?: string;
  /** Color for insignificant (zero-padded) digits. Default: '#999999' */
  inactiveColor?: string;
  /** Separator between 3-digit satoshi groups. Default: ' ' (thin space U+2009) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** Font family override. Default: 'inherit' */
  fontFamily?: string;
  /** Whether to animate value changes. Default: true */
  animate?: boolean;
}
```

**Step 2: Write the failing tests**

`src/components/BTCAmount/BTCAmount.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BTCAmount } from "./BTCAmount";

// Mock motion to avoid animation complexity in tests
jest.mock("motion/react", () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("BTCAmount", () => {
  test("renders 0 satoshis as 0.00 000 000", () => {
    render(<BTCAmount amount={0} />);
    const container = screen.getByTestId("btc-amount");
    const text = container.textContent;
    // Should contain digits 0.00000000 with separators
    expect(text).toMatch(/0[.]00.000.000/);
  });

  test("renders 1 satoshi as 0.00 000 001", () => {
    render(<BTCAmount amount={1} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.000.001/);
  });

  test("renders 1000 satoshis as 0.00 001 000", () => {
    render(<BTCAmount amount={1000} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.001.000/);
  });

  test("renders 100,000,000 satoshis (1 BTC) as 1.00 000 000", () => {
    render(<BTCAmount amount={100_000_000} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/1[.]00.000.000/);
  });

  test("renders 2,100,000,000,000,000 satoshis (21M BTC) correctly", () => {
    render(<BTCAmount amount={2_100_000_000_000_000} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/21000000[.]00.000.000/);
  });

  test("renders 12,537,829 satoshis correctly", () => {
    render(<BTCAmount amount={12_537_829} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]12.537.829/);
  });

  test("applies active color to significant digits", () => {
    render(<BTCAmount amount={1000} activeColor="red" inactiveColor="gray" />);
    const container = screen.getByTestId("btc-amount");
    const spans = container.querySelectorAll("span[data-digit]");
    // The digit "1" at position 3 (from right) should be active
    const activeSpans = Array.from(spans).filter((s) => (s as HTMLElement).style.color === "red");
    expect(activeSpans.length).toBeGreaterThan(0);
  });

  test("treats NaN as 0", () => {
    render(<BTCAmount amount={NaN} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.000.000/);
  });

  test("treats negative values as 0", () => {
    render(<BTCAmount amount={-100} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.000.000/);
  });

  test("applies custom btcSeparator", () => {
    render(<BTCAmount amount={100_000_000} btcSeparator="," />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toContain(",");
  });

  test("applies fontFamily style", () => {
    render(<BTCAmount amount={0} fontFamily="monospace" />);
    const container = screen.getByTestId("btc-amount");
    expect(container).toHaveStyle({ fontFamily: "monospace" });
  });
});
```

**Step 3: Run tests to verify they fail**

```bash
npx jest src/components/BTCAmount
```

Expected: FAIL.

**Step 4: Write the implementation**

`src/components/BTCAmount/BTCAmount.tsx`:

```tsx
import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BTCAmountProps } from "./BTCAmount.types";

/**
 * Format a satoshi amount into an array of digits, separators, and their colors.
 * Always produces format: X.XX XXX XXX (minimum 9 digits + separators).
 */
function formatDigits(
  amount: number,
  activeColor: string,
  inactiveColor: string,
  btcSeparator: string,
  satsSeparator: string,
) {
  // Clamp to valid range
  const clamped = Math.max(0, Math.trunc(isNaN(amount) ? 0 : amount));
  const digits = clamped.toString().split("");

  // Pad to minimum 9 digits
  while (digits.length < 9) {
    digits.unshift("0");
  }

  // Find the first non-zero digit to determine active range
  const firstNonZero = digits.findIndex((d) => d !== "0");

  const result: { char: string; color: string; key: string; isDigit: boolean }[] = [];

  for (let i = 0; i < digits.length; i++) {
    const posFromRight = digits.length - 1 - i;
    const isActive = firstNonZero !== -1 && i >= firstNonZero;
    const color = isActive ? activeColor : inactiveColor;

    result.push({
      char: digits[i],
      color,
      key: `d-${posFromRight}`,
      isDigit: true,
    });

    // Insert BTC separator after the "ones" BTC digit (8 positions from right)
    if (posFromRight === 8) {
      const sepColor = isActive ? activeColor : inactiveColor;
      result.push({
        char: btcSeparator,
        color: sepColor,
        key: "btc-sep",
        isDigit: false,
      });
    }

    // Insert sats separator at positions 6 and 3 from right
    if (posFromRight === 6 || posFromRight === 3) {
      result.push({
        char: satsSeparator,
        color: "inherit",
        key: `sats-sep-${posFromRight}`,
        isDigit: false,
      });
    }
  }

  return result;
}

export function BTCAmount({
  amount,
  activeColor = "currentColor",
  inactiveColor = "#999999",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  fontFamily = "inherit",
  animate: shouldAnimate = true,
}: BTCAmountProps) {
  const formatted = useMemo(
    () => formatDigits(amount, activeColor, inactiveColor, btcSeparator, satsSeparator),
    [amount, activeColor, inactiveColor, btcSeparator, satsSeparator],
  );

  return (
    <span data-testid="btc-amount" style={{ fontFamily, display: "inline-flex", alignItems: "baseline" }}>
      {formatted.map((item) =>
        item.isDigit && shouldAnimate ? (
          <AnimatePresence mode="popLayout" key={item.key}>
            <motion.span
              key={`${item.key}-${item.char}`}
              data-digit={item.char}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-block", color: item.color }}
            >
              {item.char}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span key={item.key} data-digit={item.isDigit ? item.char : undefined} style={{ color: item.color }}>
            {item.char}
          </span>
        ),
      )}
    </span>
  );
}
```

`src/components/BTCAmount/index.ts`:

```ts
export { BTCAmount } from "./BTCAmount";
export type { BTCAmountProps } from "./BTCAmount.types";
```

**Step 5: Run tests to verify they pass**

```bash
npx jest src/components/BTCAmount
```

Expected: All 10+ tests pass.

**Step 6: Commit**

```bash
git add src/components/BTCAmount/
git commit -m "feat: rewrite BTCAmount with animated digit display and tests"
```

---

### Task 8: Rewrite BTCInput (TDD)

Controlled input component. User types digits, the component formats and displays as BTC.

**Files:**

- Rewrite: `src/components/BTCInput/BTCInput.types.ts`
- Rewrite: `src/components/BTCInput/BTCInput.tsx`
- Rewrite: `src/components/BTCInput/BTCInput.test.tsx`
- Create: `src/components/BTCInput/index.ts`

**Step 1: Write the types**

`src/components/BTCInput/BTCInput.types.ts`:

```ts
export interface BTCInputProps {
  /** Current amount in satoshis (integer). */
  amount: number;
  /** Callback fired when the amount changes. Receives satoshis as integer. */
  onAmountChange: (satoshis: number) => void;
  /** Color for significant digits. Default: 'currentColor' */
  activeColor?: string;
  /** Color for insignificant digits. Default: '#999999' */
  inactiveColor?: string;
  /** Separator between 3-digit satoshi groups. Default: ' ' (thin space U+2009) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** Whether the input is disabled. Default: false */
  disabled?: boolean;
  /** Placeholder text. Default: '0.00 000 000' */
  placeholder?: string;
}
```

**Step 2: Write the failing tests**

`src/components/BTCInput/BTCInput.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BTCInput } from "./BTCInput";

// Mock motion
jest.mock("motion/react", () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("BTCInput", () => {
  const defaultProps = {
    amount: 0,
    onAmountChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders an input element", () => {
    render(<BTCInput {...defaultProps} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("displays formatted amount", () => {
    render(<BTCInput {...defaultProps} amount={1000} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // Input value should contain the formatted number
    expect(input.value).toBeTruthy();
  });

  test("calls onAmountChange when user types digits", async () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "1000");
    expect(onAmountChange).toHaveBeenCalled();
  });

  test("strips non-numeric characters from input", async () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={0} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "abc123");
    // Should only have received numeric values
    const lastCall = onAmountChange.mock.calls[onAmountChange.mock.calls.length - 1];
    if (lastCall) {
      expect(typeof lastCall[0]).toBe("number");
      expect(lastCall[0]).toBeGreaterThanOrEqual(0);
    }
  });

  test("disables input when disabled prop is true", () => {
    render(<BTCInput {...defaultProps} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("clamps amount to max supply (2.1 quadrillion sats)", () => {
    const onAmountChange = jest.fn();
    render(<BTCInput amount={2_100_000_000_000_001} onAmountChange={onAmountChange} />);
    // Component should render without error, clamped to max
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders placeholder when amount is 0", () => {
    render(<BTCInput {...defaultProps} placeholder="Enter amount" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toHaveAttribute("placeholder", "Enter amount");
  });
});
```

**Step 3: Run tests to verify they fail**

```bash
npx jest src/components/BTCInput
```

Expected: FAIL.

**Step 4: Write the implementation**

`src/components/BTCInput/BTCInput.tsx`:

```tsx
import { useCallback, useMemo } from "react";
import { BTCInputProps } from "./BTCInput.types";

const MAX_SATS = 2_100_000_000_000_000; // 21 million BTC in satoshis

/**
 * Format satoshis into a display string: X.XX XXX XXX
 */
function formatSats(sats: number, btcSep: string, satsSep: string): string {
  const clamped = Math.max(0, Math.min(MAX_SATS, Math.trunc(isNaN(sats) ? 0 : sats)));
  const str = clamped.toString().padStart(9, "0");

  // Split into BTC part and 8-digit decimal part
  const btcPart = str.slice(0, str.length - 8) || "0";
  const decPart = str.slice(str.length - 8);

  // Group decimal part as XX XXX XXX
  const group1 = decPart.slice(0, 2);
  const group2 = decPart.slice(2, 5);
  const group3 = decPart.slice(5, 8);

  return `${btcPart}${btcSep}${group1}${satsSep}${group2}${satsSep}${group3}`;
}

/**
 * Parse a formatted display string back to satoshis.
 */
function parseSats(display: string): number {
  const digitsOnly = display.replace(/\D/g, "");
  const parsed = parseInt(digitsOnly, 10);
  if (isNaN(parsed)) return 0;
  return Math.min(parsed, MAX_SATS);
}

export function BTCInput({
  amount,
  onAmountChange,
  activeColor = "currentColor",
  inactiveColor = "#999999",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  disabled = false,
  placeholder = "0.00\u2009000\u2009000",
}: BTCInputProps) {
  const displayValue = useMemo(
    () => (amount === 0 ? "" : formatSats(amount, btcSeparator, satsSeparator)),
    [amount, btcSeparator, satsSeparator],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const newSats = parseSats(raw);
      onAmountChange(newSats);
    },
    [onAmountChange],
  );

  const clampedAmount = Math.max(0, Math.min(MAX_SATS, Math.trunc(isNaN(amount) ? 0 : amount)));

  return (
    <input
      type="text"
      inputMode="numeric"
      role="textbox"
      value={displayValue}
      onChange={handleChange}
      disabled={disabled}
      placeholder={placeholder}
      style={{
        fontFamily: "inherit",
        fontSize: "inherit",
        color: clampedAmount > 0 ? activeColor : inactiveColor,
        caretColor: activeColor,
        border: "none",
        background: "transparent",
        padding: 0,
      }}
    />
  );
}
```

`src/components/BTCInput/index.ts`:

```ts
export { BTCInput } from "./BTCInput";
export type { BTCInputProps } from "./BTCInput.types";
```

**Step 5: Run tests to verify they pass**

```bash
npx jest src/components/BTCInput
```

Expected: All 7 tests pass.

**Step 6: Commit**

```bash
git add src/components/BTCInput/
git commit -m "feat: rewrite BTCInput as controlled input with formatting and tests"
```

---

### Task 9: Wire up barrel exports

**Files:**

- Rewrite: `src/components/index.ts`
- Rewrite: `src/icons/index.ts`
- Rewrite: `src/index.ts`

**Step 1: Update barrel exports**

`src/components/index.ts`:

```ts
export { BTCAmount } from "./BTCAmount";
export type { BTCAmountProps } from "./BTCAmount";
export { BTCInput } from "./BTCInput";
export type { BTCInputProps } from "./BTCInput";
```

`src/icons/index.ts`:

```ts
export { BitcoinIcon } from "./BitcoinIcon";
export type { BitcoinIconProps } from "./BitcoinIcon";
export { SatsIcon } from "./SatsIcon";
export type { SatsIconProps } from "./SatsIcon";
```

`src/index.ts`:

```ts
export { BTCAmount, BTCInput } from "./components";
export type { BTCAmountProps, BTCInputProps } from "./components";
export { BitcoinIcon, SatsIcon } from "./icons";
export type { BitcoinIconProps, SatsIconProps } from "./icons";
```

**Step 2: Verify build works**

```bash
npx tsup
```

Expected: Build succeeds. Check that `dist/index.d.ts` exports all 4 components and their types.

**Step 3: Run all tests**

```bash
npx jest
```

Expected: All tests pass (BitcoinIcon, SatsIcon, BTCAmount, BTCInput).

**Step 4: Commit**

```bash
git add src/index.ts src/components/index.ts src/icons/index.ts
git commit -m "feat: wire up barrel exports for all components"
```

---

### Task 10: Write comprehensive Storybook stories

**Files:**

- Rewrite: `src/icons/BitcoinIcon/BitcoinIcon.stories.tsx`
- Rewrite: `src/icons/SatsIcon/SatsIcon.stories.tsx`
- Rewrite: `src/components/BTCAmount/BTCAmount.stories.tsx`
- Rewrite: `src/components/BTCInput/BTCInput.stories.tsx`

**Step 1: BitcoinIcon stories**

`src/icons/BitcoinIcon/BitcoinIcon.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BitcoinIcon } from "./BitcoinIcon";

const meta: Meta<typeof BitcoinIcon> = {
  title: "Icons/BitcoinIcon",
  component: BitcoinIcon,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number", min: 8, max: 512, step: 8 } },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    alt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof BitcoinIcon>;

export const Default: Story = {
  args: { size: 32 },
};

export const Small: Story = {
  args: { size: 16 },
};

export const Large: Story = {
  args: { size: 128 },
};

export const ExtraLarge: Story = {
  args: { size: 256 },
};

export const CustomColors: Story = {
  args: {
    size: 128,
    backgroundColor: "#4a0e8f",
    color: "#ffd700",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <BitcoinIcon size={16} />
      <BitcoinIcon size={32} />
      <BitcoinIcon size={64} />
      <BitcoinIcon size={128} />
    </div>
  ),
};
```

**Step 2: SatsIcon stories**

`src/icons/SatsIcon/SatsIcon.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SatsIcon } from "./SatsIcon";

const meta: Meta<typeof SatsIcon> = {
  title: "Icons/SatsIcon",
  component: SatsIcon,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number", min: 8, max: 512, step: 8 } },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    alt: { control: "text" },
    tilted: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SatsIcon>;

export const Default: Story = {
  args: { size: 32 },
};

export const Tilted: Story = {
  args: { size: 64, tilted: true },
};

export const WithBackground: Story = {
  args: {
    size: 128,
    backgroundColor: "#f7931a",
    color: "#ffffff",
  },
};

export const TiltComparison: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ textAlign: "center" }}>
        <SatsIcon size={64} />
        <p>Default (rotated)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <SatsIcon size={64} tilted />
        <p>Tilted (original angle)</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <SatsIcon size={16} />
      <SatsIcon size={32} />
      <SatsIcon size={64} />
      <SatsIcon size={128} />
    </div>
  ),
};
```

**Step 3: BTCAmount stories**

`src/components/BTCAmount/BTCAmount.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BTCAmount } from "./BTCAmount";

const meta: Meta<typeof BTCAmount> = {
  title: "Components/BTCAmount",
  component: BTCAmount,
  tags: ["autodocs"],
  argTypes: {
    amount: { control: { type: "number", min: 0, max: 2_100_000_000_000_000 } },
    activeColor: { control: "color" },
    inactiveColor: { control: "color" },
    satsSeparator: { control: "text" },
    btcSeparator: { control: "text" },
    fontFamily: { control: "text" },
    animate: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ fontSize: 32, fontFamily: "monospace" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BTCAmount>;

export const Zero: Story = {
  args: { amount: 0 },
};

export const OneSatoshi: Story = {
  args: { amount: 1 },
};

export const OneThousandSats: Story = {
  args: { amount: 1_000 },
};

export const TenThousandSats: Story = {
  args: { amount: 10_000 },
};

export const OneBTC: Story = {
  args: { amount: 100_000_000 },
};

export const TwentyOneBTC: Story = {
  args: { amount: 2_100_000_000 },
};

export const MaxSupply: Story = {
  args: { amount: 2_100_000_000_000_000 },
};

export const CustomColors: Story = {
  args: {
    amount: 12_537_829,
    activeColor: "#f7931a",
    inactiveColor: "#e0e0e0",
  },
};

export const NoAnimation: Story = {
  args: {
    amount: 50_000,
    animate: false,
  },
};

export const CustomSeparators: Story = {
  args: {
    amount: 100_000_000,
    btcSeparator: ",",
    satsSeparator: ".",
  },
};

export const CustomFont: Story = {
  args: {
    amount: 42_000_000,
    fontFamily: "SF Mono, Menlo, monospace",
  },
};
```

**Step 4: BTCInput stories**

`src/components/BTCInput/BTCInput.stories.tsx`:

```tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BTCInput } from "./BTCInput";
import { BTCAmount } from "../BTCAmount/BTCAmount";

const meta: Meta<typeof BTCInput> = {
  title: "Components/BTCInput",
  component: BTCInput,
  tags: ["autodocs"],
  argTypes: {
    amount: { control: { type: "number", min: 0, max: 2_100_000_000_000_000 } },
    activeColor: { control: "color" },
    inactiveColor: { control: "color" },
    satsSeparator: { control: "text" },
    btcSeparator: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof BTCInput>;

/** Interactive story with live state management */
export const Interactive: Story = {
  render: () => {
    const [amount, setAmount] = useState(0);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24 }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>Raw satoshis: {amount.toLocaleString()}</p>
      </div>
    );
  },
};

/** Shows the input synced with a BTCAmount display */
export const WithDisplay: Story = {
  render: () => {
    const [amount, setAmount] = useState(50_000);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 14, color: "#666", display: "block", marginBottom: 4 }}>Input:</label>
          <BTCInput amount={amount} onAmountChange={setAmount} />
        </div>
        <div>
          <label style={{ fontSize: 14, color: "#666", display: "block", marginBottom: 4 }}>Display:</label>
          <BTCAmount amount={amount} />
        </div>
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>{amount.toLocaleString()} satoshis</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    amount: 100_000,
    onAmountChange: () => {},
    disabled: true,
  },
};

export const CustomColors: Story = {
  render: () => {
    const [amount, setAmount] = useState(1_234_567);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24, background: "#1a1a2e", padding: 24 }}>
        <BTCInput amount={amount} onAmountChange={setAmount} activeColor="#f7931a" inactiveColor="#444" />
      </div>
    );
  },
};

export const PrefilledOneBTC: Story = {
  render: () => {
    const [amount, setAmount] = useState(100_000_000);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24 }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
      </div>
    );
  },
};
```

**Step 5: Verify Storybook loads all stories**

```bash
npx storybook dev -p 6006
```

Expected: Storybook launches showing Icons/BitcoinIcon, Icons/SatsIcon, Components/BTCAmount, Components/BTCInput in the sidebar, each with autodocs and all story variants. Stop with Ctrl+C.

**Step 6: Commit**

```bash
git add src/icons/BitcoinIcon/BitcoinIcon.stories.tsx \
        src/icons/SatsIcon/SatsIcon.stories.tsx \
        src/components/BTCAmount/BTCAmount.stories.tsx \
        src/components/BTCInput/BTCInput.stories.tsx
git commit -m "feat: add comprehensive Storybook stories with autodocs for all components"
```

---

### Task 11: Write README

**File:** `readme.md` (overwrite existing)

**Step 1: Write the README**

`readme.md`:

````markdown
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

<BTCAmount amount={12537829} />;
// Renders: 0.12 537 829
```

| Prop            | Type      | Default            | Description                      |
| --------------- | --------- | ------------------ | -------------------------------- |
| `amount`        | `number`  | required           | Amount in satoshis               |
| `activeColor`   | `string`  | `'currentColor'`   | Color for significant digits     |
| `inactiveColor` | `string`  | `'#999999'`        | Color for zero-padded digits     |
| `satsSeparator` | `string`  | `' '` (thin space) | Separator between 3-digit groups |
| `btcSeparator`  | `string`  | `'.'`              | Decimal separator                |
| `fontFamily`    | `string`  | `'inherit'`        | Font family override             |
| `animate`       | `boolean` | `true`             | Animate digit changes            |

### BTCInput

Controlled input for entering Bitcoin amounts. Formats as user types.

```tsx
import { BTCInput } from "bitcoin-ui-react";

const [sats, setSats] = useState(0);
<BTCInput amount={sats} onAmountChange={setSats} />;
```

| Prop             | Type                     | Default            | Description                      |
| ---------------- | ------------------------ | ------------------ | -------------------------------- |
| `amount`         | `number`                 | required           | Amount in satoshis               |
| `onAmountChange` | `(sats: number) => void` | required           | Callback when amount changes     |
| `activeColor`    | `string`                 | `'currentColor'`   | Color for significant digits     |
| `inactiveColor`  | `string`                 | `'#999999'`        | Color for zero-padded digits     |
| `satsSeparator`  | `string`                 | `' '` (thin space) | Separator between 3-digit groups |
| `btcSeparator`   | `string`                 | `'.'`              | Decimal separator                |
| `disabled`       | `boolean`                | `false`            | Disable the input                |
| `placeholder`    | `string`                 | `'0.00 000 000'`   | Placeholder text                 |

### BitcoinIcon

SVG Bitcoin logo icon.

```tsx
import { BitcoinIcon } from "bitcoin-ui-react";

<BitcoinIcon size={32} />;
```

| Prop              | Type     | Default     | Description         |
| ----------------- | -------- | ----------- | ------------------- |
| `size`            | `number` | `16`        | Icon size in pixels |
| `color`           | `string` | `'#ffffff'` | Symbol color        |
| `backgroundColor` | `string` | `'#f7931a'` | Background color    |
| `alt`             | `string` | `'Bitcoin'` | Accessibility label |

### SatsIcon

SVG Satoshis icon.

```tsx
import { SatsIcon } from "bitcoin-ui-react";

<SatsIcon size={32} tilted />;
```

| Prop              | Type      | Default         | Description         |
| ----------------- | --------- | --------------- | ------------------- |
| `size`            | `number`  | `16`            | Icon size in pixels |
| `color`           | `string`  | `'#000000'`     | Symbol color        |
| `backgroundColor` | `string`  | `'transparent'` | Background color    |
| `alt`             | `string`  | `'Satoshis'`    | Accessibility label |
| `tilted`          | `boolean` | `false`         | Apply tilt rotation |

## License

MIT
````

**Step 2: Commit**

```bash
git add readme.md
git commit -m "docs: rewrite README with correct package name and all component docs"
```

---

### Task 12: Final build verification and cleanup

**Step 1: Run all tests**

```bash
npx jest --verbose
```

Expected: All tests pass across all 4 components.

**Step 2: Run build**

```bash
npx tsup
```

Expected: Build succeeds. Verify output files exist:

- `dist/index.js` (CJS)
- `dist/index.mjs` (ESM)
- `dist/index.d.ts` (types)

**Step 3: Verify type exports**

```bash
cat dist/index.d.ts
```

Expected: Should export BTCAmount, BTCAmountProps, BTCInput, BTCInputProps, BitcoinIcon, BitcoinIconProps, SatsIcon, SatsIconProps.

**Step 4: Update .gitignore**

Add `dist/` to `.gitignore` if not already there (built output shouldn't be committed):

```
node_modules
.vscode
dist
```

**Step 5: Final commit**

```bash
git add .gitignore
git commit -m "chore: finalize v1 build and verify all components"
```

**Step 6: Tag the release**

```bash
git tag v1.0.0
```

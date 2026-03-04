# BalanceDisplay Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a large-format balance component that cycles through BTC, sats, and fiat display with crossfade animation.

**Architecture:** Wraps BTCAmount for BTC mode. Uses Intl.NumberFormat for sats and fiat modes. Crossfade via motion/react AnimatePresence. Supports both uncontrolled (internal state) and controlled (unit prop) toggle.

**Tech Stack:** React 19, TypeScript 5.9, motion/react v12, Jest + RTL, Storybook 10

---

### Task 1: Create types file and barrel export

**Files:**
- Create: `src/components/BalanceDisplay/BalanceDisplay.types.ts`
- Create: `src/components/BalanceDisplay/index.ts`

**Step 1: Create the types file**

```typescript
export interface BalanceDisplayProps {
  /** Balance in satoshis. */
  amount: number;
  /** Fiat value of the balance. If omitted, fiat unit is excluded from toggle. */
  fiatValue?: number;
  /** ISO 4217 currency code for fiat display. Default: "USD". */
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
  /** Custom class name for the root element. */
  className?: string;
  /** Custom inline styles for the root element. */
  style?: React.CSSProperties;
}
```

**Step 2: Create the barrel export**

```typescript
export { BalanceDisplay } from "./BalanceDisplay";
export type { BalanceDisplayProps } from "./BalanceDisplay.types";
```

**Step 3: Commit**

```
git add src/components/BalanceDisplay/BalanceDisplay.types.ts src/components/BalanceDisplay/index.ts
git commit -m "feat: add BalanceDisplay types and barrel export"
```

---

### Task 2: TDD — Basic BTC rendering

**Files:**
- Create: `src/components/BalanceDisplay/BalanceDisplay.test.tsx`
- Create: `src/components/BalanceDisplay/BalanceDisplay.tsx`

**Step 1: Write the failing tests**

```typescript
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BalanceDisplay } from "./BalanceDisplay";

// Mock motion/react — AnimatePresence as passthrough, motion.div as plain div
jest.mock("motion/react", () => ({
  useMotionValue: (initial: number) => {
    const value = { _current: initial, set: (v: number) => { value._current = v; } };
    return value;
  },
  useSpring: (motionValue: any) => ({
    on: (_event: string, callback: (v: number) => void) => {
      callback(motionValue._current);
      return () => {};
    },
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

jest.mock("../../icons/BitcoinIcon/BitcoinIcon", () => ({
  BitcoinIcon: (props: any) => <span data-testid="bitcoin-icon" data-size={props.size} />,
}));
jest.mock("../../icons/SatsIcon/SatsIcon", () => ({
  SatsIcon: (props: any) => <span data-testid="sats-icon" data-size={props.size} />,
}));

describe("BalanceDisplay", () => {
  test("renders a root element with data-testid", () => {
    render(<BalanceDisplay amount={0} />);
    expect(screen.getByTestId("balance-display")).toBeInTheDocument();
  });

  test("renders BTC amount by default", () => {
    render(<BalanceDisplay amount={100_000_000} />);
    // BTCAmount renders digits — 1.00 000 000
    const el = screen.getByTestId("balance-display");
    expect(el.textContent).toMatch(/1[.]00/);
  });

  test("shows BTC label by default", () => {
    render(<BalanceDisplay amount={100_000_000} />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/components/BalanceDisplay/BalanceDisplay.test.tsx --no-coverage`
Expected: FAIL — module not found

**Step 3: Write minimal implementation**

```typescript
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BalanceDisplayProps } from "./BalanceDisplay.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";

type Unit = "btc" | "sats" | "fiat";

function formatSatsNumber(sats: number): string {
  return new Intl.NumberFormat("en-US").format(Math.max(0, Math.trunc(isNaN(sats) ? 0 : sats)));
}

function formatFiat(value: number, code: string, locale: string): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: code }).format(value);
}

export function BalanceDisplay({
  amount,
  fiatValue,
  fiatCode = "USD",
  fiatLocale = "en-US",
  unit: controlledUnit,
  onUnitChange,
  activeColor = "currentColor",
  labelColor = "#999",
  showToggle = true,
  className,
  style,
}: BalanceDisplayProps) {
  const hasFiat = fiatValue !== undefined;
  const units: Unit[] = hasFiat ? ["btc", "sats", "fiat"] : ["btc", "sats"];

  const [internalUnit, setInternalUnit] = useState<Unit>("btc");
  const currentUnit = controlledUnit ?? internalUnit;

  const handleToggle = () => {
    const idx = units.indexOf(currentUnit);
    const next = units[(idx + 1) % units.length];
    if (controlledUnit === undefined) {
      setInternalUnit(next);
    }
    onUnitChange?.(next);
  };

  const label = currentUnit === "btc" ? "BTC" : currentUnit === "sats" ? "sats" : fiatCode;

  return (
    <div
      data-testid="balance-display"
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentUnit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ color: activeColor }}
        >
          {currentUnit === "btc" && (
            <BTCAmount amount={amount} activeColor={activeColor} animate={false} />
          )}
          {currentUnit === "sats" && (
            <span>{formatSatsNumber(amount)}</span>
          )}
          {currentUnit === "fiat" && fiatValue !== undefined && (
            <span>{formatFiat(fiatValue, fiatCode, fiatLocale)}</span>
          )}
        </motion.div>
      </AnimatePresence>
      {showToggle ? (
        <button
          type="button"
          onClick={handleToggle}
          data-testid="balance-toggle"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: labelColor,
            fontSize: "0.5em",
            fontFamily: "inherit",
            marginTop: "0.2em",
          }}
        >
          {label}
        </button>
      ) : (
        <span style={{ color: labelColor, fontSize: "0.5em", marginTop: "0.2em" }}>
          {label}
        </span>
      )}
    </div>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npx jest src/components/BalanceDisplay/BalanceDisplay.test.tsx --no-coverage`
Expected: 3 tests PASS

**Step 5: Commit**

```
git add src/components/BalanceDisplay/BalanceDisplay.tsx src/components/BalanceDisplay/BalanceDisplay.test.tsx
git commit -m "feat: BalanceDisplay basic BTC rendering"
```

---

### Task 3: TDD — Unit toggle cycling

**Files:**
- Modify: `src/components/BalanceDisplay/BalanceDisplay.test.tsx`

**Step 1: Write the tests**

```typescript
import userEvent from "@testing-library/user-event";

test("cycles to sats on first toggle click", async () => {
  render(<BalanceDisplay amount={1_234_567} />);
  await userEvent.click(screen.getByTestId("balance-toggle"));
  // Sats mode shows formatted number
  expect(screen.getByTestId("balance-display").textContent).toContain("1,234,567");
  expect(screen.getByText("sats")).toBeInTheDocument();
});

test("cycles btc → sats → btc when no fiat", async () => {
  render(<BalanceDisplay amount={100_000_000} />);
  expect(screen.getByText("BTC")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("balance-toggle"));
  expect(screen.getByText("sats")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("balance-toggle"));
  expect(screen.getByText("BTC")).toBeInTheDocument();
});

test("cycles btc → sats → fiat → btc when fiat is provided", async () => {
  render(<BalanceDisplay amount={100_000_000} fiatValue={45000} />);
  expect(screen.getByText("BTC")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("balance-toggle"));
  expect(screen.getByText("sats")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("balance-toggle"));
  expect(screen.getByText("USD")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("balance-toggle"));
  expect(screen.getByText("BTC")).toBeInTheDocument();
});

test("calls onUnitChange on toggle", async () => {
  const onUnitChange = jest.fn();
  render(<BalanceDisplay amount={100_000_000} onUnitChange={onUnitChange} />);
  await userEvent.click(screen.getByTestId("balance-toggle"));
  expect(onUnitChange).toHaveBeenCalledWith("sats");
});
```

**Step 2: Run tests**

Run: `npx jest src/components/BalanceDisplay/BalanceDisplay.test.tsx --no-coverage`
Expected: 7 tests PASS (should work with existing implementation)

**Step 3: Commit**

```
git add src/components/BalanceDisplay/BalanceDisplay.test.tsx
git commit -m "test: BalanceDisplay unit toggle cycling"
```

---

### Task 4: TDD — Fiat display formatting

**Files:**
- Modify: `src/components/BalanceDisplay/BalanceDisplay.test.tsx`

**Step 1: Write the tests**

```typescript
test("formats fiat with USD by default", async () => {
  render(<BalanceDisplay amount={100_000_000} fiatValue={45000.5} />);
  // Click twice to get to fiat
  await userEvent.click(screen.getByTestId("balance-toggle"));
  await userEvent.click(screen.getByTestId("balance-toggle"));
  expect(screen.getByTestId("balance-display").textContent).toContain("$45,000.50");
});

test("formats fiat with EUR and locale", async () => {
  render(
    <BalanceDisplay
      amount={100_000_000}
      fiatValue={42000}
      fiatCode="EUR"
      fiatLocale="de-DE"
    />,
  );
  await userEvent.click(screen.getByTestId("balance-toggle"));
  await userEvent.click(screen.getByTestId("balance-toggle"));
  // EUR label shown
  expect(screen.getByText("EUR")).toBeInTheDocument();
  // Contains the value (locale-formatted)
  const text = screen.getByTestId("balance-display").textContent ?? "";
  expect(text).toContain("42.000");
});
```

**Step 2: Run tests**

Run: `npx jest src/components/BalanceDisplay/BalanceDisplay.test.tsx --no-coverage`
Expected: 9 tests PASS

**Step 3: Commit**

```
git add src/components/BalanceDisplay/BalanceDisplay.test.tsx
git commit -m "test: BalanceDisplay fiat formatting with locale"
```

---

### Task 5: TDD — Controlled mode

**Files:**
- Modify: `src/components/BalanceDisplay/BalanceDisplay.test.tsx`

**Step 1: Write the tests**

```typescript
test("respects controlled unit prop", () => {
  render(<BalanceDisplay amount={1_234_567} unit="sats" />);
  expect(screen.getByTestId("balance-display").textContent).toContain("1,234,567");
  expect(screen.getByText("sats")).toBeInTheDocument();
});

test("controlled mode: does not change internal state on toggle", async () => {
  const onUnitChange = jest.fn();
  const { rerender } = render(
    <BalanceDisplay amount={100_000_000} unit="btc" onUnitChange={onUnitChange} />,
  );
  expect(screen.getByText("BTC")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("balance-toggle"));
  // onUnitChange called, but unit prop still "btc" — component stays on btc
  expect(onUnitChange).toHaveBeenCalledWith("sats");
  expect(screen.getByText("BTC")).toBeInTheDocument();
  // Rerender with new unit to actually change
  rerender(
    <BalanceDisplay amount={100_000_000} unit="sats" onUnitChange={onUnitChange} />,
  );
  expect(screen.getByText("sats")).toBeInTheDocument();
});
```

**Step 2: Run tests**

Run: `npx jest src/components/BalanceDisplay/BalanceDisplay.test.tsx --no-coverage`
Expected: 11 tests PASS

**Step 3: Commit**

```
git add src/components/BalanceDisplay/BalanceDisplay.test.tsx
git commit -m "test: BalanceDisplay controlled mode"
```

---

### Task 6: TDD — showToggle, className, style, colors

**Files:**
- Modify: `src/components/BalanceDisplay/BalanceDisplay.test.tsx`

**Step 1: Write the tests**

```typescript
test("hides toggle button when showToggle=false", () => {
  render(<BalanceDisplay amount={100_000_000} showToggle={false} />);
  expect(screen.queryByTestId("balance-toggle")).not.toBeInTheDocument();
  // Still shows label as static text
  expect(screen.getByText("BTC")).toBeInTheDocument();
});

test("applies className to root", () => {
  render(<BalanceDisplay amount={0} className="custom" />);
  expect(screen.getByTestId("balance-display")).toHaveClass("custom");
});

test("applies style to root", () => {
  render(<BalanceDisplay amount={0} style={{ fontSize: 48 }} />);
  expect(screen.getByTestId("balance-display")).toHaveStyle({ fontSize: "48px" });
});

test("applies labelColor to toggle button", () => {
  render(<BalanceDisplay amount={0} labelColor="blue" />);
  const toggle = screen.getByTestId("balance-toggle");
  expect(toggle).toHaveStyle({ color: "blue" });
});

test("renders zero balance correctly", () => {
  render(<BalanceDisplay amount={0} />);
  const el = screen.getByTestId("balance-display");
  expect(el.textContent).toMatch(/0[.]00/);
});
```

**Step 2: Run tests**

Run: `npx jest src/components/BalanceDisplay/BalanceDisplay.test.tsx --no-coverage`
Expected: 16 tests PASS

**Step 3: Commit**

```
git add src/components/BalanceDisplay/BalanceDisplay.test.tsx
git commit -m "test: BalanceDisplay showToggle, className, style, colors"
```

---

### Task 7: Wire barrel exports

**Files:**
- Modify: `src/components/index.ts`
- Modify: `src/index.ts`

**Step 1: Add to components barrel**

In `src/components/index.ts`, add:

```typescript
export { BalanceDisplay } from "./BalanceDisplay";
export type { BalanceDisplayProps } from "./BalanceDisplay";
```

**Step 2: Add to root barrel**

In `src/index.ts`, add `BalanceDisplay` to the component exports and `BalanceDisplayProps` to the type exports.

**Step 3: Verify build**

Run: `npx tsup`
Expected: Build succeeds

**Step 4: Commit**

```
git add src/components/index.ts src/index.ts
git commit -m "feat: export BalanceDisplay from package"
```

---

### Task 8: Storybook stories

**Files:**
- Create: `src/components/BalanceDisplay/BalanceDisplay.stories.tsx`

**Step 1: Write all stories**

```typescript
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BalanceDisplay } from "./BalanceDisplay";

const meta: Meta<typeof BalanceDisplay> = {
  title: "Components/BalanceDisplay",
  component: BalanceDisplay,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "SF Mono, Menlo, monospace", fontSize: 32, textAlign: "center", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    amount: { control: { type: "number", min: 0, max: 2_100_000_000_000_000 } },
    fiatValue: { control: "number" },
    fiatCode: { control: "text" },
    activeColor: { control: "color" },
    labelColor: { control: "color" },
    showToggle: { control: "boolean" },
    unit: { control: "select", options: [undefined, "btc", "sats", "fiat"] },
  },
};

export default meta;
type Story = StoryObj<typeof BalanceDisplay>;

/** Default — tap label to toggle BTC/sats */
export const Default: Story = {
  args: { amount: 123_456_789 },
};

/** Starts in sats mode */
export const Sats: Story = {
  args: { amount: 123_456_789, unit: "sats" },
};

/** With fiat — cycles BTC → sats → USD → BTC */
export const WithFiat: Story = {
  args: { amount: 100_000_000, fiatValue: 45000.5 },
};

/** Euro fiat with German locale */
export const FiatEuro: Story = {
  args: { amount: 100_000_000, fiatValue: 42000, fiatCode: "EUR", fiatLocale: "de-DE" },
};

/** Static display — no toggle */
export const NoToggle: Story = {
  args: { amount: 50_000_000, showToggle: false },
};

/** Controlled mode — external unit state */
export const Controlled: Story = {
  render: () => {
    const [unit, setUnit] = useState<"btc" | "sats" | "fiat">("btc");
    return (
      <div>
        <BalanceDisplay
          amount={250_000_000}
          fiatValue={112500}
          unit={unit}
          onUnitChange={setUnit}
        />
        <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center" }}>
          {(["btc", "sats", "fiat"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              style={{
                padding: "4px 12px",
                fontSize: 14,
                border: u === unit ? "2px solid #f7931a" : "1px solid #ccc",
                borderRadius: 4,
                background: u === unit ? "#fff8f0" : "#fff",
                cursor: "pointer",
                fontWeight: u === unit ? 600 : 400,
              }}
            >
              {u.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

/** No fiat — cycles BTC ↔ sats only */
export const NoFiat: Story = {
  args: { amount: 21_000_000 },
};

/** Dark theme */
export const DarkTheme: Story = {
  render: () => (
    <div style={{ background: "#1a1a2e", padding: 32, borderRadius: 8 }}>
      <BalanceDisplay
        amount={500_000_000}
        fiatValue={225000}
        activeColor="#e0e0e0"
        labelColor="#666"
      />
    </div>
  ),
};

/** Max supply — 21 million BTC */
export const LargeBalance: Story = {
  args: { amount: 2_100_000_000_000_000, fiatValue: 2_100_000_000_000 },
};

/** Empty wallet */
export const ZeroBalance: Story = {
  args: { amount: 0, fiatValue: 0 },
};

/** Realistic wallet card */
export const InACard: Story = {
  render: () => (
    <div
      style={{
        background: "linear-gradient(135deg, #f7931a 0%, #e8820a 100%)",
        borderRadius: 16,
        padding: "32px 24px",
        color: "#fff",
        maxWidth: 360,
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: 14, fontFamily: "system-ui, sans-serif", marginBottom: 8, opacity: 0.8 }}>
        My Wallet
      </div>
      <BalanceDisplay
        amount={2_345_678_90}
        fiatValue={10567.32}
        activeColor="#fff"
        labelColor="rgba(255,255,255,0.7)"
        style={{ fontSize: 36 }}
      />
    </div>
  ),
};
```

**Step 2: Verify Storybook compiles**

Run: `npx storybook build --quiet 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```
git add src/components/BalanceDisplay/BalanceDisplay.stories.tsx
git commit -m "feat: BalanceDisplay Storybook stories"
```

---

### Task 9: Final verification

**Step 1: Run all tests**

Run: `npx jest --no-coverage`
Expected: All tests PASS

**Step 2: Run build**

Run: `npx tsup`
Expected: Build succeeds

**Step 3: Run Storybook build**

Run: `npx storybook build --quiet`
Expected: Build succeeds

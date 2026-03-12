# v1 Polish & New Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Harden existing component APIs (className/style, drop fontFamily, fix tilted) and add 3 wallet-focused components (AddressDisplay, TransactionAmount, ConfirmationBadge) before npm publish.

**Architecture:** Existing components get className/style props added uniformly. New components follow the same pattern: types file, component file, test file, stories file, barrel export. TransactionAmount wraps BTCAmount internally. All inline styles, no CSS.

**Tech Stack:** React 19, TypeScript 5.9, tsup, Jest + React Testing Library, Storybook 10, motion/react (existing only — no new deps).

---

### Task 1: Add className and style to BTCAmount, drop fontFamily

**Files:**

- Modify: `src/components/BTCAmount/BTCAmount.types.ts`
- Modify: `src/components/BTCAmount/BTCAmount.tsx`
- Modify: `src/components/BTCAmount/BTCAmount.test.tsx`
- Modify: `src/components/BTCAmount/BTCAmount.stories.tsx`

**Step 1: Update types — add className/style, remove fontFamily**

In `src/components/BTCAmount/BTCAmount.types.ts`, replace the full interface:

```typescript
export interface BTCAmountProps {
  /** Amount in satoshis (integer). */
  amount: number;
  /** Color for significant (non-zero leading) digits. Default: 'currentColor' */
  activeColor?: string;
  /** Color for insignificant (zero-padded) digits. Default: '#999999' */
  inactiveColor?: string;
  /** Separator between 3-digit satoshi groups. Default: '\u2009' (thin space) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** Whether to animate value changes. Default: true */
  animate?: boolean;
  /** Show a symbol icon before the amount. */
  symbol?: "btc" | "sats";
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}
```

**Step 2: Update component — use className/style, remove fontFamily**

In `src/components/BTCAmount/BTCAmount.tsx`:

- Remove `fontFamily = "inherit"` from props destructuring
- Add `className` and `style: userStyle` to props destructuring
- Change the outer `<span>` style from `{ fontFamily, display: "inline-flex", ... }` to `{ display: "inline-flex", alignItems: "baseline", gap: symbol ? "0.2em" : undefined, ...userStyle }`
- Add `className={className}` to the outer `<span>`

**Step 3: Update tests — remove fontFamily test, add className/style tests**

In `src/components/BTCAmount/BTCAmount.test.tsx`:

- Remove the test `"applies fontFamily style"` (fontFamily prop no longer exists)
- Add test:

```typescript
test("applies className", () => {
  render(<BTCAmount amount={0} className="custom-class" />);
  const container = screen.getByTestId("btc-amount");
  expect(container).toHaveClass("custom-class");
});

test("applies style prop", () => {
  render(<BTCAmount amount={0} style={{ fontSize: 32 }} />);
  const container = screen.getByTestId("btc-amount");
  expect(container).toHaveStyle({ fontSize: "32px" });
});
```

**Step 4: Update stories — replace fontFamily usage with style**

In `src/components/BTCAmount/BTCAmount.stories.tsx`:

- Remove `fontFamily` from argTypes
- Add `className` and `style` to argTypes (as text/object controls)
- Change the `CustomFont` story to use `style={{ fontFamily: "SF Mono, Menlo, monospace" }}` instead of the `fontFamily` prop

**Step 5: Run tests and commit**

Run: `npx jest src/components/BTCAmount --no-cache`
Expected: All tests pass

```bash
git add src/components/BTCAmount/
git commit -m "refactor: add className/style to BTCAmount, drop fontFamily"
```

---

### Task 2: Add className and style to BitcoinIcon

**Files:**

- Modify: `src/icons/BitcoinIcon/BitcoinIcon.types.ts`
- Modify: `src/icons/BitcoinIcon/BitcoinIcon.tsx`
- Modify: `src/icons/BitcoinIcon/BitcoinIcon.test.tsx`

**Step 1: Update types**

Add to `BitcoinIconProps`:

```typescript
  /** CSS class name. */
  className?: string;
  /** Additional inline styles applied to the SVG element. */
  style?: React.CSSProperties;
```

**Step 2: Update component**

In `BitcoinIcon.tsx`, add `className` and `style` to destructuring and pass to the `<svg>`:

```typescript
export function BitcoinIcon({
  alt = "Bitcoin",
  backgroundColor = "#f7931a",
  color = "#ffffff",
  size = 16,
  className,
  style,
}: BitcoinIconProps) {
  return (
    <svg
      className={className}
      height={size}
      role="img"
      style={style}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
```

**Step 3: Add test**

```typescript
test("applies className and style", () => {
  render(<BitcoinIcon className="my-icon" style={{ opacity: 0.5 }} />);
  const svg = screen.getByRole("img");
  expect(svg).toHaveClass("my-icon");
  expect(svg).toHaveStyle({ opacity: "0.5" });
});
```

**Step 4: Run tests and commit**

Run: `npx jest src/icons/BitcoinIcon --no-cache`

```bash
git add src/icons/BitcoinIcon/
git commit -m "feat: add className/style to BitcoinIcon"
```

---

### Task 3: Add className/style to SatsIcon, fix tilted semantics

**Files:**

- Modify: `src/icons/SatsIcon/SatsIcon.types.ts`
- Modify: `src/icons/SatsIcon/SatsIcon.tsx`
- Modify: `src/icons/SatsIcon/SatsIcon.test.tsx`
- Modify: `src/icons/SatsIcon/SatsIcon.stories.tsx`

**Step 1: Update types**

Add `className` and `style` to `SatsIconProps`. Update `tilted` JSDoc:

```typescript
  /** Apply a tilt rotation to the icon. Default: false */
  tilted?: boolean;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles applied to the SVG element. */
  style?: React.CSSProperties;
```

**Step 2: Fix tilted logic and add className/style**

In `SatsIcon.tsx`, flip the tilted condition. Currently:

```typescript
{...(!tilted ? { transform: "rotate(-14 0 0)" } : {})}
```

Change to:

```typescript
{...(tilted ? { transform: "rotate(14 0 0)" } : {})}
```

Also add `className` and `style` to destructuring and `<svg>`.

**Step 3: Fix tests**

In `SatsIcon.test.tsx`, update the two tilt tests:

- The test for "applies rotation when not tilted (default)" should now expect NO transform attribute when `tilted` is not set (default = upright)
- The test for "does NOT apply rotation when tilted=true" should now expect a transform attribute when `tilted={true}`

```typescript
test("renders upright by default (no rotation)", () => {
  render(<SatsIcon />);
  const svg = screen.getByRole("img");
  expect(svg).not.toHaveAttribute("transform");
});

test("applies tilt rotation when tilted={true}", () => {
  render(<SatsIcon tilted />);
  const svg = screen.getByRole("img");
  expect(svg).toHaveAttribute("transform");
});
```

Add className/style test:

```typescript
test("applies className and style", () => {
  render(<SatsIcon className="my-icon" style={{ opacity: 0.5 }} />);
  const svg = screen.getByRole("img");
  expect(svg).toHaveClass("my-icon");
  expect(svg).toHaveStyle({ opacity: "0.5" });
});
```

**Step 4: Update stories**

In the `TiltComparison` story, swap labels: default should be "Upright (default)" and `tilted` should be "Tilted".

**Step 5: Update BTCAmount**

In `src/components/BTCAmount/BTCAmount.tsx`, the symbol rendering line:

```tsx
{
  symbol === "sats" && <SatsIcon size="1em" tilted />;
}
```

Now means tilted. The sats symbol in BTCAmount should show tilted (which now correctly means rotated). Verify this is the desired behavior — if the symbol should be upright, remove `tilted`.

**Step 6: Run tests and commit**

Run: `npx jest --no-cache`
Expected: All tests pass (BTCAmount tests too since they mock SatsIcon)

```bash
git add src/icons/SatsIcon/ src/components/BTCAmount/BTCAmount.tsx
git commit -m "fix: flip SatsIcon tilted semantics, add className/style"
```

---

### Task 4: Add className to BTCInput

**Files:**

- Modify: `src/components/BTCInput/BTCInput.types.ts`
- Modify: `src/components/BTCInput/BTCInput.tsx`
- Modify: `src/components/BTCInput/BTCInput.test.tsx`

**Step 1: Update types**

Add to `BTCInputProps`:

```typescript
  /** CSS class name. */
  className?: string;
```

**Step 2: Update component**

Add `className` to props destructuring and pass to `<input>`:

```tsx
<input
  ref={inputRef}
  className={className}
  type="text"
  ...
```

**Step 3: Add test**

```typescript
test("applies className", () => {
  render(<BTCInput {...defaultProps} className="custom-input" />);
  const input = screen.getByRole("textbox");
  expect(input).toHaveClass("custom-input");
});
```

**Step 4: Run tests and commit**

Run: `npx jest src/components/BTCInput --no-cache`

```bash
git add src/components/BTCInput/
git commit -m "feat: add className to BTCInput"
```

---

### Task 5: Build AddressDisplay component (TDD)

**Files:**

- Create: `src/components/AddressDisplay/AddressDisplay.types.ts`
- Create: `src/components/AddressDisplay/AddressDisplay.tsx`
- Create: `src/components/AddressDisplay/AddressDisplay.test.tsx`
- Create: `src/components/AddressDisplay/index.ts`

**Step 1: Create types file**

`src/components/AddressDisplay/AddressDisplay.types.ts`:

```typescript
export interface AddressDisplayProps {
  /** Bitcoin address string. */
  address: string;
  /** Number of characters to show at the start. Default: 8 */
  prefixChars?: number;
  /** Number of characters to show at the end. Default: 5 */
  suffixChars?: number;
  /** Truncation indicator between prefix and suffix. Default: '...' */
  separator?: string;
  /** Enable click-to-copy and show copy icon. Default: true */
  copyable?: boolean;
  /** Callback fired after address is copied. */
  onCopy?: () => void;
  /** Color for the address text. Default: 'currentColor' */
  addressColor?: string;
  /** Color for the separator. Default: '#999999' */
  separatorColor?: string;
  /** Color for the copy icon. Default: '#999999' */
  copyIconColor?: string;
  /** Text shown briefly after copying. Default: 'Copied!' */
  copiedLabel?: string;
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}
```

**Step 2: Create barrel export**

`src/components/AddressDisplay/index.ts`:

```typescript
export { AddressDisplay } from "./AddressDisplay";
export type { AddressDisplayProps } from "./AddressDisplay.types";
```

**Step 3: Write tests**

`src/components/AddressDisplay/AddressDisplay.test.tsx`:

```tsx
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AddressDisplay } from "./AddressDisplay";

const TEST_ADDR = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

// Mock clipboard API
Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

describe("AddressDisplay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("truncates address with default prefix/suffix", () => {
    render(<AddressDisplay address={TEST_ADDR} />);
    const el = screen.getByTestId("address-display");
    expect(el.textContent).toContain("bc1qxy2k");
    expect(el.textContent).toContain("x0wlh");
    expect(el.textContent).toContain("...");
  });

  test("shows full address when shorter than prefix+suffix", () => {
    render(<AddressDisplay address="abc123" />);
    const el = screen.getByTestId("address-display");
    expect(el.textContent).toContain("abc123");
    expect(el.textContent).not.toContain("...");
  });

  test("respects custom prefixChars and suffixChars", () => {
    render(<AddressDisplay address={TEST_ADDR} prefixChars={4} suffixChars={3} />);
    const el = screen.getByTestId("address-display");
    expect(el.textContent).toContain("bc1q");
    expect(el.textContent).toContain("wlh");
  });

  test("copies address to clipboard on click", async () => {
    render(<AddressDisplay address={TEST_ADDR} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(TEST_ADDR);
  });

  test("calls onCopy callback after copying", async () => {
    const onCopy = jest.fn();
    render(<AddressDisplay address={TEST_ADDR} onCopy={onCopy} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onCopy).toHaveBeenCalled();
  });

  test("hides copy button when copyable={false}", () => {
    render(<AddressDisplay address={TEST_ADDR} copyable={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("shows copied label after clicking", async () => {
    render(<AddressDisplay address={TEST_ADDR} copiedLabel="Done!" />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText("Done!")).toBeInTheDocument();
  });

  test("applies className and style", () => {
    render(<AddressDisplay address={TEST_ADDR} className="addr" style={{ fontSize: 14 }} />);
    const el = screen.getByTestId("address-display");
    expect(el).toHaveClass("addr");
    expect(el).toHaveStyle({ fontSize: "14px" });
  });

  test("applies custom colors", () => {
    render(<AddressDisplay address={TEST_ADDR} addressColor="red" separatorColor="blue" />);
    const el = screen.getByTestId("address-display");
    const spans = el.querySelectorAll("span");
    const colors = Array.from(spans).map((s) => (s as HTMLElement).style.color);
    expect(colors).toContain("red");
    expect(colors).toContain("blue");
  });
});
```

**Step 4: Run tests to verify they fail**

Run: `npx jest src/components/AddressDisplay --no-cache`
Expected: FAIL (module not found)

**Step 5: Implement component**

`src/components/AddressDisplay/AddressDisplay.tsx`:

```tsx
import { useCallback, useState } from "react";
import { AddressDisplayProps } from "./AddressDisplay.types";

export function AddressDisplay({
  address,
  prefixChars = 8,
  suffixChars = 5,
  separator = "...",
  copyable = true,
  onCopy,
  addressColor = "currentColor",
  separatorColor = "#999999",
  copyIconColor = "#999999",
  copiedLabel = "Copied!",
  fontFamily = "inherit",
  className,
  style,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const needsTruncation = address.length > prefixChars + suffixChars;
  const prefix = needsTruncation ? address.slice(0, prefixChars) : address;
  const suffix = needsTruncation ? address.slice(-suffixChars) : "";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — silently fail
    }
  }, [address, onCopy]);

  return (
    <span
      data-testid="address-display"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4em",
        fontFamily,
        ...style,
      }}
    >
      <span style={{ color: addressColor }}>{prefix}</span>
      {needsTruncation && <span style={{ color: separatorColor }}>{separator}</span>}
      {needsTruncation && <span style={{ color: addressColor }}>{suffix}</span>}
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy address"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: copyIconColor,
            fontSize: "inherit",
            lineHeight: 1,
            display: "inline-flex",
          }}
        >
          {copied ? (
            <span style={{ fontSize: "0.75em", color: copyIconColor }}>{copiedLabel}</span>
          ) : (
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={9} y={9} width={13} height={13} rx={2} />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      )}
    </span>
  );
}
```

**Step 6: Run tests to verify they pass**

Run: `npx jest src/components/AddressDisplay --no-cache`
Expected: All pass

**Step 7: Commit**

```bash
git add src/components/AddressDisplay/
git commit -m "feat: add AddressDisplay component with copy-to-clipboard"
```

---

### Task 6: Build TransactionAmount component (TDD)

**Files:**

- Create: `src/components/TransactionAmount/TransactionAmount.types.ts`
- Create: `src/components/TransactionAmount/TransactionAmount.tsx`
- Create: `src/components/TransactionAmount/TransactionAmount.test.tsx`
- Create: `src/components/TransactionAmount/index.ts`

**Step 1: Create types file**

`src/components/TransactionAmount/TransactionAmount.types.ts`:

```typescript
export interface TransactionAmountProps {
  /** Signed amount in satoshis. Positive = received, negative = sent. */
  amount: number;
  /** Color for positive (received) amounts. Default: '#22c55e' */
  positiveColor?: string;
  /** Color for negative (sent) amounts. Default: '#ef4444' */
  negativeColor?: string;
  /** Color for insignificant (zero-padded) digits. Default: '#999999' */
  inactiveColor?: string;
  /** Show +/- sign prefix. Default: true */
  showSign?: boolean;
  /** Show a symbol icon before the amount. */
  symbol?: "btc" | "sats";
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** Separator between 3-digit satoshi groups. Default: '\u2009' (thin space) */
  satsSeparator?: string;
  /** Separator between BTC whole part and decimals. Default: '.' */
  btcSeparator?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}
```

**Step 2: Create barrel export**

`src/components/TransactionAmount/index.ts`:

```typescript
export { TransactionAmount } from "./TransactionAmount";
export type { TransactionAmountProps } from "./TransactionAmount.types";
```

**Step 3: Write tests**

`src/components/TransactionAmount/TransactionAmount.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TransactionAmount } from "./TransactionAmount";

// Mock motion hooks (inherited via BTCAmount)
jest.mock("motion/react", () => ({
  useMotionValue: (initial: number) => {
    const value = {
      _current: initial,
      set: (v: number) => {
        value._current = v;
      },
    };
    return value;
  },
  useSpring: (motionValue: any) => ({
    on: (_event: string, callback: (v: number) => void) => {
      callback(motionValue._current);
      return () => {};
    },
  }),
}));

jest.mock("../../icons/BitcoinIcon/BitcoinIcon", () => ({
  BitcoinIcon: (props: any) => <span data-testid="bitcoin-icon" />,
}));
jest.mock("../../icons/SatsIcon/SatsIcon", () => ({
  SatsIcon: (props: any) => <span data-testid="sats-icon" />,
}));

describe("TransactionAmount", () => {
  test("renders positive amount with + sign", () => {
    render(<TransactionAmount amount={50000} />);
    const el = screen.getByTestId("transaction-amount");
    expect(el.textContent).toContain("+");
  });

  test("renders negative amount with - sign", () => {
    render(<TransactionAmount amount={-120000} />);
    const el = screen.getByTestId("transaction-amount");
    expect(el.textContent).toContain("-");
  });

  test("renders zero amount with no sign", () => {
    render(<TransactionAmount amount={0} />);
    const el = screen.getByTestId("transaction-amount");
    expect(el.textContent).not.toMatch(/[+-]/);
  });

  test("hides sign when showSign={false}", () => {
    render(<TransactionAmount amount={50000} showSign={false} />);
    const el = screen.getByTestId("transaction-amount");
    expect(el.textContent).not.toContain("+");
  });

  test("applies positiveColor to positive amounts", () => {
    render(<TransactionAmount amount={1000} positiveColor="green" />);
    const el = screen.getByTestId("transaction-amount");
    expect(el).toHaveStyle({ color: "green" });
  });

  test("applies negativeColor to negative amounts", () => {
    render(<TransactionAmount amount={-1000} negativeColor="red" />);
    const el = screen.getByTestId("transaction-amount");
    expect(el).toHaveStyle({ color: "red" });
  });

  test("renders correct digit formatting", () => {
    render(<TransactionAmount amount={50000} />);
    const el = screen.getByTestId("transaction-amount");
    // Should contain the formatted BTCAmount digits
    expect(el.textContent).toMatch(/0[.]00.050.000/);
  });

  test("applies className and style", () => {
    render(<TransactionAmount amount={100} className="tx" style={{ fontSize: 20 }} />);
    const el = screen.getByTestId("transaction-amount");
    expect(el).toHaveClass("tx");
    expect(el).toHaveStyle({ fontSize: "20px" });
  });
});
```

**Step 4: Run tests to verify they fail**

Run: `npx jest src/components/TransactionAmount --no-cache`
Expected: FAIL

**Step 5: Implement component**

`src/components/TransactionAmount/TransactionAmount.tsx`:

```tsx
import { TransactionAmountProps } from "./TransactionAmount.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";

export function TransactionAmount({
  amount,
  positiveColor = "#22c55e",
  negativeColor = "#ef4444",
  inactiveColor = "#999999",
  showSign = true,
  symbol,
  fontFamily = "inherit",
  satsSeparator = "\u2009",
  btcSeparator = ".",
  className,
  style,
}: TransactionAmountProps) {
  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const activeColor = isPositive ? positiveColor : isNegative ? negativeColor : inactiveColor;
  const sign = showSign && isPositive ? "+" : showSign && isNegative ? "\u2212" : "";
  const absAmount = Math.abs(amount);

  return (
    <span
      data-testid="transaction-amount"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        color: activeColor,
        fontFamily,
        ...style,
      }}
    >
      {sign && <span>{sign}</span>}
      <BTCAmount
        amount={absAmount}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        satsSeparator={satsSeparator}
        btcSeparator={btcSeparator}
        symbol={symbol}
        animate={false}
      />
    </span>
  );
}
```

**Step 6: Run tests to verify they pass**

Run: `npx jest src/components/TransactionAmount --no-cache`

**Step 7: Commit**

```bash
git add src/components/TransactionAmount/
git commit -m "feat: add TransactionAmount component with signed coloring"
```

---

### Task 7: Build ConfirmationBadge component (TDD)

**Files:**

- Create: `src/components/ConfirmationBadge/ConfirmationBadge.types.ts`
- Create: `src/components/ConfirmationBadge/ConfirmationBadge.tsx`
- Create: `src/components/ConfirmationBadge/ConfirmationBadge.test.tsx`
- Create: `src/components/ConfirmationBadge/index.ts`

**Step 1: Create types file**

`src/components/ConfirmationBadge/ConfirmationBadge.types.ts`:

```typescript
export interface ConfirmationBadgeProps {
  /** Number of confirmations. */
  confirmations: number;
  /** Number of confirmations considered "settled". Default: 6 */
  threshold?: number;
  /** Color for 0 confirmations. Default: '#ef4444' */
  unconfirmedColor?: string;
  /** Color for 1 to threshold-1 confirmations. Default: '#f59e0b' */
  confirmingColor?: string;
  /** Color for threshold+ confirmations. Default: '#22c55e' */
  confirmedColor?: string;
  /** Label for 0 confirmations. Default: 'Unconfirmed' */
  unconfirmedLabel?: string;
  /** Label for threshold+ confirmations. Default: 'Confirmed' */
  confirmedLabel?: string;
  /** Show confirmation count in the badge. Default: true */
  showCount?: boolean;
  /** Font family. Default: 'inherit' */
  fontFamily?: string;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}
```

**Step 2: Create barrel export**

`src/components/ConfirmationBadge/index.ts`:

```typescript
export { ConfirmationBadge } from "./ConfirmationBadge";
export type { ConfirmationBadgeProps } from "./ConfirmationBadge.types";
```

**Step 3: Write tests**

`src/components/ConfirmationBadge/ConfirmationBadge.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ConfirmationBadge } from "./ConfirmationBadge";

describe("ConfirmationBadge", () => {
  test("shows unconfirmed label for 0 confirmations", () => {
    render(<ConfirmationBadge confirmations={0} />);
    expect(screen.getByText("Unconfirmed")).toBeInTheDocument();
  });

  test("shows count for 1-5 confirmations (default threshold=6)", () => {
    render(<ConfirmationBadge confirmations={3} />);
    expect(screen.getByText("3/6")).toBeInTheDocument();
  });

  test("shows confirmed label at threshold", () => {
    render(<ConfirmationBadge confirmations={6} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  test("shows confirmed label above threshold", () => {
    render(<ConfirmationBadge confirmations={100} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  test("applies unconfirmedColor for 0", () => {
    render(<ConfirmationBadge confirmations={0} unconfirmedColor="red" />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveStyle({ color: "red" });
  });

  test("applies confirmingColor for in-progress", () => {
    render(<ConfirmationBadge confirmations={2} confirmingColor="orange" />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveStyle({ color: "orange" });
  });

  test("applies confirmedColor at threshold", () => {
    render(<ConfirmationBadge confirmations={6} confirmedColor="lime" />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveStyle({ color: "lime" });
  });

  test("respects custom threshold", () => {
    render(<ConfirmationBadge confirmations={3} threshold={3} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  test("shows custom labels", () => {
    render(<ConfirmationBadge confirmations={0} unconfirmedLabel="Pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("hides count when showCount={false}", () => {
    render(<ConfirmationBadge confirmations={3} showCount={false} />);
    expect(screen.queryByText("3/6")).not.toBeInTheDocument();
  });

  test("applies className and style", () => {
    render(<ConfirmationBadge confirmations={0} className="badge" style={{ padding: 8 }} />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveClass("badge");
    expect(el).toHaveStyle({ padding: "8px" });
  });
});
```

**Step 4: Run tests to verify they fail**

Run: `npx jest src/components/ConfirmationBadge --no-cache`
Expected: FAIL

**Step 5: Implement component**

`src/components/ConfirmationBadge/ConfirmationBadge.tsx`:

```tsx
import { ConfirmationBadgeProps } from "./ConfirmationBadge.types";

export function ConfirmationBadge({
  confirmations,
  threshold = 6,
  unconfirmedColor = "#ef4444",
  confirmingColor = "#f59e0b",
  confirmedColor = "#22c55e",
  unconfirmedLabel = "Unconfirmed",
  confirmedLabel = "Confirmed",
  showCount = true,
  fontFamily = "inherit",
  className,
  style,
}: ConfirmationBadgeProps) {
  const clamped = Math.max(0, Math.trunc(confirmations));
  const isUnconfirmed = clamped === 0;
  const isConfirmed = clamped >= threshold;

  const color = isUnconfirmed ? unconfirmedColor : isConfirmed ? confirmedColor : confirmingColor;

  let label: string;
  if (isUnconfirmed) {
    label = unconfirmedLabel;
  } else if (isConfirmed) {
    label = confirmedLabel;
  } else {
    label = showCount ? `${clamped}/${threshold}` : "";
  }

  return (
    <span
      data-testid="confirmation-badge"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        color,
        fontFamily,
        ...style,
      }}
    >
      {label}
    </span>
  );
}
```

**Step 6: Run tests to verify they pass**

Run: `npx jest src/components/ConfirmationBadge --no-cache`

**Step 7: Commit**

```bash
git add src/components/ConfirmationBadge/
git commit -m "feat: add ConfirmationBadge component with 3-state coloring"
```

---

### Task 8: Wire up barrel exports for new components

**Files:**

- Modify: `src/components/index.ts`
- Modify: `src/index.ts`

**Step 1: Update components barrel**

`src/components/index.ts`:

```typescript
export { BTCAmount } from "./BTCAmount";
export type { BTCAmountProps } from "./BTCAmount";
export { BTCInput } from "./BTCInput";
export type { BTCInputProps } from "./BTCInput";
export { AddressDisplay } from "./AddressDisplay";
export type { AddressDisplayProps } from "./AddressDisplay";
export { TransactionAmount } from "./TransactionAmount";
export type { TransactionAmountProps } from "./TransactionAmount";
export { ConfirmationBadge } from "./ConfirmationBadge";
export type { ConfirmationBadgeProps } from "./ConfirmationBadge";
```

**Step 2: Update root barrel**

`src/index.ts`:

```typescript
export { BTCAmount, BTCInput, AddressDisplay, TransactionAmount, ConfirmationBadge } from "./components";
export type {
  BTCAmountProps,
  BTCInputProps,
  AddressDisplayProps,
  TransactionAmountProps,
  ConfirmationBadgeProps,
} from "./components";
export { BitcoinIcon, SatsIcon } from "./icons";
export type { BitcoinIconProps, SatsIconProps } from "./icons";
```

**Step 3: Build and verify**

Run: `npx tsup`
Expected: Clean build, no errors. Check that `dist/index.d.ts` exports all new types.

Run: `npx jest --no-cache`
Expected: All tests pass

**Step 4: Commit**

```bash
git add src/components/index.ts src/index.ts
git commit -m "feat: export AddressDisplay, TransactionAmount, ConfirmationBadge"
```

---

### Task 9: Write Storybook stories for new components

**Files:**

- Create: `src/components/AddressDisplay/AddressDisplay.stories.tsx`
- Create: `src/components/TransactionAmount/TransactionAmount.stories.tsx`
- Create: `src/components/ConfirmationBadge/ConfirmationBadge.stories.tsx`

**Step 1: AddressDisplay stories**

`src/components/AddressDisplay/AddressDisplay.stories.tsx`:

Write stories covering: Default, ShortAddress (no truncation), CustomTruncation, NotCopyable, DarkTheme, InATransactionList (realistic context showing address + TransactionAmount together), CustomColors.

Use `tags: ["autodocs"]` and a monospace decorator.

**Step 2: TransactionAmount stories**

`src/components/TransactionAmount/TransactionAmount.stories.tsx`:

Write stories covering: Received (positive), Sent (negative), Zero, WithBTCSymbol, WithSatsSymbol, NoSign, CustomColors, TransactionList (realistic list of 5-6 transactions with alternating +/-).

Use `tags: ["autodocs"]` and a monospace decorator.

**Step 3: ConfirmationBadge stories**

`src/components/ConfirmationBadge/ConfirmationBadge.stories.tsx`:

Write stories covering: Unconfirmed, OneConfirmation, ThreeConfirmations, Confirmed, AllStates (0 through 6+ in a vertical list), CustomThreshold, CustomLabels, CustomColors, InATransactionRow (realistic context with address + amount + badge).

Use `tags: ["autodocs"]`.

**Step 4: Commit**

```bash
git add src/components/AddressDisplay/AddressDisplay.stories.tsx src/components/TransactionAmount/TransactionAmount.stories.tsx src/components/ConfirmationBadge/ConfirmationBadge.stories.tsx
git commit -m "feat: add Storybook stories for AddressDisplay, TransactionAmount, ConfirmationBadge"
```

---

### Task 10: Update README

**Files:**

- Modify: `readme.md`

**Step 1: Add docs for new components**

Add sections for AddressDisplay, TransactionAmount, and ConfirmationBadge after the existing component docs. Include:

- Usage example with import
- Full props table
- Brief description

Also update the BTCAmount props table to remove `fontFamily` and add `className`, `style`, `symbol`.

Update BTCInput table to add `className`.

Update icon tables to add `className`, `style`.

Note the SatsIcon `tilted` semantics change.

**Step 2: Commit**

```bash
git add readme.md
git commit -m "docs: update README with new components and API changes"
```

---

### Task 11: Final verification

**Step 1: Run full test suite**

Run: `npx jest --no-cache`
Expected: All tests pass (should be ~50+ tests now)

**Step 2: Build**

Run: `npx tsup`
Expected: Clean build

**Step 3: Verify Storybook**

Run: `npm run storybook`
Manual check: all stories render correctly

**Step 4: Verify exports**

Run: `node -e "const m = require('./dist/index.js'); console.log(Object.keys(m).sort().join(', '))"`
Expected: `AddressDisplay, BTCAmount, BTCInput, BitcoinIcon, ConfirmationBadge, SatsIcon, TransactionAmount`

**Step 5: Commit if any fixes needed**

```bash
git add -A
git commit -m "chore: final v1 polish verification"
```

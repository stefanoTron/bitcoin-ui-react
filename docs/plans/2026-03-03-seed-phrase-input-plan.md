# SeedPhraseInput Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a grid-based seed phrase input component with built-in BIP39 autocomplete for 12/24 word import and read-only display.

**Architecture:** Controlled component — consumer owns `words: string[]`, gets `onWordsChange` callback. Grid of individual numbered inputs with per-field autocomplete dropdown. Built-in BIP39 English wordlist (2048 words) for prefix matching. `onComplete` fires when all fields contain valid BIP39 words.

**Tech Stack:** React 19, TypeScript 5.9, inline styles, Jest + RTL, Storybook 10

---

### Task 1: Create BIP39 English wordlist data file

**Files:**

- Create: `src/data/bip39-english.ts`

**Step 1: Create the data file**

Create `src/data/bip39-english.ts` containing the full 2048-word BIP39 English wordlist as a typed readonly array. Source the list from the BIP39 specification (https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt).

```typescript
export const BIP39_ENGLISH_WORDLIST: readonly string[] = [
  "abandon",
  "ability",
  "able",
  // ... all 2048 words from BIP39 english.txt
  "zoo",
] as const;
```

**Step 2: Verify the file has exactly 2048 entries**

Run: `node -e "const w = require('./src/data/bip39-english.ts'); console.log('nope')" || npx tsx -e "import { BIP39_ENGLISH_WORDLIST } from './src/data/bip39-english'; console.log(BIP39_ENGLISH_WORDLIST.length)"`

Expected: `2048`

**Step 3: Commit**

```
git add src/data/bip39-english.ts
git commit -m "feat: add BIP39 English wordlist data file"
```

---

### Task 2: Create types file and barrel export

**Files:**

- Create: `src/components/SeedPhraseInput/SeedPhraseInput.types.ts`
- Create: `src/components/SeedPhraseInput/index.ts`

**Step 1: Create the types file**

```typescript
export interface SeedPhraseInputProps {
  /** The current words array. Length should match wordCount. */
  words: string[];
  /** Called when any word changes. Receives the full updated array. */
  onWordsChange: (words: string[]) => void;
  /** Number of seed words. Default: 12. */
  wordCount?: 12 | 24;
  /** Read-only mode for displaying a generated seed. Default: false. */
  readOnly?: boolean;
  /** Fires when all fields contain valid BIP39 words. */
  onComplete?: (words: string[]) => void;
  /** Number of columns in the grid. Default: 2. */
  columns?: 2 | 3 | 4;
  /** Custom class name for the root element. */
  className?: string;
  /** Custom inline styles for the root element. */
  style?: React.CSSProperties;
}
```

**Step 2: Create the barrel export**

```typescript
export { SeedPhraseInput } from "./SeedPhraseInput";
export type { SeedPhraseInputProps } from "./SeedPhraseInput.types";
```

**Step 3: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.types.ts src/components/SeedPhraseInput/index.ts
git commit -m "feat: add SeedPhraseInput types and barrel export"
```

---

### Task 3: TDD — Basic grid rendering (12 numbered inputs)

**Files:**

- Create: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`
- Create: `src/components/SeedPhraseInput/SeedPhraseInput.tsx`

**Step 1: Write the failing test**

```typescript
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SeedPhraseInput } from "./SeedPhraseInput";

describe("SeedPhraseInput", () => {
  const defaultProps = {
    words: Array(12).fill(""),
    onWordsChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders 12 input fields by default", () => {
    render(<SeedPhraseInput {...defaultProps} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(12);
  });

  test("renders numbered labels for each field", () => {
    render(<SeedPhraseInput {...defaultProps} />);
    for (let i = 1; i <= 12; i++) {
      expect(screen.getByText(`${i}.`)).toBeInTheDocument();
    }
  });

  test("renders inside a root element with data-testid", () => {
    render(<SeedPhraseInput {...defaultProps} />);
    expect(screen.getByTestId("seed-phrase-input")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: FAIL — module not found

**Step 3: Write minimal implementation**

```typescript
import { SeedPhraseInputProps } from "./SeedPhraseInput.types";

export function SeedPhraseInput({
  words,
  onWordsChange,
  wordCount = 12,
  readOnly = false,
  onComplete,
  columns = 2,
  className,
  style,
}: SeedPhraseInputProps) {
  return (
    <div
      data-testid="seed-phrase-input"
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
        ...style,
      }}
    >
      {Array.from({ length: wordCount }, (_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ minWidth: "2em", textAlign: "right", fontSize: "0.85em", color: "#999", userSelect: "none" }}>
            {i + 1}.
          </span>
          <input
            type="text"
            value={words[i] ?? ""}
            readOnly={readOnly}
            onChange={(e) => {
              const newWords = [...words];
              newWords[i] = e.target.value;
              onWordsChange(newWords);
            }}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "inherit",
              fontSize: "inherit",
              padding: "4px 0",
              borderBottom: "1px solid #ddd",
              minWidth: 0,
            }}
          />
        </div>
      ))}
    </div>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: 3 tests PASS

**Step 5: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.tsx src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "feat: SeedPhraseInput basic grid rendering with 12 numbered inputs"
```

---

### Task 4: TDD — Word change callback and pre-filled words

**Files:**

- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`

**Step 1: Write the failing tests**

Add to the existing describe block:

```typescript
import userEvent from "@testing-library/user-event";

// ... inside describe("SeedPhraseInput")

test("calls onWordsChange with updated array when user types", async () => {
  const onWordsChange = jest.fn();
  render(<SeedPhraseInput words={Array(12).fill("")} onWordsChange={onWordsChange} />);
  const inputs = screen.getAllByRole("textbox");
  await userEvent.type(inputs[0], "abandon");
  expect(onWordsChange).toHaveBeenCalled();
  // Each keystroke calls onWordsChange; the last call should have "abandon" at index 0
  const lastCall = onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
  expect(lastCall[0]).toBe("abandon");
  expect(lastCall.length).toBe(12);
});

test("displays pre-filled words", () => {
  const words = ["abandon", "ability", "able", ...Array(9).fill("")];
  render(<SeedPhraseInput words={words} onWordsChange={jest.fn()} />);
  const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
  expect(inputs[0].value).toBe("abandon");
  expect(inputs[1].value).toBe("ability");
  expect(inputs[2].value).toBe("able");
  expect(inputs[3].value).toBe("");
});
```

**Step 2: Run test to verify it passes**

These should already pass with the Task 3 implementation since `onChange` and `value` are wired up.

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: 5 tests PASS

**Step 3: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "test: SeedPhraseInput word change and pre-filled words"
```

---

### Task 5: TDD — 24-word mode and columns prop

**Files:**

- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`

**Step 1: Write the failing tests**

```typescript
test("renders 24 input fields when wordCount={24}", () => {
  render(
    <SeedPhraseInput
      words={Array(24).fill("")}
      onWordsChange={jest.fn()}
      wordCount={24}
    />,
  );
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(24);
});

test("renders numbered labels up to 24", () => {
  render(
    <SeedPhraseInput
      words={Array(24).fill("")}
      onWordsChange={jest.fn()}
      wordCount={24}
    />,
  );
  expect(screen.getByText("24.")).toBeInTheDocument();
});

test("applies columns prop to grid layout", () => {
  render(
    <SeedPhraseInput
      words={Array(12).fill("")}
      onWordsChange={jest.fn()}
      columns={3}
    />,
  );
  const root = screen.getByTestId("seed-phrase-input");
  expect(root.style.gridTemplateColumns).toBe("repeat(3, 1fr)");
});
```

**Step 2: Run test to verify they pass**

These should pass with the existing implementation since `wordCount` and `columns` are already wired up.

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: 8 tests PASS

**Step 3: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "test: SeedPhraseInput 24-word mode and columns prop"
```

---

### Task 6: TDD — Read-only mode

**Files:**

- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`
- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.tsx`

**Step 1: Write the failing tests**

```typescript
test("renders spans instead of inputs in readOnly mode", () => {
  const words = ["abandon", "ability", "able", ...Array(9).fill("")];
  render(
    <SeedPhraseInput words={words} onWordsChange={jest.fn()} readOnly />,
  );
  expect(screen.queryAllByRole("textbox")).toHaveLength(0);
  expect(screen.getByText("abandon")).toBeInTheDocument();
  expect(screen.getByText("ability")).toBeInTheDocument();
});

test("does not call onWordsChange in readOnly mode", () => {
  const onWordsChange = jest.fn();
  const words = ["abandon", ...Array(11).fill("")];
  render(
    <SeedPhraseInput words={words} onWordsChange={onWordsChange} readOnly />,
  );
  // No inputs to type into, so no change events
  expect(screen.queryAllByRole("textbox")).toHaveLength(0);
  expect(onWordsChange).not.toHaveBeenCalled();
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: FAIL — readOnly still renders `<input>` with role="textbox" (readOnly inputs still have role textbox)

**Step 3: Update implementation to render spans in readOnly mode**

In SeedPhraseInput.tsx, update the inner content of the map:

```typescript
{readOnly ? (
  <span style={{
    flex: 1,
    fontFamily: "inherit",
    fontSize: "inherit",
    padding: "4px 0",
    borderBottom: "1px solid #ddd",
    minWidth: 0,
  }}>
    {words[i] ?? ""}
  </span>
) : (
  <input ... />
)}
```

**Step 4: Run test to verify it passes**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: 10 tests PASS

**Step 5: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.tsx src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "feat: SeedPhraseInput read-only mode renders spans"
```

---

### Task 7: TDD — Autocomplete dropdown

This is the most complex task. The autocomplete shows a dropdown of BIP39 words matching the current input prefix.

**Files:**

- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`
- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.tsx`

**Step 1: Write the failing tests**

```typescript
test("shows autocomplete suggestions when typing", async () => {
  render(<SeedPhraseInput {...defaultProps} />);
  const inputs = screen.getAllByRole("textbox");
  await userEvent.type(inputs[0], "ab");
  // Should show BIP39 words starting with "ab"
  expect(screen.getByText("abandon")).toBeInTheDocument();
  expect(screen.getByText("ability")).toBeInTheDocument();
  expect(screen.getByText("able")).toBeInTheDocument();
  expect(screen.getByText("about")).toBeInTheDocument();
  expect(screen.getByText("above")).toBeInTheDocument();
  expect(screen.getByText("absent")).toBeInTheDocument();
  expect(screen.getByText("absorb")).toBeInTheDocument();
  expect(screen.getByText("abstract")).toBeInTheDocument();
});

test("hides autocomplete when input is empty", async () => {
  render(<SeedPhraseInput {...defaultProps} />);
  const inputs = screen.getAllByRole("textbox");
  await userEvent.type(inputs[0], "ab");
  expect(screen.getByText("abandon")).toBeInTheDocument();
  await userEvent.clear(inputs[0]);
  expect(screen.queryByText("abandon")).not.toBeInTheDocument();
});

test("fills field and closes dropdown when suggestion is clicked", async () => {
  const onWordsChange = jest.fn();
  render(<SeedPhraseInput words={Array(12).fill("")} onWordsChange={onWordsChange} />);
  const inputs = screen.getAllByRole("textbox");
  await userEvent.type(inputs[0], "ab");
  await userEvent.click(screen.getByText("abandon"));
  const lastCall = onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
  expect(lastCall[0]).toBe("abandon");
  // Dropdown should close
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

test("limits visible suggestions to 8", async () => {
  render(<SeedPhraseInput {...defaultProps} />);
  const inputs = screen.getAllByRole("textbox");
  // "a" matches many BIP39 words — should cap at 8
  await userEvent.type(inputs[0], "a");
  const listbox = screen.getByRole("listbox");
  const items = listbox.querySelectorAll("li");
  expect(items.length).toBeLessThanOrEqual(8);
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: FAIL — no autocomplete UI exists yet

**Step 3: Implement autocomplete**

Add state tracking for the active field index. When a field has focus and non-empty text, filter `BIP39_ENGLISH_WORDLIST` by prefix and render a positioned `<ul role="listbox">` below the active input. Cap at 8 suggestions. Clicking a suggestion calls `onWordsChange` with the selected word at the active index and closes the dropdown.

Key implementation details:

- `activeIndex: number | null` state — which field is focused
- `useRef` on each input cell's container for positioning the dropdown
- Filter: `BIP39_ENGLISH_WORDLIST.filter(w => w.startsWith(input.toLowerCase()))`
- Dropdown: absolutely positioned `<ul>` with `role="listbox"`, `<li>` items
- On suggestion click: update words array, clear activeIndex
- On input blur: close dropdown (with a small delay to allow click to register)
- Each cell wrapper needs `position: relative` for dropdown positioning

```typescript
import { useCallback, useRef, useState } from "react";
import { SeedPhraseInputProps } from "./SeedPhraseInput.types";
import { BIP39_ENGLISH_WORDLIST } from "../../data/bip39-english";

const MAX_SUGGESTIONS = 8;

export function SeedPhraseInput({
  words,
  onWordsChange,
  wordCount = 12,
  readOnly = false,
  onComplete,
  columns = 2,
  className,
  style,
}: SeedPhraseInputProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleWordChange = useCallback(
    (index: number, value: string) => {
      const newWords = [...words];
      newWords[index] = value;
      onWordsChange(newWords);
    },
    [words, onWordsChange],
  );

  const handleSelect = useCallback(
    (index: number, word: string) => {
      const newWords = [...words];
      newWords[index] = word;
      onWordsChange(newWords);
      setActiveIndex(null);

      // Auto-focus next empty field
      const nextEmpty = newWords.findIndex((w, i) => i > index && w === "");
      if (nextEmpty !== -1) {
        inputRefs.current[nextEmpty]?.focus();
      }
    },
    [words, onWordsChange],
  );

  const getSuggestions = (value: string): string[] => {
    if (!value) return [];
    const lower = value.toLowerCase();
    return BIP39_ENGLISH_WORDLIST.filter((w) => w.startsWith(lower)).slice(0, MAX_SUGGESTIONS);
  };

  return (
    <div
      data-testid="seed-phrase-input"
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
        ...style,
      }}
    >
      {Array.from({ length: wordCount }, (_, i) => {
        const suggestions = activeIndex === i ? getSuggestions(words[i] ?? "") : [];

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
            <span style={{ minWidth: "2em", textAlign: "right", fontSize: "0.85em", color: "#999", userSelect: "none" }}>
              {i + 1}.
            </span>
            {readOnly ? (
              <span style={{
                flex: 1,
                fontFamily: "inherit",
                fontSize: "inherit",
                padding: "4px 0",
                borderBottom: "1px solid #ddd",
                minWidth: 0,
              }}>
                {words[i] ?? ""}
              </span>
            ) : (
              <>
                <input
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  value={words[i] ?? ""}
                  onChange={(e) => handleWordChange(i, e.target.value)}
                  onFocus={() => {
                    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
                    setActiveIndex(i);
                  }}
                  onBlur={() => {
                    blurTimeoutRef.current = setTimeout(() => setActiveIndex(null), 150);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && suggestions.length > 0) {
                      e.preventDefault();
                      handleSelect(i, suggestions[0]);
                    }
                  }}
                  autoComplete="off"
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    padding: "4px 0",
                    borderBottom: "1px solid #ddd",
                    minWidth: 0,
                  }}
                />
                {suggestions.length > 0 && (
                  <ul
                    role="listbox"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "2em",
                      right: 0,
                      zIndex: 10,
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: 4,
                      maxHeight: 200,
                      overflowY: "auto",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    {suggestions.map((word) => (
                      <li
                        key={word}
                        role="option"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSelect(i, word)}
                        style={{
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "0.9em",
                        }}
                      >
                        {word}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: All tests PASS

**Step 5: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.tsx src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "feat: SeedPhraseInput autocomplete dropdown with BIP39 wordlist"
```

---

### Task 8: TDD — Focus management (auto-advance on selection)

**Files:**

- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`

**Step 1: Write the failing tests**

```typescript
test("auto-focuses next empty field after selecting a suggestion", async () => {
  const onWordsChange = jest.fn();
  const words = Array(12).fill("");
  render(<SeedPhraseInput words={words} onWordsChange={onWordsChange} />);
  const inputs = screen.getAllByRole("textbox");
  await userEvent.type(inputs[0], "ab");
  await userEvent.click(screen.getByText("abandon"));
  // Focus should move to input at index 1
  expect(inputs[1]).toHaveFocus();
});

test("Enter key selects first suggestion and advances focus", async () => {
  const onWordsChange = jest.fn();
  render(<SeedPhraseInput words={Array(12).fill("")} onWordsChange={onWordsChange} />);
  const inputs = screen.getAllByRole("textbox");
  await userEvent.type(inputs[0], "aban");
  await userEvent.keyboard("{Enter}");
  const lastCall = onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
  expect(lastCall[0]).toBe("abandon");
});
```

**Step 2: Run test to verify**

These should pass with the Task 7 implementation since `handleSelect` already auto-focuses next empty field and Enter key handling is implemented.

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: All tests PASS

**Step 3: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "test: SeedPhraseInput focus management and Enter key selection"
```

---

### Task 9: TDD — onComplete callback

**Files:**

- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`
- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.tsx`

**Step 1: Write the failing tests**

```typescript
test("calls onComplete when all words are valid BIP39 words", () => {
  const onComplete = jest.fn();
  const validWords = [
    "abandon", "ability", "able", "about", "above", "absent",
    "absorb", "abstract", "absurd", "abuse", "access", "accident",
  ];
  render(
    <SeedPhraseInput
      words={validWords}
      onWordsChange={jest.fn()}
      onComplete={onComplete}
    />,
  );
  expect(onComplete).toHaveBeenCalledWith(validWords);
});

test("does not call onComplete when some words are invalid", () => {
  const onComplete = jest.fn();
  const words = [
    "abandon", "ability", "notaword", "about", "above", "absent",
    "absorb", "abstract", "absurd", "abuse", "access", "accident",
  ];
  render(
    <SeedPhraseInput
      words={words}
      onWordsChange={jest.fn()}
      onComplete={onComplete}
    />,
  );
  expect(onComplete).not.toHaveBeenCalled();
});

test("does not call onComplete when some words are empty", () => {
  const onComplete = jest.fn();
  const words = ["abandon", "ability", "", ...Array(9).fill("")];
  render(
    <SeedPhraseInput
      words={words}
      onWordsChange={jest.fn()}
      onComplete={onComplete}
    />,
  );
  expect(onComplete).not.toHaveBeenCalled();
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: FAIL — onComplete is never called

**Step 3: Add onComplete effect**

Add a `useEffect` to the component that checks if all `wordCount` words are present in `BIP39_ENGLISH_WORDLIST` and calls `onComplete` if so:

```typescript
import { useCallback, useEffect, useRef, useState } from "react";

// Inside the component, before the return:
useEffect(() => {
  if (!onComplete) return;
  const relevantWords = words.slice(0, wordCount);
  if (relevantWords.length < wordCount) return;
  const allValid = relevantWords.every((w) => w !== "" && BIP39_ENGLISH_WORDLIST.includes(w));
  if (allValid) {
    onComplete(relevantWords);
  }
}, [words, wordCount, onComplete]);
```

Note: For 2048 words, `Array.includes` is fine — no need for a Set since this runs infrequently (only on words change).

**Step 4: Run test to verify it passes**

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: All tests PASS

**Step 5: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.tsx src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "feat: SeedPhraseInput onComplete fires when all words are valid BIP39"
```

---

### Task 10: TDD — className and style props

**Files:**

- Modify: `src/components/SeedPhraseInput/SeedPhraseInput.test.tsx`

**Step 1: Write the tests**

```typescript
test("applies className to root element", () => {
  render(<SeedPhraseInput {...defaultProps} className="custom-seed" />);
  expect(screen.getByTestId("seed-phrase-input")).toHaveClass("custom-seed");
});

test("applies style to root element", () => {
  render(<SeedPhraseInput {...defaultProps} style={{ maxWidth: 400 }} />);
  expect(screen.getByTestId("seed-phrase-input")).toHaveStyle({ maxWidth: "400px" });
});
```

**Step 2: Run test to verify they pass**

These should pass already since className and style are wired up from Task 3.

Run: `npx jest src/components/SeedPhraseInput/SeedPhraseInput.test.tsx --no-coverage`
Expected: All tests PASS

**Step 3: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.test.tsx
git commit -m "test: SeedPhraseInput className and style props"
```

---

### Task 11: Wire barrel exports

**Files:**

- Modify: `src/components/index.ts`
- Modify: `src/index.ts`

**Step 1: Add to components barrel**

In `src/components/index.ts`, add:

```typescript
export { SeedPhraseInput } from "./SeedPhraseInput";
export type { SeedPhraseInputProps } from "./SeedPhraseInput";
```

**Step 2: Add to root barrel**

In `src/index.ts`, add `SeedPhraseInput` and `SeedPhraseInputProps` to the existing exports, plus export the BIP39 wordlist:

```typescript
// Add to the component exports:
SeedPhraseInput,
// Add to the type exports:
SeedPhraseInputProps,

// Add new line:
export { BIP39_ENGLISH_WORDLIST } from "./data/bip39-english";
```

**Step 3: Verify build**

Run: `npx tsup`
Expected: Build succeeds with no errors

**Step 4: Commit**

```
git add src/components/index.ts src/index.ts
git commit -m "feat: export SeedPhraseInput and BIP39 wordlist from package"
```

---

### Task 12: Storybook stories

**Files:**

- Create: `src/components/SeedPhraseInput/SeedPhraseInput.stories.tsx`

**Step 1: Write all stories**

```typescript
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SeedPhraseInput } from "./SeedPhraseInput";

const meta: Meta<typeof SeedPhraseInput> = {
  title: "Components/SeedPhraseInput",
  component: SeedPhraseInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    wordCount: { control: "select", options: [12, 24] },
    columns: { control: "select", options: [2, 3, 4] },
    readOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SeedPhraseInput>;

const SAMPLE_12 = [
  "abandon", "ability", "able", "about", "above", "absent",
  "absorb", "abstract", "absurd", "abuse", "access", "accident",
];

const SAMPLE_24 = [
  "abandon", "ability", "able", "about", "above", "absent",
  "absorb", "abstract", "absurd", "abuse", "access", "accident",
  "account", "accuse", "achieve", "acid", "acoustic", "acquire",
  "across", "act", "action", "actor", "actress", "actual",
];

/** Empty 12-word grid — default state */
export const Empty12: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} />;
  },
};

/** Empty 24-word grid */
export const Empty24: Story = {
  render: () => {
    const [words, setWords] = useState(Array(24).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} wordCount={24} />;
  },
};

/** Some words entered, showing mixed state */
export const PartiallyFilled: Story = {
  render: () => {
    const [words, setWords] = useState([
      "abandon", "ability", "able", "", "", "",
      "", "", "", "", "", "",
    ]);
    return <SeedPhraseInput words={words} onWordsChange={setWords} />;
  },
};

/** All 12 words filled with valid BIP39 words */
export const Complete: Story = {
  render: () => {
    const [words, setWords] = useState(SAMPLE_12);
    const [completed, setCompleted] = useState(false);
    return (
      <div>
        <SeedPhraseInput
          words={words}
          onWordsChange={(w) => { setWords(w); setCompleted(false); }}
          onComplete={() => setCompleted(true)}
        />
        {completed && (
          <p style={{ color: "#22c55e", marginTop: 12, fontWeight: 500 }}>
            All words valid!
          </p>
        )}
      </div>
    );
  },
};

/** Read-only display mode for backup verification */
export const ReadOnly: Story = {
  render: () => (
    <SeedPhraseInput words={SAMPLE_12} onWordsChange={() => {}} readOnly />
  ),
};

/** 24-word read-only display */
export const ReadOnly24: Story = {
  render: () => (
    <SeedPhraseInput
      words={SAMPLE_24}
      onWordsChange={() => {}}
      wordCount={24}
      readOnly
    />
  ),
};

/** 3-column grid layout */
export const ThreeColumns: Story = {
  render: () => {
    const [words, setWords] = useState(SAMPLE_12);
    return <SeedPhraseInput words={words} onWordsChange={setWords} columns={3} />;
  },
};

/** 4-column grid layout */
export const FourColumns: Story = {
  render: () => {
    const [words, setWords] = useState(SAMPLE_24);
    return (
      <SeedPhraseInput
        words={words}
        onWordsChange={setWords}
        wordCount={24}
        columns={4}
      />
    );
  },
};

/** Interactive story demonstrating autocomplete — type to see suggestions */
export const WithAutocomplete: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return (
      <div>
        <p style={{ color: "#666", marginBottom: 12, fontSize: 13 }}>
          Start typing in any field to see BIP39 autocomplete suggestions.
        </p>
        <SeedPhraseInput words={words} onWordsChange={setWords} />
      </div>
    );
  },
};

/** Full interactive story with onComplete indicator */
export const Interactive: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    const [completed, setCompleted] = useState(false);
    const filledCount = words.filter((w: string) => w !== "").length;
    return (
      <div>
        <SeedPhraseInput
          words={words}
          onWordsChange={(w) => { setWords(w); setCompleted(false); }}
          onComplete={() => setCompleted(true)}
        />
        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          {filledCount}/12 words entered
          {completed && <span style={{ color: "#22c55e", marginLeft: 8 }}>Complete!</span>}
        </div>
      </div>
    );
  },
};

/** Dark theme with custom styling */
export const DarkTheme: Story = {
  render: () => {
    const [words, setWords] = useState(SAMPLE_12);
    return (
      <div style={{
        background: "#1a1a2e",
        padding: 24,
        borderRadius: 8,
        color: "#e0e0e0",
      }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 500 }}>
          Recovery Phrase
        </h3>
        <SeedPhraseInput
          words={words}
          onWordsChange={setWords}
          readOnly
          style={{ color: "#e0e0e0" }}
        />
      </div>
    );
  },
};

/** Realistic context: seed input inside a wallet recovery form */
export const InAForm: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    const [isComplete, setIsComplete] = useState(false);
    return (
      <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 480 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20 }}>Restore Wallet</h2>
        <p style={{ margin: "0 0 16px", color: "#666", fontSize: 14 }}>
          Enter your 12-word recovery phrase to restore your wallet.
        </p>
        <SeedPhraseInput
          words={words}
          onWordsChange={(w) => { setWords(w); setIsComplete(false); }}
          onComplete={() => setIsComplete(true)}
        />
        <button
          type="submit"
          disabled={!isComplete}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "10px 16px",
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            background: isComplete ? "#f7931a" : "#ccc",
            border: "none",
            borderRadius: 6,
            cursor: isComplete ? "pointer" : "not-allowed",
          }}
        >
          Restore
        </button>
      </form>
    );
  },
};

/** 12-word and 24-word grids shown side by side */
export const SideBySide: Story = {
  render: () => {
    const [words12, setWords12] = useState(SAMPLE_12);
    const [words24, setWords24] = useState(SAMPLE_24);
    return (
      <div style={{ display: "flex", gap: 32, maxWidth: 800 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#666" }}>12 words</h3>
          <SeedPhraseInput words={words12} onWordsChange={setWords12} readOnly />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#666" }}>24 words</h3>
          <SeedPhraseInput words={words24} onWordsChange={setWords24} wordCount={24} readOnly />
        </div>
      </div>
    );
  },
};
```

**Step 2: Verify Storybook compiles**

Run: `npx storybook build --quiet 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```
git add src/components/SeedPhraseInput/SeedPhraseInput.stories.tsx
git commit -m "feat: SeedPhraseInput Storybook stories"
```

---

### Task 13: Final verification

**Step 1: Run all tests**

Run: `npx jest --no-coverage`
Expected: All tests PASS (existing + new SeedPhraseInput tests)

**Step 2: Run build**

Run: `npx tsup`
Expected: Build succeeds, dist/ updated

**Step 3: Run Storybook build**

Run: `npx storybook build --quiet`
Expected: Build succeeds

**Step 4: Commit any remaining changes**

If anything was missed, commit it now.

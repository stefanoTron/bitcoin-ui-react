import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    const inputs = screen.getAllByRole("combobox");
    expect(inputs).toHaveLength(12);
  });

  test("renders numbered labels Word 1 through Word 12", () => {
    render(<SeedPhraseInput {...defaultProps} />);
    for (let i = 1; i <= 12; i++) {
      expect(screen.getByText(`Word ${i}`)).toBeInTheDocument();
    }
  });

  test("has root element with data-testid seed-phrase-input", () => {
    render(<SeedPhraseInput {...defaultProps} />);
    expect(screen.getByTestId("seed-phrase-input")).toBeInTheDocument();
  });

  test("calls onWordsChange with updated array when user types", async () => {
    let currentWords = Array(12).fill("");
    const onWordsChange = jest.fn((newWords: string[]) => {
      currentWords = newWords;
    });
    const { rerender } = render(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const inputs = screen.getAllByRole("combobox");
    for (const char of "abandon") {
      rerender(
        <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
      );
      await userEvent.type(inputs[0], char);
    }
    const lastCall =
      onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
    expect(lastCall[0]).toBe("abandon");
  });

  test("displays pre-filled words", () => {
    const words = ["abandon", "ability", "able", ...Array(9).fill("")];
    render(<SeedPhraseInput words={words} onWordsChange={jest.fn()} />);
    const inputs = screen.getAllByRole("combobox") as HTMLInputElement[];
    expect(inputs[0].value).toBe("abandon");
    expect(inputs[1].value).toBe("ability");
    expect(inputs[2].value).toBe("able");
  });

  test("renders 24 input fields when wordCount is 24", () => {
    render(
      <SeedPhraseInput
        words={Array(24).fill("")}
        onWordsChange={jest.fn()}
        wordCount={24}
      />,
    );
    const inputs = screen.getAllByRole("combobox");
    expect(inputs).toHaveLength(24);
  });

  test("renders numbered labels up to Word 24", () => {
    render(
      <SeedPhraseInput
        words={Array(24).fill("")}
        onWordsChange={jest.fn()}
        wordCount={24}
      />,
    );
    for (let i = 1; i <= 24; i++) {
      expect(screen.getByText(`Word ${i}`)).toBeInTheDocument();
    }
  });

  test("applies columns prop to grid layout", () => {
    render(
      <SeedPhraseInput {...defaultProps} columns={3} />,
    );
    const root = screen.getByTestId("seed-phrase-input");
    expect(root.style.gridTemplateRows).toBe("repeat(4, auto)");
    expect(root.style.gridAutoFlow).toBe("column");
  });

  test("renders spans instead of inputs in readOnly mode", () => {
    const words = [
      "abandon", "ability", "able", "about", "above", "absent",
      "absorb", "abstract", "absurd", "abuse", "access", "accident",
    ];
    render(
      <SeedPhraseInput
        words={words}
        onWordsChange={jest.fn()}
        readOnly
      />,
    );
    const inputs = screen.queryAllByRole("combobox");
    expect(inputs).toHaveLength(0);
    expect(screen.getByText("abandon")).toBeInTheDocument();
  });

  test("does not call onWordsChange in readOnly mode", () => {
    const onWordsChange = jest.fn();
    const words = [
      "abandon", "ability", "able", "about", "above", "absent",
      "absorb", "abstract", "absurd", "abuse", "access", "accident",
    ];
    render(
      <SeedPhraseInput
        words={words}
        onWordsChange={onWordsChange}
        readOnly
      />,
    );
    // No inputs to interact with; onWordsChange should never be called
    expect(onWordsChange).not.toHaveBeenCalled();
  });

  test("shows autocomplete suggestions when typing ab", async () => {
    let currentWords = Array(12).fill("");
    const onWordsChange = jest.fn((newWords: string[]) => {
      currentWords = newWords;
    });
    const { rerender } = render(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const inputs = screen.getAllByRole("combobox");
    for (const char of "ab") {
      rerender(
        <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
      );
      await userEvent.type(inputs[0], char);
    }
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    const optionTexts = options.map((o) => o.textContent);
    expect(optionTexts).toEqual([
      "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
    ]);
  });

  test("hides autocomplete when input is cleared", async () => {
    let currentWords = Array(12).fill("");
    const onWordsChange = jest.fn((newWords: string[]) => {
      currentWords = newWords;
    });
    const { rerender } = render(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const inputs = screen.getAllByRole("combobox");
    // Type "ab" to trigger suggestions
    for (const char of "ab") {
      rerender(
        <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
      );
      await userEvent.type(inputs[0], char);
    }
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    // Clear the input
    await userEvent.clear(inputs[0]);
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  test("fills field and closes dropdown when suggestion is clicked", async () => {
    let currentWords = Array(12).fill("");
    const onWordsChange = jest.fn((newWords: string[]) => {
      currentWords = newWords;
    });
    const { rerender } = render(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const inputs = screen.getAllByRole("combobox");
    // Type "ab" to trigger suggestions
    for (const char of "ab") {
      rerender(
        <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
      );
      await userEvent.type(inputs[0], char);
    }
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    // Click the first suggestion ("abandon")
    const options = screen.getAllByRole("option");
    await userEvent.click(options[0]);
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    // Verify onWordsChange was called with "abandon"
    const lastCall =
      onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
    expect(lastCall[0]).toBe("abandon");
    // Dropdown should be closed
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  test("limits visible suggestions to 8 items max", async () => {
    let currentWords = Array(12).fill("");
    const onWordsChange = jest.fn((newWords: string[]) => {
      currentWords = newWords;
    });
    const { rerender } = render(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const inputs = screen.getAllByRole("combobox");
    // Type "a" which matches many words
    await userEvent.type(inputs[0], "a");
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const options = screen.getAllByRole("option");
    expect(options.length).toBeLessThanOrEqual(8);
  });

  test("auto-focuses next empty field after selecting a suggestion", async () => {
    let currentWords = Array(12).fill("");
    const onWordsChange = jest.fn((newWords: string[]) => {
      currentWords = newWords;
    });
    const { rerender } = render(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const inputs = screen.getAllByRole("combobox");
    // Type "ab" in field 0
    for (const char of "ab") {
      rerender(
        <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
      );
      await userEvent.type(inputs[0], char);
    }
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    // Click "abandon"
    const options = screen.getAllByRole("option");
    await userEvent.click(options[0]);
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    // Field 1 should now have focus
    expect(inputs[1]).toHaveFocus();
  });

  test("Enter key selects first suggestion and advances focus", async () => {
    let currentWords = Array(12).fill("");
    const onWordsChange = jest.fn((newWords: string[]) => {
      currentWords = newWords;
    });
    const { rerender } = render(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const inputs = screen.getAllByRole("combobox");
    // Type "ab" in field 0
    for (const char of "ab") {
      rerender(
        <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
      );
      await userEvent.type(inputs[0], char);
    }
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    // Press Enter to select first suggestion
    await userEvent.keyboard("{Enter}");
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    // Verify "abandon" was selected
    const lastCall =
      onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
    expect(lastCall[0]).toBe("abandon");
    // Field 1 should have focus
    expect(inputs[1]).toHaveFocus();
  });

  test("calls onComplete when all 12 words are valid BIP39 words", () => {
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
    const invalidWords = [
      "abandon", "ability", "able", "about", "above", "absent",
      "absorb", "abstract", "absurd", "abuse", "access", "notaword",
    ];
    render(
      <SeedPhraseInput
        words={invalidWords}
        onWordsChange={jest.fn()}
        onComplete={onComplete}
      />,
    );
    expect(onComplete).not.toHaveBeenCalled();
  });

  test("does not call onComplete when some words are empty", () => {
    const onComplete = jest.fn();
    const partialWords = [
      "abandon", "ability", "able", "about", "above", "absent",
      "absorb", "abstract", "absurd", "abuse", "access", "",
    ];
    render(
      <SeedPhraseInput
        words={partialWords}
        onWordsChange={jest.fn()}
        onComplete={onComplete}
      />,
    );
    expect(onComplete).not.toHaveBeenCalled();
  });

  test("applies className to root element", () => {
    render(
      <SeedPhraseInput {...defaultProps} className="my-seed-phrase" />,
    );
    const root = screen.getByTestId("seed-phrase-input");
    expect(root).toHaveClass("my-seed-phrase");
  });

  test("applies style to root element", () => {
    render(
      <SeedPhraseInput {...defaultProps} style={{ maxWidth: 400 }} />,
    );
    const root = screen.getByTestId("seed-phrase-input");
    expect(root.style.maxWidth).toBe("400px");
  });

  test("calls onComplete when all 24 words are valid BIP39 words", () => {
    const onComplete = jest.fn();
    const validWords = [
      "abandon", "ability", "able", "about", "above", "absent",
      "absorb", "abstract", "absurd", "abuse", "access", "accident",
      "account", "accuse", "achieve", "acid", "acoustic", "acquire",
      "across", "act", "action", "actor", "actress", "actual",
    ];
    render(
      <SeedPhraseInput
        words={validWords}
        onWordsChange={jest.fn()}
        wordCount={24}
        onComplete={onComplete}
      />,
    );
    expect(onComplete).toHaveBeenCalledWith(validWords);
  });

  test("does not fire onComplete again on re-render with same valid words", () => {
    const onComplete = jest.fn();
    const validWords = [
      "abandon", "ability", "able", "about", "above", "absent",
      "absorb", "abstract", "absurd", "abuse", "access", "accident",
    ];
    const { rerender } = render(
      <SeedPhraseInput
        words={validWords}
        onWordsChange={jest.fn()}
        onComplete={onComplete}
      />,
    );
    expect(onComplete).toHaveBeenCalledTimes(1);
    rerender(
      <SeedPhraseInput
        words={[...validWords]}
        onWordsChange={jest.fn()}
        onComplete={onComplete}
      />,
    );
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  // New a11y tests

  test("has group role with default aria-label", () => {
    render(<SeedPhraseInput words={Array(12).fill("")} onWordsChange={() => {}} />);
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-label", "Seed phrase");
  });

  test("supports custom groupLabel", () => {
    render(<SeedPhraseInput words={Array(12).fill("")} onWordsChange={() => {}} groupLabel="Recovery words" />);
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Recovery words");
  });

  test("input has combobox role with aria-expanded", () => {
    render(<SeedPhraseInput words={["ab", ...Array(11).fill("")]} onWordsChange={() => {}} />);
    const input = screen.getByLabelText("Word 1");
    expect(input).toHaveAttribute("role", "combobox");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  test("navigates suggestions with ArrowDown and selects with Enter", async () => {
    const onWordsChange = jest.fn();
    render(<SeedPhraseInput words={["ab", ...Array(11).fill("")]} onWordsChange={onWordsChange} />);
    const input = screen.getByLabelText("Word 1");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    // Should select the second suggestion (abandon is first, then ability...)
    expect(onWordsChange).toHaveBeenCalled();
    const lastCall = onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
    expect(lastCall[0]).toBe("ability");
  });

  test("closes suggestions with Escape", async () => {
    render(<SeedPhraseInput words={["ab", ...Array(11).fill("")]} onWordsChange={() => {}} />);
    const input = screen.getByLabelText("Word 1");
    await userEvent.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{Escape}");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  test("accepts custom wordlist", () => {
    const customList = ["alpha", "beta", "gamma"];
    const onComplete = jest.fn();
    render(
      <SeedPhraseInput
        words={["alpha", "beta", "gamma", ...Array(9).fill("")]}
        onWordsChange={() => {}}
        wordlist={customList}
        wordCount={12}
        onComplete={onComplete}
      />,
    );
    // Should NOT fire onComplete since only 3 of 12 are filled
    expect(onComplete).not.toHaveBeenCalled();
  });

  test("supports custom labelFormatter for localization", () => {
    const formatter = (i: number) => `Palabra ${i}`;
    render(<SeedPhraseInput words={Array(12).fill("")} onWordsChange={() => {}} labelFormatter={formatter} />);
    expect(screen.getByText("Palabra 1")).toBeInTheDocument();
    expect(screen.getByText("Palabra 12")).toBeInTheDocument();
    expect(screen.queryByText("Word 1")).not.toBeInTheDocument();
  });

  test("navigates suggestions with ArrowUp (wraps to last)", async () => {
    const onWordsChange = jest.fn();
    render(<SeedPhraseInput words={["ab", ...Array(11).fill("")]} onWordsChange={onWordsChange} />);
    const input = screen.getByLabelText("Word 1");
    await userEvent.click(input);
    // ArrowUp from -1 should wrap to last suggestion
    await userEvent.keyboard("{ArrowUp}");
    // Now press Enter to select the last suggestion
    await userEvent.keyboard("{Enter}");
    const lastCall = onWordsChange.mock.calls[onWordsChange.mock.calls.length - 1][0];
    // "ab" matches: abandon, ability, able, about, above, absent, absorb, abstract (8 items)
    // ArrowUp from -1 wraps to index 7 = "abstract"
    expect(lastCall[0]).toBe("abstract");
  });

  test("closes suggestions on blur after delay", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SeedPhraseInput words={["ab", ...Array(11).fill("")]} onWordsChange={() => {}} />);
    const input = screen.getByLabelText("Word 1");
    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    // Trigger blur
    input.blur();
    // Suggestions should still be visible during BLUR_DELAY_MS
    expect(input).toHaveAttribute("aria-expanded", "true");
    // Advance past the blur delay (150ms)
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(input).toHaveAttribute("aria-expanded", "false");
    jest.useRealTimers();
  });
});

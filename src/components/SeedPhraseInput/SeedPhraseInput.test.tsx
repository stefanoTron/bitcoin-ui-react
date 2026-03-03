import { render, screen } from "@testing-library/react";
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
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(12);
  });

  test("renders numbered labels 1 through 12", () => {
    render(<SeedPhraseInput {...defaultProps} />);
    for (let i = 1; i <= 12; i++) {
      expect(screen.getByText(`${i}.`)).toBeInTheDocument();
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
    const inputs = screen.getAllByRole("textbox");
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
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
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
    for (let i = 1; i <= 24; i++) {
      expect(screen.getByText(`${i}.`)).toBeInTheDocument();
    }
  });

  test("applies columns prop to grid layout", () => {
    render(
      <SeedPhraseInput {...defaultProps} columns={3} />,
    );
    const root = screen.getByTestId("seed-phrase-input");
    expect(root.style.gridTemplateColumns).toBe("repeat(3, 1fr)");
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
    const inputs = screen.queryAllByRole("textbox");
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
    const inputs = screen.getAllByRole("textbox");
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
    const inputs = screen.getAllByRole("textbox");
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
    const inputs = screen.getAllByRole("textbox");
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
    const inputs = screen.getAllByRole("textbox");
    // Type "a" which matches many words
    await userEvent.type(inputs[0], "a");
    rerender(
      <SeedPhraseInput words={currentWords} onWordsChange={onWordsChange} />,
    );
    const options = screen.getAllByRole("option");
    expect(options.length).toBeLessThanOrEqual(8);
  });
});

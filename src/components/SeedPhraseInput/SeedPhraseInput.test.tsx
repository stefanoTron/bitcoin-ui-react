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
});

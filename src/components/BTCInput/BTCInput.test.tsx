import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BTCInput } from "./BTCInput";

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

  test("displays formatted amount for 1000 sats", () => {
    render(<BTCInput {...defaultProps} amount={1000} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // 1000 sats = 0.00 001 000 (with thin space separators)
    expect(input.value).toContain("0");
    expect(input.value).toContain("001");
    expect(input.value).toContain("000");
    expect(input.value.replace(/\s/g, "")).toBe("0.00001000");
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
    await userEvent.type(input, "abc123");
    // Controlled input: each keystroke calls onAmountChange independently
    // Non-digit chars ("a","b","c") produce 0, digit chars produce their numeric value
    expect(onAmountChange).toHaveBeenCalled();
    const allValues = onAmountChange.mock.calls.map((c: [number]) => c[0]);
    // Every value must be a non-negative number (non-digits stripped)
    allValues.forEach((v: number) => {
      expect(typeof v).toBe("number");
      expect(v).toBeGreaterThanOrEqual(0);
    });
  });

  test("disables input when disabled prop is true", () => {
    render(<BTCInput {...defaultProps} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("clamps amount to max supply (2.1 quadrillion sats)", () => {
    const onAmountChange = jest.fn();
    render(
      <BTCInput
        amount={2_100_000_000_000_001}
        onAmountChange={onAmountChange}
      />,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // Should display max supply value, not the over-limit value
    const digitsOnly = input.value.replace(/\D/g, "");
    expect(parseInt(digitsOnly, 10)).toBeLessThanOrEqual(2_100_000_000_000_000);
  });

  test("applies className", () => {
    render(<BTCInput {...defaultProps} className="custom-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input");
  });

  test("renders placeholder when amount is 0", () => {
    render(<BTCInput {...defaultProps} placeholder="Enter amount" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toHaveAttribute("placeholder", "Enter amount");
  });

  test("has aria-label", () => {
    render(<BTCInput amount={0} onAmountChange={() => {}} />);
    const input = screen.getByLabelText("Amount in BTC");
    expect(input).toBeInTheDocument();
  });

  test("supports custom ariaLabel", () => {
    render(<BTCInput amount={0} onAmountChange={() => {}} ariaLabel="Monto en BTC" />);
    expect(screen.getByLabelText("Monto en BTC")).toBeInTheDocument();
  });
});

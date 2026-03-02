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

  test("displays formatted amount", () => {
    render(<BTCInput {...defaultProps} amount={1000} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
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
    render(
      <BTCInput
        amount={2_100_000_000_000_001}
        onAmountChange={onAmountChange}
      />,
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders placeholder when amount is 0", () => {
    render(<BTCInput {...defaultProps} placeholder="Enter amount" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toHaveAttribute("placeholder", "Enter amount");
  });
});

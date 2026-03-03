import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TransactionAmount } from "./TransactionAmount";

// Mock motion hooks (inherited via BTCAmount)
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
    expect(el.textContent).toContain("\u2212");
  });

  test("renders zero amount with no sign", () => {
    render(<TransactionAmount amount={0} />);
    const el = screen.getByTestId("transaction-amount");
    expect(el.textContent).not.toMatch(/[+\u2212]/);
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
    // Should contain the formatted BTCAmount digits for 50000 sats
    expect(el.textContent).toMatch(/0[.]00.050.000/);
  });

  test("applies className and style", () => {
    render(<TransactionAmount amount={100} className="tx" style={{ fontSize: 20 }} />);
    const el = screen.getByTestId("transaction-amount");
    expect(el).toHaveClass("tx");
    expect(el).toHaveStyle({ fontSize: "20px" });
  });
});

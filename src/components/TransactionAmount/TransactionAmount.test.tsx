import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TransactionAmount } from "./TransactionAmount";

jest.mock("motion/react");

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

  test("has aria-label with direction for positive amount", () => {
    render(<TransactionAmount amount={50_000_000} />);
    expect(screen.getByLabelText("Received 0.50000000 BTC")).toBeInTheDocument();
  });

  test("has aria-label with direction for negative amount", () => {
    render(<TransactionAmount amount={-50_000_000} />);
    expect(screen.getByLabelText("Sent 0.50000000 BTC")).toBeInTheDocument();
  });

  test("supports custom ariaLabel", () => {
    render(<TransactionAmount amount={50_000_000} ariaLabel="Recibido 0.5 BTC" />);
    expect(screen.getByLabelText("Recibido 0.5 BTC")).toBeInTheDocument();
  });
});

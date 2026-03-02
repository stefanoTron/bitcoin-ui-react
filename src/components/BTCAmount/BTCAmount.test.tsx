import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BTCAmount } from "./BTCAmount";

// Mock motion to avoid animation complexity in tests
jest.mock("motion/react", () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("BTCAmount", () => {
  test("renders 0 satoshis as 0.00 000 000", () => {
    render(<BTCAmount amount={0} />);
    const container = screen.getByTestId("btc-amount");
    const text = container.textContent;
    expect(text).toMatch(/0[.]00.000.000/);
  });

  test("renders 1 satoshi as 0.00 000 001", () => {
    render(<BTCAmount amount={1} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.000.001/);
  });

  test("renders 1000 satoshis as 0.00 001 000", () => {
    render(<BTCAmount amount={1000} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.001.000/);
  });

  test("renders 100,000,000 satoshis (1 BTC) as 1.00 000 000", () => {
    render(<BTCAmount amount={100_000_000} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/1[.]00.000.000/);
  });

  test("renders 2,100,000,000,000,000 satoshis (21M BTC) correctly", () => {
    render(<BTCAmount amount={2_100_000_000_000_000} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/21000000[.]00.000.000/);
  });

  test("renders 12,537,829 satoshis correctly", () => {
    render(<BTCAmount amount={12_537_829} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]12.537.829/);
  });

  test("applies active color to significant digits", () => {
    render(<BTCAmount amount={1000} activeColor="red" inactiveColor="gray" />);
    const container = screen.getByTestId("btc-amount");
    const spans = container.querySelectorAll("span[data-digit]");
    const activeSpans = Array.from(spans).filter(
      (s) => (s as HTMLElement).style.color === "red"
    );
    expect(activeSpans.length).toBeGreaterThan(0);
  });

  test("treats NaN as 0", () => {
    render(<BTCAmount amount={NaN} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.000.000/);
  });

  test("treats negative values as 0", () => {
    render(<BTCAmount amount={-100} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/0[.]00.000.000/);
  });

  test("applies custom btcSeparator", () => {
    render(<BTCAmount amount={100_000_000} btcSeparator="," />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toContain(",");
  });

  test("applies fontFamily style", () => {
    render(<BTCAmount amount={0} fontFamily="monospace" />);
    const container = screen.getByTestId("btc-amount");
    expect(container).toHaveStyle({ fontFamily: "monospace" });
  });

  test("renders correctly with animate={false}", () => {
    render(<BTCAmount amount={100_000_000} animate={false} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/1[.]00.000.000/);
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BTCAmount } from "./BTCAmount";

// Mock motion hooks to avoid animation complexity in tests
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

// Mock icons to simple spans for testability
jest.mock("../../icons/BitcoinIcon/BitcoinIcon", () => ({
  BitcoinIcon: (props: any) => <span data-testid="bitcoin-icon" data-size={props.size} />,
}));
jest.mock("../../icons/SatsIcon/SatsIcon", () => ({
  SatsIcon: (props: any) => <span data-testid="sats-icon" data-size={props.size} />,
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

  test("renders correctly with animate={false}", () => {
    render(<BTCAmount amount={100_000_000} animate={false} />);
    const container = screen.getByTestId("btc-amount");
    expect(container.textContent).toMatch(/1[.]00.000.000/);
  });

  test("renders bitcoin icon when symbol='btc'", () => {
    render(<BTCAmount amount={100_000_000} symbol="btc" />);
    expect(screen.getByTestId("bitcoin-icon")).toBeInTheDocument();
    expect(screen.getByTestId("bitcoin-icon")).toHaveAttribute("data-size", "1em");
    expect(screen.queryByTestId("sats-icon")).not.toBeInTheDocument();
  });

  test("renders sats icon when symbol='sats'", () => {
    render(<BTCAmount amount={100_000_000} symbol="sats" />);
    expect(screen.getByTestId("sats-icon")).toBeInTheDocument();
    expect(screen.getByTestId("sats-icon")).toHaveAttribute("data-size", "1em");
    expect(screen.queryByTestId("bitcoin-icon")).not.toBeInTheDocument();
  });

  test("renders symbol on the right when symbolPosition='right'", () => {
    render(<BTCAmount amount={100_000_000} symbol="btc" symbolPosition="right" />);
    const container = screen.getByTestId("btc-amount");
    const icon = screen.getByTestId("bitcoin-icon");
    // Icon should be the last child
    expect(container.lastElementChild).toBe(icon);
  });

  test("renders symbol on the left by default", () => {
    render(<BTCAmount amount={100_000_000} symbol="btc" />);
    const container = screen.getByTestId("btc-amount");
    const icon = screen.getByTestId("bitcoin-icon");
    // Icon should be the first child
    expect(container.firstElementChild).toBe(icon);
  });

  test("renders no icon when symbol is not set", () => {
    render(<BTCAmount amount={100_000_000} />);
    expect(screen.queryByTestId("bitcoin-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("sats-icon")).not.toBeInTheDocument();
  });
});

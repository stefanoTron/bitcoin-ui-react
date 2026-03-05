import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { BalanceDisplay } from "./BalanceDisplay";

jest.mock("motion/react");

jest.mock("../../icons/BitcoinIcon/BitcoinIcon", () => ({
  BitcoinIcon: (props: any) => <span data-testid="bitcoin-icon" data-size={props.size} />,
}));
jest.mock("../../icons/SatsIcon/SatsIcon", () => ({
  SatsIcon: (props: any) => <span data-testid="sats-icon" data-size={props.size} />,
}));

describe("BalanceDisplay", () => {
  // Task 2: Basic BTC rendering
  test("renders a root element with data-testid", () => {
    render(<BalanceDisplay amount={0} />);
    expect(screen.getByTestId("balance-display")).toBeInTheDocument();
  });

  test("renders BTC amount by default", () => {
    render(<BalanceDisplay amount={100_000_000} />);
    const el = screen.getByTestId("balance-display");
    expect(el.textContent).toMatch(/1[.]00/);
  });

  test("shows BTC label by default", () => {
    render(<BalanceDisplay amount={100_000_000} />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  // Task 3: Toggle cycling
  test("cycles to sats on first toggle click", async () => {
    render(<BalanceDisplay amount={1_234_567} />);
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByTestId("balance-display").textContent).toContain("1,234,567");
    expect(screen.getByText("sats")).toBeInTheDocument();
  });

  test("cycles btc → sats → btc when no fiat", async () => {
    render(<BalanceDisplay amount={100_000_000} />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByText("sats")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  test("cycles btc → sats → fiat → btc when fiat is provided", async () => {
    render(<BalanceDisplay amount={100_000_000} fiatValue={45000} />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByText("sats")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByText("USD")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  test("calls onUnitChange on toggle", async () => {
    const onUnitChange = jest.fn();
    render(<BalanceDisplay amount={100_000_000} onUnitChange={onUnitChange} />);
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(onUnitChange).toHaveBeenCalledWith("sats");
  });

  // Task 4: Fiat display
  test("formats fiat with USD by default", async () => {
    render(<BalanceDisplay amount={100_000_000} fiatValue={45000.5} />);
    await userEvent.click(screen.getByTestId("balance-toggle"));
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByTestId("balance-display").textContent).toContain("$45,000.50");
  });

  test("formats fiat with EUR and locale", async () => {
    render(<BalanceDisplay amount={100_000_000} fiatValue={42000} fiatCode="EUR" locale="de-DE" />);
    await userEvent.click(screen.getByTestId("balance-toggle"));
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByText("EUR")).toBeInTheDocument();
    const text = screen.getByTestId("balance-display").textContent ?? "";
    expect(text).toContain("42.000");
  });

  // Task 5: Controlled mode
  test("respects controlled unit prop", () => {
    render(<BalanceDisplay amount={1_234_567} unit="sats" />);
    expect(screen.getByTestId("balance-display").textContent).toContain("1,234,567");
    expect(screen.getByText("sats")).toBeInTheDocument();
  });

  test("controlled mode: does not change internal state on toggle", async () => {
    const onUnitChange = jest.fn();
    const { rerender } = render(<BalanceDisplay amount={100_000_000} unit="btc" onUnitChange={onUnitChange} />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(onUnitChange).toHaveBeenCalledWith("sats");
    expect(screen.getByText("BTC")).toBeInTheDocument();
    rerender(<BalanceDisplay amount={100_000_000} unit="sats" onUnitChange={onUnitChange} />);
    expect(screen.getByText("sats")).toBeInTheDocument();
  });

  // Task 6: showToggle, className, style, colors
  test("hides toggle button when showToggle=false", () => {
    render(<BalanceDisplay amount={100_000_000} showToggle={false} />);
    expect(screen.queryByTestId("balance-toggle")).not.toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  test("applies className to root", () => {
    render(<BalanceDisplay amount={0} className="custom" />);
    expect(screen.getByTestId("balance-display")).toHaveClass("custom");
  });

  test("applies style to root", () => {
    render(<BalanceDisplay amount={0} style={{ fontSize: 48 }} />);
    expect(screen.getByTestId("balance-display")).toHaveStyle({ fontSize: "48px" });
  });

  test("applies labelColor to toggle button", () => {
    render(<BalanceDisplay amount={0} labelColor="blue" />);
    const toggle = screen.getByTestId("balance-toggle");
    expect(toggle).toHaveStyle({ color: "blue" });
  });

  test("renders zero balance correctly", () => {
    render(<BalanceDisplay amount={0} />);
    const el = screen.getByTestId("balance-display");
    expect(el.textContent).toMatch(/0[.]00/);
  });

  test("toggle button has aria-label", () => {
    render(<BalanceDisplay amount={100_000_000} />);
    const toggle = screen.getByTestId("balance-toggle");
    expect(toggle).toHaveAttribute("aria-label", "Switch display unit");
  });

  test("supports custom toggleAriaLabel", () => {
    render(<BalanceDisplay amount={100_000_000} toggleAriaLabel="Cambiar unidad" />);
    expect(screen.getByTestId("balance-toggle")).toHaveAttribute("aria-label", "Cambiar unidad");
  });

  test("forwards ref to root div element", () => {
    const ref = { current: null };
    render(<BalanceDisplay amount={0} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test("value region has aria-live", () => {
    render(<BalanceDisplay amount={100_000_000} />);
    const liveRegion = screen.getByTestId("balance-display").querySelector("[aria-live]");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
  });

  test("supports custom btcLabel and satsLabel", async () => {
    render(<BalanceDisplay amount={100_000_000} btcLabel="Bitcoin" satsLabel="satoshis" />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("balance-toggle"));
    expect(screen.getByText("satoshis")).toBeInTheDocument();
  });

  test("uses zero transition duration when prefers-reduced-motion is active", () => {
    const mod = jest.requireMock("motion/react");
    const original = mod.useReducedMotion;
    mod.useReducedMotion = () => true;

    // Override motion.div to capture transition prop
    const originalDiv = mod.motion.div;
    let capturedTransition: any;
    mod.motion.div = ({ children, transition, ...rest }: any) => {
      capturedTransition = transition;
      return <div {...rest}>{children}</div>;
    };

    render(<BalanceDisplay amount={100_000_000} />);
    expect(capturedTransition).toEqual({ duration: 0 });

    mod.useReducedMotion = original;
    mod.motion.div = originalDiv;
  });

  test("has no accessibility violations", async () => {
    const { container } = render(<BalanceDisplay amount={100_000_000} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

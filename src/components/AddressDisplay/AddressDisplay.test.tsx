import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { AddressDisplay } from "./AddressDisplay";

const TEST_ADDR = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

describe("AddressDisplay", () => {
  const originalClipboard = navigator.clipboard;
  const writeTextMock = jest.fn().mockResolvedValue(undefined);

  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
  });

  beforeEach(() => {
    writeTextMock.mockReset().mockResolvedValue(undefined);
  });

  test("truncates address with default prefix/suffix", () => {
    render(<AddressDisplay address={TEST_ADDR} />);
    const el = screen.getByTestId("address-display");
    expect(el.textContent).toContain("bc1qxy2k");
    expect(el.textContent).toContain("x0wlh");
    expect(el.textContent).toContain("...");
  });

  test("shows full address when shorter than prefix+suffix", () => {
    render(<AddressDisplay address="abc123" />);
    const el = screen.getByTestId("address-display");
    expect(el.textContent).toContain("abc123");
    expect(el.textContent).not.toContain("...");
  });

  test("respects custom prefixChars and suffixChars", () => {
    render(<AddressDisplay address={TEST_ADDR} prefixChars={4} suffixChars={3} />);
    const el = screen.getByTestId("address-display");
    expect(el.textContent).toContain("bc1q");
    expect(el.textContent).toContain("wlh");
  });

  test("copies address to clipboard on click", async () => {
    render(<AddressDisplay address={TEST_ADDR} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(TEST_ADDR);
  });

  test("calls onCopy callback after copying", async () => {
    const onCopy = jest.fn();
    render(<AddressDisplay address={TEST_ADDR} onCopy={onCopy} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onCopy).toHaveBeenCalled();
  });

  test("hides copy button when copyable={false}", () => {
    render(<AddressDisplay address={TEST_ADDR} copyable={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("shows copied label after clicking", async () => {
    render(<AddressDisplay address={TEST_ADDR} copiedLabel="Done!" />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText("Done!")).toBeInTheDocument();
  });

  test("applies className and style", () => {
    render(<AddressDisplay address={TEST_ADDR} className="addr" style={{ fontSize: 14 }} />);
    const el = screen.getByTestId("address-display");
    expect(el).toHaveClass("addr");
    expect(el).toHaveStyle({ fontSize: "14px" });
  });

  test("shows full address when truncate=false", () => {
    render(<AddressDisplay address={TEST_ADDR} truncate={false} />);
    const el = screen.getByTestId("address-display");
    expect(el.textContent).toContain(TEST_ADDR);
    expect(el.textContent).not.toContain("...");
  });

  test("root has full address as aria-label", () => {
    render(<AddressDisplay address={TEST_ADDR} />);
    expect(screen.getByTestId("address-display")).toHaveAttribute("aria-label", TEST_ADDR);
  });

  test("supports custom copyAriaLabel", () => {
    render(<AddressDisplay address={TEST_ADDR} copyAriaLabel="Copiar dirección" />);
    expect(screen.getByLabelText("Copiar dirección")).toBeInTheDocument();
  });

  test("copy button has aria-live for state changes", () => {
    render(<AddressDisplay address={TEST_ADDR} />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-live", "polite");
  });

  test("applies custom colors", () => {
    render(<AddressDisplay address={TEST_ADDR} addressColor="red" separatorColor="blue" />);
    const el = screen.getByTestId("address-display");
    const spans = el.querySelectorAll("span");
    const colors = Array.from(spans).map((s) => (s as HTMLElement).style.color);
    expect(colors).toContain("red");
    expect(colors).toContain("blue");
  });

  test("copy button aria-label changes to copiedLabel after copy", async () => {
    render(<AddressDisplay address={TEST_ADDR} copiedLabel="Done!" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Copy address");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-label", "Done!");
  });

  test("forwards ref to root span element", () => {
    const ref = { current: null };
    render(<AddressDisplay address={TEST_ADDR} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  test("copied state resets after timeout", async () => {
    jest.useFakeTimers();
    render(<AddressDisplay address={TEST_ADDR} />);
    const button = screen.getByRole("button");
    // Use fireEvent (not userEvent) to avoid advanceTimers advancing the 2s reset
    await act(async () => {
      fireEvent.click(button);
      // Flush the microtask from the resolved clipboard promise
      await Promise.resolve();
    });
    expect(screen.getByText("Copied!")).toBeInTheDocument();
    // Advance past the 2000ms reset timeout
    act(() => {
      jest.advanceTimersByTime(2100);
    });
    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test("does not throw when clipboard.writeText rejects", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("Not allowed"));
    render(<AddressDisplay address={TEST_ADDR} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    // Component should not crash; copied state should not change
    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
  });

  test("has no accessibility violations", async () => {
    const { container } = render(<AddressDisplay address={TEST_ADDR} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

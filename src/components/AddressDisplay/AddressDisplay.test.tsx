import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AddressDisplay } from "./AddressDisplay";

const TEST_ADDR = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

// Mock clipboard API
Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

describe("AddressDisplay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  test("applies custom colors", () => {
    render(
      <AddressDisplay
        address={TEST_ADDR}
        addressColor="red"
        separatorColor="blue"
      />,
    );
    const el = screen.getByTestId("address-display");
    const spans = el.querySelectorAll("span");
    const colors = Array.from(spans).map((s) => (s as HTMLElement).style.color);
    expect(colors).toContain("red");
    expect(colors).toContain("blue");
  });
});

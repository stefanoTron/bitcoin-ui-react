import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { BitcoinIcon } from "./BitcoinIcon";

describe("BitcoinIcon", () => {
  test("renders an SVG with default title", () => {
    render(<BitcoinIcon />);
    expect(screen.getByTitle("Bitcoin")).toBeInTheDocument();
  });

  test("renders at default size 16", () => {
    render(<BitcoinIcon />);
    const svg = screen.getByTitle("Bitcoin").closest("svg")!;
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
  });

  test("applies custom size", () => {
    render(<BitcoinIcon size={64} />);
    const svg = screen.getByTitle("Bitcoin").closest("svg")!;
    expect(svg).toHaveAttribute("width", "64");
    expect(svg).toHaveAttribute("height", "64");
  });

  test("applies custom alt text", () => {
    render(<BitcoinIcon alt="BTC" />);
    expect(screen.getByTitle("BTC")).toBeInTheDocument();
  });

  test("has role=img for accessibility", () => {
    render(<BitcoinIcon />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("hides from screen readers when decorative", () => {
    render(<BitcoinIcon decorative />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
    expect(svg?.querySelector("title")).toBeNull();
  });

  test("applies className and style", () => {
    render(<BitcoinIcon className="my-icon" style={{ opacity: 0.5 }} />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveClass("my-icon");
    expect(svg).toHaveStyle({ opacity: "0.5" });
  });

  test("forwards ref to SVG element", () => {
    const ref = { current: null };
    render(<BitcoinIcon ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  test("has no accessibility violations", async () => {
    const { container } = render(<BitcoinIcon />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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
});

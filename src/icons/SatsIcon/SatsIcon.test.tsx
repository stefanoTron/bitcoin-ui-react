import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SatsIcon } from "./SatsIcon";

describe("SatsIcon", () => {
  test("renders an SVG with default title", () => {
    render(<SatsIcon />);
    expect(screen.getByTitle("Satoshis")).toBeInTheDocument();
  });

  test("renders at default size 16", () => {
    render(<SatsIcon />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
  });

  test("applies custom size", () => {
    render(<SatsIcon size={128} />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).toHaveAttribute("width", "128");
    expect(svg).toHaveAttribute("height", "128");
  });

  test("applies rotation when not tilted (default)", () => {
    render(<SatsIcon />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).toHaveAttribute("transform");
  });

  test("does not apply rotation when tilted", () => {
    render(<SatsIcon tilted />);
    const svg = screen.getByTitle("Satoshis").closest("svg")!;
    expect(svg).not.toHaveAttribute("transform");
  });

  test("has role=img for accessibility", () => {
    render(<SatsIcon />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});

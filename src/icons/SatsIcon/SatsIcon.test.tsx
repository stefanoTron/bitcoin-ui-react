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

  test("renders upright by default (no rotation)", () => {
    render(<SatsIcon />);
    const svg = screen.getByRole("img");
    expect(svg).not.toHaveAttribute("transform");
  });

  test("applies tilt rotation when tilted={true}", () => {
    render(<SatsIcon tilted />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("transform");
  });

  test("has role=img for accessibility", () => {
    render(<SatsIcon />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("hides from screen readers when decorative", () => {
    render(<SatsIcon decorative />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
    expect(svg?.querySelector("title")).toBeNull();
  });

  test("applies className and style", () => {
    render(<SatsIcon className="my-icon" style={{ opacity: 0.5 }} />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveClass("my-icon");
    expect(svg).toHaveStyle({ opacity: "0.5" });
  });
});

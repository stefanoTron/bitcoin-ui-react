import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ConfirmationBadge } from "./ConfirmationBadge";

describe("ConfirmationBadge", () => {
  test("shows unconfirmed label for 0 confirmations", () => {
    render(<ConfirmationBadge confirmations={0} />);
    expect(screen.getByText("Unconfirmed")).toBeInTheDocument();
  });

  test("shows count for 1-5 confirmations (default threshold=6)", () => {
    render(<ConfirmationBadge confirmations={3} />);
    expect(screen.getByText("3/6")).toBeInTheDocument();
  });

  test("shows confirmed label at threshold", () => {
    render(<ConfirmationBadge confirmations={6} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  test("shows confirmed label above threshold", () => {
    render(<ConfirmationBadge confirmations={100} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  test("applies unconfirmedColor for 0", () => {
    render(<ConfirmationBadge confirmations={0} unconfirmedColor="red" />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveStyle({ color: "red" });
  });

  test("applies confirmingColor for in-progress", () => {
    render(<ConfirmationBadge confirmations={2} confirmingColor="orange" />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveStyle({ color: "orange" });
  });

  test("applies confirmedColor at threshold", () => {
    render(<ConfirmationBadge confirmations={6} confirmedColor="lime" />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveStyle({ color: "lime" });
  });

  test("respects custom threshold", () => {
    render(<ConfirmationBadge confirmations={3} threshold={3} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  test("shows custom labels", () => {
    render(
      <ConfirmationBadge
        confirmations={0}
        unconfirmedLabel="Pending"
      />,
    );
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("hides count when showCount={false}", () => {
    render(<ConfirmationBadge confirmations={3} showCount={false} />);
    expect(screen.queryByText("3/6")).not.toBeInTheDocument();
  });

  test("applies className and style", () => {
    render(<ConfirmationBadge confirmations={0} className="badge" style={{ padding: 8 }} />);
    const el = screen.getByTestId("confirmation-badge");
    expect(el).toHaveClass("badge");
    expect(el).toHaveStyle({ padding: "8px" });
  });
});

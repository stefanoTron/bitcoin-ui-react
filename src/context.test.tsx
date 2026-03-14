import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BTCUIProvider } from "./context";
import { ConfirmationBadge } from "./components/ConfirmationBadge";
import { AddressDisplay } from "./components/AddressDisplay";

describe("BTCUIProvider", () => {
  test("components use built-in defaults without provider", () => {
    render(<ConfirmationBadge confirmations={0} />);
    expect(screen.getByTestId("confirmation-badge")).toHaveTextContent("Unconfirmed");
  });

  test("global fontFamily applies to components", () => {
    render(
      <BTCUIProvider fontFamily="monospace">
        <ConfirmationBadge confirmations={0} />
      </BTCUIProvider>,
    );
    expect(screen.getByTestId("confirmation-badge")).toHaveStyle({ fontFamily: "monospace" });
  });

  test("component-scoped defaults override built-in defaults", () => {
    render(
      <BTCUIProvider confirmationBadge={{ confirmedLabel: "Done!", threshold: 3 }}>
        <ConfirmationBadge confirmations={3} />
      </BTCUIProvider>,
    );
    expect(screen.getByTestId("confirmation-badge")).toHaveTextContent("Done!");
  });

  test("direct props override provider defaults", () => {
    render(
      <BTCUIProvider confirmationBadge={{ confirmedLabel: "Done!" }}>
        <ConfirmationBadge confirmations={10} confirmedLabel="Complete" />
      </BTCUIProvider>,
    );
    expect(screen.getByTestId("confirmation-badge")).toHaveTextContent("Complete");
  });

  test("component-scoped fontFamily overrides global fontFamily", () => {
    render(
      <BTCUIProvider fontFamily="serif" confirmationBadge={{ fontFamily: "monospace" }}>
        <ConfirmationBadge confirmations={0} />
      </BTCUIProvider>,
    );
    expect(screen.getByTestId("confirmation-badge")).toHaveStyle({ fontFamily: "monospace" });
  });

  test("data-btc-ui attribute is present on components", () => {
    render(<ConfirmationBadge confirmations={0} />);
    expect(screen.getByTestId("confirmation-badge")).toHaveAttribute("data-btc-ui");
  });

  test("provider defaults apply to AddressDisplay", () => {
    render(
      <BTCUIProvider addressDisplay={{ copiedLabel: "Done!", copyable: false }}>
        <AddressDisplay address="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" />
      </BTCUIProvider>,
    );
    // copyable=false from provider means no button
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("multiple component defaults work simultaneously", () => {
    render(
      <BTCUIProvider
        fontFamily="monospace"
        confirmationBadge={{ confirmedLabel: "OK" }}
        addressDisplay={{ copyable: false }}
      >
        <ConfirmationBadge confirmations={10} />
        <AddressDisplay address="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" />
      </BTCUIProvider>,
    );
    expect(screen.getByTestId("confirmation-badge")).toHaveTextContent("OK");
    expect(screen.getByTestId("confirmation-badge")).toHaveStyle({ fontFamily: "monospace" });
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("fontFamily falls back to CSS variable when no provider", () => {
    render(<ConfirmationBadge confirmations={0} />);
    expect(screen.getByTestId("confirmation-badge")).toHaveStyle({
      fontFamily: "var(--btc-ui-font-family, inherit)",
    });
  });
});

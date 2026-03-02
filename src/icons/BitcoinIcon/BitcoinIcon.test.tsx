import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import BitcoinIcon from "./BitcoinIcon";

describe("Running Test for Marbella Button", () => {
  test("Check Button Disabled", () => {
    render(<BitcoinIcon />);
    expect(
      screen.getByRole("button", { name: "Button marbella" })
    ).toBeDisabled();
  });
});

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { BalanceDisplay } from "./BalanceDisplay";

const meta: Meta<typeof BalanceDisplay> = {
  title: "Components/BalanceDisplay",
  component: BalanceDisplay,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "SF Mono, Menlo, monospace", fontSize: 32, textAlign: "center", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    amount: { control: { type: "number", min: 0, max: 2_100_000_000_000_000 } },
    fiatValue: { control: "number" },
    fiatCode: { control: "text" },
    activeColor: { control: "color" },
    labelColor: { control: "color" },
    showToggle: { control: "boolean" },
    unit: { control: "select", options: [undefined, "btc", "sats", "fiat"] },
  },
};

export default meta;
type Story = StoryObj<typeof BalanceDisplay>;

/** Default -- tap label to toggle BTC/sats */
export const Default: Story = {
  args: { amount: 123_456_789 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByTestId("balance-toggle");

    // Initially in BTC mode
    await expect(toggle).toHaveTextContent("BTC");

    // Click to switch to sats
    await userEvent.click(toggle);
    await expect(toggle).toHaveTextContent("sats");

    // Click again to cycle back to BTC (no fiat, so BTC -> sats -> BTC)
    await userEvent.click(toggle);
    await expect(toggle).toHaveTextContent("BTC");
  },
};

/** Starts in sats mode */
export const Sats: Story = {
  args: { amount: 123_456_789, unit: "sats" },
};

/** With fiat — cycles BTC → sats → USD → BTC */
export const WithFiat: Story = {
  args: { amount: 100_000_000, fiatValue: 45000.5 },
};

/** Euro fiat with German locale */
export const FiatEuro: Story = {
  args: { amount: 100_000_000, fiatValue: 42000, fiatCode: "EUR", locale: "de-DE" },
};

/** Static display — no toggle */
export const NoToggle: Story = {
  args: { amount: 50_000_000, showToggle: false },
};

/** Controlled mode — external unit state */
export const Controlled: Story = {
  render: () => {
    const [unit, setUnit] = useState<"btc" | "sats" | "fiat">("btc");
    return (
      <div>
        <BalanceDisplay
          amount={250_000_000}
          fiatValue={112500}
          unit={unit}
          onUnitChange={setUnit}
        />
        <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center" }}>
          {(["btc", "sats", "fiat"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              style={{
                padding: "4px 12px",
                fontSize: 14,
                border: u === unit ? "2px solid #f7931a" : "1px solid #ccc",
                borderRadius: 4,
                background: u === unit ? "#fff8f0" : "#fff",
                cursor: "pointer",
                fontWeight: u === unit ? 600 : 400,
              }}
            >
              {u.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

/** No fiat — cycles BTC ↔ sats only */
export const NoFiat: Story = {
  args: { amount: 21_000_000 },
};

/** Dark theme */
export const DarkTheme: Story = {
  render: () => (
    <div style={{ background: "#1a1a2e", padding: 32, borderRadius: 8 }}>
      <BalanceDisplay
        amount={500_000_000}
        fiatValue={225000}
        activeColor="#e0e0e0"
        labelColor="#666"
      />
    </div>
  ),
};

/** Max supply — 21 million BTC */
export const LargeBalance: Story = {
  args: { amount: 2_100_000_000_000_000, fiatValue: 2_100_000_000_000 },
};

/** Empty wallet */
export const ZeroBalance: Story = {
  args: { amount: 0, fiatValue: 0 },
};

/** Realistic wallet card */
export const InACard: Story = {
  render: () => (
    <div
      style={{
        background: "linear-gradient(135deg, #f7931a 0%, #e8820a 100%)",
        borderRadius: 16,
        padding: "32px 24px",
        color: "#fff",
        maxWidth: 360,
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: 14, fontFamily: "system-ui, sans-serif", marginBottom: 8, opacity: 0.8 }}>
        My Wallet
      </div>
      <BalanceDisplay
        amount={234_567_890}
        fiatValue={10567.32}
        activeColor="#fff"
        labelColor="rgba(255,255,255,0.7)"
        style={{ fontSize: 36 }}
      />
    </div>
  ),
};

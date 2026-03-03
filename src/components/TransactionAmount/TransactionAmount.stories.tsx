import type { Meta, StoryObj } from "@storybook/react";
import { TransactionAmount } from "./TransactionAmount";
import { AddressDisplay } from "../AddressDisplay/AddressDisplay";

const meta: Meta<typeof TransactionAmount> = {
  title: "Components/TransactionAmount",
  component: TransactionAmount,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "monospace", fontSize: 16 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    amount: { control: { type: "number" } },
    showSign: { control: "boolean" },
    symbol: { control: { type: "select", options: [undefined, "btc", "sats"] } },
    positiveColor: { control: "color" },
    negativeColor: { control: "color" },
    inactiveColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionAmount>;

/** Positive (received) amount */
export const Received: Story = {
  args: {
    amount: 150_000,
  },
};

/** Negative (sent) amount */
export const Sent: Story = {
  args: {
    amount: -42_000,
  },
};

/** Zero amount */
export const Zero: Story = {
  args: {
    amount: 0,
  },
};

/** Positive amount with BTC symbol */
export const WithBTCSymbol: Story = {
  args: {
    amount: 1_234_567,
    symbol: "btc",
  },
};

/** Negative amount with sats symbol */
export const WithSatsSymbol: Story = {
  args: {
    amount: -500_000,
    symbol: "sats",
  },
};

/** Amount without sign prefix */
export const NoSign: Story = {
  args: {
    amount: 75_000,
    showSign: false,
  },
};

/** Custom color scheme */
export const CustomColors: Story = {
  args: {
    amount: 210_000,
    positiveColor: "#3b82f6",
    negativeColor: "#f97316",
    inactiveColor: "#cbd5e1",
  },
};

/** Realistic transaction list with alternating sent/received */
export const TransactionList: Story = {
  render: () => {
    const txns = [
      { label: "Payment from Alice", amount: 500_000, date: "Mar 3" },
      { label: "Coffee shop", amount: -4_200, date: "Mar 2" },
      { label: "Mining payout", amount: 1_250_000, date: "Mar 1" },
      { label: "VPN subscription", amount: -15_000, date: "Feb 28" },
      { label: "Refund", amount: 8_000, date: "Feb 27" },
      { label: "Hardware wallet", amount: -350_000, date: "Feb 26" },
    ];
    return (
      <div style={{ maxWidth: 400 }}>
        {txns.map((tx, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 500 }}>
                {tx.label}
              </div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{tx.date}</div>
            </div>
            <TransactionAmount amount={tx.amount} />
          </div>
        ))}
      </div>
    );
  },
};

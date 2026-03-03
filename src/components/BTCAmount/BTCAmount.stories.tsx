import type { Meta, StoryObj } from "@storybook/react";
import { BTCAmount } from "./BTCAmount";

const meta: Meta<typeof BTCAmount> = {
  title: "Components/BTCAmount",
  component: BTCAmount,
  tags: ["autodocs"],
  argTypes: {
    amount: { control: { type: "number", min: 0, max: 2_100_000_000_000_000 } },
    activeColor: { control: "color" },
    inactiveColor: { control: "color" },
    satsSeparator: { control: "text" },
    btcSeparator: { control: "text" },
    animate: { control: "boolean" },
    className: { control: "text" },
    style: { control: "object" },
    symbol: { control: "select", options: [undefined, "btc", "sats"] },
    symbolPosition: { control: "select", options: ["left", "right"] },
  },
  decorators: [
    (Story) => (
      <div style={{ fontSize: 32, fontFamily: "monospace" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BTCAmount>;

export const Zero: Story = {
  args: { amount: 0 },
};

export const OneSatoshi: Story = {
  args: { amount: 1 },
};

export const OneThousandSats: Story = {
  args: { amount: 1_000 },
};

export const TenThousandSats: Story = {
  args: { amount: 10_000 },
};

export const OneBTC: Story = {
  args: { amount: 100_000_000 },
};

export const TwentyOneBTC: Story = {
  args: { amount: 2_100_000_000 },
};

export const MaxSupply: Story = {
  args: { amount: 2_100_000_000_000_000 },
};

export const CustomColors: Story = {
  args: {
    amount: 12_537_829,
    activeColor: "#f7931a",
    inactiveColor: "#e0e0e0",
  },
};

export const NoAnimation: Story = {
  args: {
    amount: 50_000,
    animate: false,
  },
};

export const CustomSeparators: Story = {
  args: {
    amount: 100_000_000,
    btcSeparator: ",",
    satsSeparator: ".",
  },
};

export const CustomFont: Story = {
  args: {
    amount: 42_000_000,
    style: { fontFamily: "SF Mono, Menlo, monospace" },
  },
};

export const WithBTCSymbol: Story = {
  args: {
    amount: 100_000_000,
    symbol: "btc",
  },
};

export const WithSatsSymbol: Story = {
  args: {
    amount: 50_000,
    symbol: "sats",
  },
};

export const SymbolOnRight: Story = {
  args: {
    amount: 100_000_000,
    symbol: "btc",
    symbolPosition: "right",
  },
};

export const SatsSymbolOnRight: Story = {
  args: {
    amount: 50_000,
    symbol: "sats",
    symbolPosition: "right",
  },
};

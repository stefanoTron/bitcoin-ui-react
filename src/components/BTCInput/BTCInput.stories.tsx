import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BTCInput } from "./BTCInput";
import { BTCAmount } from "../BTCAmount/BTCAmount";

const meta: Meta<typeof BTCInput> = {
  title: "Components/BTCInput",
  component: BTCInput,
  tags: ["autodocs"],
  argTypes: {
    amount: { control: { type: "number", min: 0, max: 2_100_000_000_000_000 } },
    activeColor: { control: "color" },
    inactiveColor: { control: "color" },
    satsSeparator: { control: "text" },
    btcSeparator: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof BTCInput>;

/** Interactive story with live state management */
export const Interactive: Story = {
  render: () => {
    const [amount, setAmount] = useState(0);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24 }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          Raw satoshis: {amount.toLocaleString()}
        </p>
      </div>
    );
  },
};

/** Shows the input synced with a BTCAmount display */
export const WithDisplay: Story = {
  render: () => {
    const [amount, setAmount] = useState(50_000);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 14, color: "#666", display: "block", marginBottom: 4 }}>
            Input:
          </label>
          <BTCInput amount={amount} onAmountChange={setAmount} />
        </div>
        <div>
          <label style={{ fontSize: 14, color: "#666", display: "block", marginBottom: 4 }}>
            Display:
          </label>
          <BTCAmount amount={amount} />
        </div>
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          {amount.toLocaleString()} satoshis
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    amount: 100_000,
    onAmountChange: () => {},
    disabled: true,
  },
};

export const CustomColors: Story = {
  render: () => {
    const [amount, setAmount] = useState(1_234_567);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24, background: "#1a1a2e", padding: 24 }}>
        <BTCInput
          amount={amount}
          onAmountChange={setAmount}
          activeColor="#f7931a"
          inactiveColor="#444"
        />
      </div>
    );
  },
};

export const PrefilledOneBTC: Story = {
  render: () => {
    const [amount, setAmount] = useState(100_000_000);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24 }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
      </div>
    );
  },
};

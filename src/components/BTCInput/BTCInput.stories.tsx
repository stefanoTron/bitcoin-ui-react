import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { BTCInput } from "./BTCInput";
import { BTCAmount } from "../BTCAmount/BTCAmount";
import { BitcoinIcon } from "../../icons/BitcoinIcon/BitcoinIcon";
import { SatsIcon } from "../../icons/SatsIcon/SatsIcon";

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

/** Basic interactive input */
export const Default: Story = {
  render: () => {
    const [amount, setAmount] = useState(0);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 24, width: 240 }}>
        <BTCInput amount={amount} onAmountChange={setAmount} />
        <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
          {amount.toLocaleString()} sats
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Amount in BTC" });
    await userEvent.click(input);
    await userEvent.type(input, "123");
    await expect(input).toHaveValue(expect.stringContaining("123"));
  },
};

/** Input inside a form with label, border, and padding */
export const InAForm: Story = {
  render: () => {
    const [amount, setAmount] = useState(0);
    const [memo, setMemo] = useState("");
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ fontFamily: "system-ui, sans-serif", maxWidth: 360 }}
      >
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
            Memo
          </label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="What's this for?"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "8px 12px",
              fontSize: 16,
              border: "1px solid #ccc",
              borderRadius: 6,
              fontFamily: "inherit",
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
            Amount
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
          >
            <BitcoinIcon size={20} />
            <BTCInput
              amount={amount}
              onAmountChange={setAmount}
              style={{ fontSize: 16, fontFamily: "SF Mono, Menlo, monospace" }}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 16px",
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            background: "#f7931a",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    );
  },
};

/** Narrow container — input adapts to small widths */
export const NarrowContainer: Story = {
  render: () => {
    const [amount, setAmount] = useState(50_000);
    return (
      <div
        style={{
          width: 160,
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: 6,
          fontFamily: "monospace",
          fontSize: 16,
        }}
      >
        <BTCInput amount={amount} onAmountChange={setAmount} />
      </div>
    );
  },
};

/** Wide container — input fills available space */
export const WideContainer: Story = {
  render: () => {
    const [amount, setAmount] = useState(2_100_000_000);
    return (
      <div
        style={{
          width: 480,
          padding: "12px 16px",
          border: "1px solid #ddd",
          borderRadius: 6,
          fontFamily: "monospace",
          fontSize: 32,
        }}
      >
        <BTCInput amount={amount} onAmountChange={setAmount} />
      </div>
    );
  },
};

/** Side-by-side with a BTCAmount display */
export const WithDisplay: Story = {
  render: () => {
    const [amount, setAmount] = useState(1_234_567);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 20, maxWidth: 400 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          <SatsIcon size={18} tilted />
          <BTCInput amount={amount} onAmountChange={setAmount} />
        </div>
        <div style={{ fontSize: 14, color: "#666" }}>
          Display: <BTCAmount amount={amount} symbol="btc" />
        </div>
      </div>
    );
  },
};

/** Inline within a sentence */
export const Inline: Story = {
  render: () => {
    const [amount, setAmount] = useState(21_000);
    return (
      <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, maxWidth: 400 }}>
        Send{" "}
        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 4,
            borderBottom: "2px solid #f7931a",
            fontFamily: "SF Mono, Menlo, monospace",
          }}
        >
          <BTCInput
            amount={amount}
            onAmountChange={setAmount}
            style={{ width: "10ch" }}
          />
        </span>{" "}
        sats to Alice.
      </p>
    );
  },
};

/** Dark theme */
export const DarkTheme: Story = {
  render: () => {
    const [amount, setAmount] = useState(500_000);
    return (
      <div
        style={{
          background: "#1a1a2e",
          padding: 24,
          borderRadius: 8,
          maxWidth: 360,
          fontFamily: "monospace",
          fontSize: 24,
        }}
      >
        <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 4 }}>
          Amount (BTC)
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            border: "1px solid #333",
            borderRadius: 6,
          }}
        >
          <BitcoinIcon size={22} />
          <BTCInput
            amount={amount}
            onAmountChange={setAmount}
            activeColor="#f7931a"
            inactiveColor="#555"
          />
        </div>
      </div>
    );
  },
};

/** Disabled state */
export const Disabled: Story = {
  render: () => {
    return (
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 20,
          maxWidth: 280,
          padding: "8px 12px",
          border: "1px solid #eee",
          borderRadius: 6,
          background: "#fafafa",
        }}
      >
        <BTCInput amount={100_000} onAmountChange={() => {}} disabled />
      </div>
    );
  },
};

/** Multiple inputs in a two-column layout */
export const MultipleInputs: Story = {
  render: () => {
    const [send, setSend] = useState(0);
    const [fee, setFee] = useState(1_000);
    const inputContainer: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: 6,
      fontFamily: "monospace",
      fontSize: 18,
    };
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 360 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
            Send
          </label>
          <div style={inputContainer}>
            <BitcoinIcon size={18} />
            <BTCInput amount={send} onAmountChange={setSend} />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
            Network fee
          </label>
          <div style={inputContainer}>
            <SatsIcon size={16} tilted />
            <BTCInput amount={fee} onAmountChange={setFee} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#666",
            padding: "8px 0",
            borderTop: "1px solid #eee",
          }}
        >
          <span>Total</span>
          <BTCAmount amount={send + fee} symbol="btc" />
        </div>
      </div>
    );
  },
};

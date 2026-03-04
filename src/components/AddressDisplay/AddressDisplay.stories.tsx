import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { AddressDisplay } from "./AddressDisplay";
import { TransactionAmount } from "../TransactionAmount/TransactionAmount";

const MAINNET_ADDRESS = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
const TAPROOT_ADDRESS = "bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297";

const meta: Meta<typeof AddressDisplay> = {
  title: "Components/AddressDisplay",
  component: AddressDisplay,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "monospace", fontSize: 16 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    address: { control: "text" },
    prefixChars: { control: { type: "number", min: 1, max: 50 } },
    suffixChars: { control: { type: "number", min: 1, max: 50 } },
    separator: { control: "text" },
    copyable: { control: "boolean" },
    addressColor: { control: "color" },
    separatorColor: { control: "color" },
    copyIconColor: { control: "color" },
    copiedLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AddressDisplay>;

/** Default display with truncation and copy button */
export const Default: Story = {
  args: {
    address: MAINNET_ADDRESS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole("button", { name: "Copy address" });
    await userEvent.click(copyButton);
    await expect(canvas.getByText("Copied!")).toBeInTheDocument();
  },
};

/** Short address that does not need truncation */
export const ShortAddress: Story = {
  args: {
    address: "bc1qw508d6",
  },
};

/** Custom prefix/suffix lengths */
export const CustomTruncation: Story = {
  args: {
    address: TAPROOT_ADDRESS,
    prefixChars: 12,
    suffixChars: 8,
    separator: "~~~",
  },
};

/** Copy button hidden */
export const NotCopyable: Story = {
  args: {
    address: MAINNET_ADDRESS,
    copyable: false,
  },
};

/** Dark theme with custom colors */
export const DarkTheme: Story = {
  render: (args) => (
    <div
      style={{
        background: "#1a1a2e",
        padding: 24,
        borderRadius: 8,
        maxWidth: 400,
      }}
    >
      <AddressDisplay {...args} />
    </div>
  ),
  args: {
    address: MAINNET_ADDRESS,
    addressColor: "#e0e0e0",
    separatorColor: "#555",
    copyIconColor: "#777",
  },
};

/** Realistic transaction list showing address alongside amount */
export const InATransactionList: Story = {
  render: () => {
    const txns = [
      { address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", amount: 150_000 },
      { address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4", amount: -42_000 },
      { address: "bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297", amount: 1_000_000 },
      { address: "bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h", amount: -250_000 },
    ];
    return (
      <div style={{ maxWidth: 480 }}>
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
            <AddressDisplay address={tx.address} copyable={false} />
            <TransactionAmount amount={tx.amount} />
          </div>
        ))}
      </div>
    );
  },
};

/** Custom color scheme */
export const CustomColors: Story = {
  args: {
    address: MAINNET_ADDRESS,
    addressColor: "#6366f1",
    separatorColor: "#c084fc",
    copyIconColor: "#a78bfa",
  },
};

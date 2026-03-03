import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmationBadge } from "./ConfirmationBadge";
import { AddressDisplay } from "../AddressDisplay/AddressDisplay";
import { TransactionAmount } from "../TransactionAmount/TransactionAmount";

const meta: Meta<typeof ConfirmationBadge> = {
  title: "Components/ConfirmationBadge",
  component: ConfirmationBadge,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "monospace", fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    confirmations: { control: { type: "number", min: 0, max: 100 } },
    threshold: { control: { type: "number", min: 1, max: 20 } },
    showCount: { control: "boolean" },
    unconfirmedColor: { control: "color" },
    confirmingColor: { control: "color" },
    confirmedColor: { control: "color" },
    unconfirmedLabel: { control: "text" },
    confirmedLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmationBadge>;

/** Zero confirmations -- unconfirmed */
export const Unconfirmed: Story = {
  args: {
    confirmations: 0,
  },
};

/** Single confirmation -- confirming */
export const OneConfirmation: Story = {
  args: {
    confirmations: 1,
  },
};

/** Three confirmations -- still confirming */
export const ThreeConfirmations: Story = {
  args: {
    confirmations: 3,
  },
};

/** Six or more confirmations -- confirmed */
export const Confirmed: Story = {
  args: {
    confirmations: 6,
  },
};

/** All states from 0 through 7 in a vertical list */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 100, color: "#666" }}>
            {n} confirmation{n !== 1 ? "s" : ""}
          </span>
          <ConfirmationBadge confirmations={n} />
        </div>
      ))}
    </div>
  ),
};

/** Custom threshold of 3 instead of default 6 */
export const CustomThreshold: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[0, 1, 2, 3, 4].map((n) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 100, color: "#666" }}>
            {n} confirmation{n !== 1 ? "s" : ""}
          </span>
          <ConfirmationBadge confirmations={n} threshold={3} />
        </div>
      ))}
    </div>
  ),
};

/** Custom label text */
export const CustomLabels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <ConfirmationBadge
        confirmations={0}
        unconfirmedLabel="Pending"
        confirmedLabel="Settled"
      />
      <ConfirmationBadge
        confirmations={3}
        unconfirmedLabel="Pending"
        confirmedLabel="Settled"
      />
      <ConfirmationBadge
        confirmations={6}
        unconfirmedLabel="Pending"
        confirmedLabel="Settled"
      />
    </div>
  ),
};

/** Custom color scheme */
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <ConfirmationBadge
        confirmations={0}
        unconfirmedColor="#dc2626"
        confirmingColor="#2563eb"
        confirmedColor="#16a34a"
      />
      <ConfirmationBadge
        confirmations={3}
        unconfirmedColor="#dc2626"
        confirmingColor="#2563eb"
        confirmedColor="#16a34a"
      />
      <ConfirmationBadge
        confirmations={6}
        unconfirmedColor="#dc2626"
        confirmingColor="#2563eb"
        confirmedColor="#16a34a"
      />
    </div>
  ),
};

/** Realistic transaction row with address, amount, and confirmation badge */
export const InATransactionRow: Story = {
  render: () => {
    const txns = [
      { address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", amount: 150_000, confs: 0 },
      { address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4", amount: -42_000, confs: 2 },
      { address: "bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h", amount: 1_000_000, confs: 6 },
      { address: "bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297", amount: -8_500, confs: 1 },
    ];
    return (
      <div style={{ maxWidth: 600 }}>
        {txns.map((tx, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <AddressDisplay address={tx.address} copyable={false} />
            </div>
            <TransactionAmount amount={tx.amount} />
            <div style={{ width: 100, textAlign: "right" }}>
              <ConfirmationBadge confirmations={tx.confs} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

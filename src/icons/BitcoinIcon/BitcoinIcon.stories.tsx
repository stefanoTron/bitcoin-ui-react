import type { Meta, StoryObj } from "@storybook/react";
import { BitcoinIcon } from "./BitcoinIcon";

const meta: Meta<typeof BitcoinIcon> = {
  title: "Icons/BitcoinIcon",
  component: BitcoinIcon,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number", min: 8, max: 512, step: 8 } },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    alt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof BitcoinIcon>;

export const Default: Story = {
  args: { size: 32 },
};

export const Small: Story = {
  args: { size: 16 },
};

export const Large: Story = {
  args: { size: 128 },
};

export const ExtraLarge: Story = {
  args: { size: 256 },
};

export const CustomColors: Story = {
  args: {
    size: 128,
    backgroundColor: "#4a0e8f",
    color: "#ffd700",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <BitcoinIcon size={16} />
      <BitcoinIcon size={32} />
      <BitcoinIcon size={64} />
      <BitcoinIcon size={128} />
    </div>
  ),
};

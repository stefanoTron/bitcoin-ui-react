import type { Meta, StoryObj } from "@storybook/react";
import { SatsIcon } from "./SatsIcon";

const meta: Meta<typeof SatsIcon> = {
  title: "Icons/SatsIcon",
  component: SatsIcon,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number", min: 8, max: 512, step: 8 } },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    alt: { control: "text" },
    tilted: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SatsIcon>;

export const Default: Story = {
  args: { size: 32 },
};

export const Tilted: Story = {
  args: { size: 64, tilted: true },
};

export const WithBackground: Story = {
  args: {
    size: 128,
    backgroundColor: "#f7931a",
    color: "#ffffff",
  },
};

export const TiltComparison: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ textAlign: "center" }}>
        <SatsIcon size={64} />
        <p>Default (rotated)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <SatsIcon size={64} tilted />
        <p>Tilted (original angle)</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <SatsIcon size={16} />
      <SatsIcon size={32} />
      <SatsIcon size={64} />
      <SatsIcon size={128} />
    </div>
  ),
};

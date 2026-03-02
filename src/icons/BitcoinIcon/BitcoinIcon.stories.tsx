import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import BitcoinIcon from "./BitcoinIcon";

const meta: Meta<typeof BitcoinIcon> = {
  component: BitcoinIcon,
  title: "Icons/BitcoinIcon",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BitcoinIcon>;

export const Default: Story = (args) => [
  <BitcoinIcon {...args} />,
  <BitcoinIcon size={args.size * 2} />,
  <BitcoinIcon size={args.size * 3} />,
  <BitcoinIcon size={args.size * 4} />,
];
Default.args = {
  alt: "Alt description",
  backgroundColor: "#f7931a",
  color: "#FFF",
  size: 16,
};

export const Colored: Story = (args) => <BitcoinIcon {...args} />;
Colored.args = {
  backgroundColor: "pink",
  color: "rgb(255,0,0)",
  size: 256,
};

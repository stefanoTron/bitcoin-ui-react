import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SatsIcon from "./SatsIcon";

const meta: Meta<typeof SatsIcon> = {
  component: SatsIcon,
  title: "Icons/SatsIcon",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SatsIcon>;

export const Default: Story = (args) => [
  <SatsIcon {...args} />,
  <SatsIcon size={args.size * 2} />,
  <SatsIcon size={args.size * 3} />,
  <SatsIcon size={args.size * 4} />,
];
Default.args = {
  alt: "Alt description",
  backgroundColor: "transparent",
  color: "#000000",
  size: 16,
  tilted: false,
};

export const Tilted: Story = (args) => [
  <SatsIcon {...args} />,
  <SatsIcon {...args} tilted />,
];
Tilted.args = {
  alt: "Alt description",
  backgroundColor: "transparent",
  color: "#000000",
  size: 128,
  tilted: false,
};

export const Colored: Story = (args) => [
  <SatsIcon {...args} />,
  <SatsIcon {...args} tilted />,
];
Colored.args = {
  backgroundColor: "#f7931a",
  color: "#FFF",
  size: 256,
  tilted: false,
};

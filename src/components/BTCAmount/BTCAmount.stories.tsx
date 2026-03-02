import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import BTCAmount from "./BTCAmount";

const meta: Meta<typeof BTCAmount> = {
  component: BTCAmount,
  title: "Components/BTCAmount",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BTCAmount>;

export const TenK: Story = {
  args: {
    amount: 10000,
  },
};

export const OneBTC: Story = {
  args: { amount: 100000000 },
};

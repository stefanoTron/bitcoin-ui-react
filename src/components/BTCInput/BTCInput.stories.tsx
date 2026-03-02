import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import BTCInput from "./BTCInput";

const meta: Meta<typeof BTCInput> = {
  component: BTCInput,
  title: "Components/BTCInput",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BTCInput>;

export const Primary: Story = (args) => (
  <BTCInput data-test-id="InputField-id" {...args} />
);
Primary.args = {
  error: false,
  disabled: false,
  label: "Primary",
  amount: 1000,
};

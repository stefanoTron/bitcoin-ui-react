import type { Preview } from "@storybook/react";
import { bitcoinTheme } from "./theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    docs: {
      theme: bitcoinTheme,
    },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <div style={{ color: "#e6edf3" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;

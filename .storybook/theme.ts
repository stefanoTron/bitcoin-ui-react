import { create } from "storybook/theming";

export const bitcoinTheme = create({
  base: "dark",

  // Brand
  brandTitle: "bitcoin-ui-react",

  // Colors
  colorPrimary: "#f7931a",
  colorSecondary: "#f7931a",

  // UI
  appBg: "#0d1117",
  appContentBg: "#161b22",
  appPreviewBg: "#0d1117",
  appBorderColor: "#30363d",
  appBorderRadius: 8,

  // Text
  textColor: "#e6edf3",
  textInverseColor: "#0d1117",
  textMutedColor: "#8b949e",

  // Toolbar
  barTextColor: "#8b949e",
  barSelectedColor: "#f7931a",
  barHoverColor: "#f7931a",
  barBg: "#161b22",

  // Form
  inputBg: "#0d1117",
  inputBorder: "#30363d",
  inputTextColor: "#e6edf3",
  inputBorderRadius: 6,

  // Typography
  fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  fontCode: '"SF Mono", "Cascadia Code", "Fira Code", Menlo, Consolas, monospace',
});

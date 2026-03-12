import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BTCAmount } from "./components/BTCAmount/BTCAmount";
import { BTCInput } from "./components/BTCInput/BTCInput";
import { AddressDisplay } from "./components/AddressDisplay/AddressDisplay";
import { TransactionAmount } from "./components/TransactionAmount/TransactionAmount";
import { ConfirmationBadge } from "./components/ConfirmationBadge/ConfirmationBadge";
import { SeedPhraseInput } from "./components/SeedPhraseInput/SeedPhraseInput";
import { BalanceDisplay } from "./components/BalanceDisplay/BalanceDisplay";
import { BitcoinIcon } from "./icons/BitcoinIcon/BitcoinIcon";
import { SatsIcon } from "./icons/SatsIcon/SatsIcon";

interface Theme {
  bg: string;
  card: string;
  cardBorder: string;
  text: string;
  muted: string;
  accent: string;
  green: string;
  red: string;
  amber: string;
  inputBg: string;
}

const darkTheme: Theme = {
  bg: "#0d1117",
  card: "#161b22",
  cardBorder: "#30363d",
  text: "#e6edf3",
  muted: "#7d8590",
  accent: "#f7931a",
  green: "#3fb950",
  red: "#f85149",
  amber: "#d29922",
  inputBg: "#0d1117",
};

const lightTheme: Theme = {
  bg: "#f6f8fa",
  card: "#ffffff",
  cardBorder: "#d1d9e0",
  text: "#1f2328",
  muted: "#656d76",
  accent: "#f7931a",
  green: "#1a7f37",
  red: "#cf222e",
  amber: "#9a6700",
  inputBg: "#f6f8fa",
};

const fonts = {
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
};

const SAMPLE_SEED = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
];

const TRANSACTIONS = [
  {
    amount: 50_000_000,
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    confirmations: 142,
    label: "Mining reward",
  },
  {
    amount: -2_345_000,
    address: "bc1q9h5yjqka2yu5rg45czlc3vn2jkf5r0gm6s2f8a",
    confirmations: 6,
    label: "Lightning channel",
  },
  { amount: 15_780_000, address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", confirmations: 2, label: "Exchange deposit" },
  { amount: -890_000, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", confirmations: 0, label: "Mempool" },
];

function Card({
  title,
  children,
  style,
  t,
}: {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  t: Theme;
}) {
  return (
    <div
      style={{
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 12,
        padding: "20px 24px",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: t.muted,
          marginBottom: 16,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ children, t }: { children: React.ReactNode; t: Theme }) {
  return (
    <div style={{ fontSize: 10, color: t.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
      {children}
    </div>
  );
}

function Dashboard({ t }: { t: Theme }) {
  const [sendAmount, setSendAmount] = useState(0);
  const [seedWords, setSeedWords] = useState(Array(12).fill(""));

  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        fontFamily: fonts.sans,
        padding: 32,
        minHeight: "100vh",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <BitcoinIcon size={28} />
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Satoshi Wallet</span>
        <span style={{ fontSize: 12, color: t.muted, marginLeft: "auto" }}>bitcoin-ui-react</span>
      </div>

      {/* Balance hero */}
      <Card title="Total balance" t={t} style={{ textAlign: "center", marginBottom: 24 }}>
        <BalanceDisplay
          amount={1_987_654_321}
          fiatValue={89_432.17}
          activeColor={t.text}
          labelColor={t.muted}
          style={{ fontSize: 44, fontFamily: fonts.mono }}
        />
      </Card>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Send */}
        <Card title="Send" t={t}>
          <SectionLabel t={t}>Amount</SectionLabel>
          <BTCInput
            amount={sendAmount}
            onAmountChange={setSendAmount}
            activeColor={t.text}
            inactiveColor={t.muted}
            placeholder="0.00 000 000"
            style={{
              fontSize: 22,
              fontFamily: fonts.mono,
              background: t.inputBg,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 8,
              padding: "10px 14px",
              width: "100%",
              boxSizing: "border-box",
              color: t.text,
              caretColor: t.accent,
            }}
          />
          <div style={{ fontSize: 12, color: t.muted, marginTop: 8 }}>
            {sendAmount > 0 && (
              <span>
                <SatsIcon size={11} color={t.muted} /> {new Intl.NumberFormat("en-US").format(sendAmount)} sats
              </span>
            )}
          </div>
        </Card>

        {/* Receive */}
        <Card title="Receive address" t={t}>
          <SectionLabel t={t}>Your address</SectionLabel>
          <div style={{ fontFamily: fonts.mono, fontSize: 14 }}>
            <AddressDisplay
              address="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
              addressColor={t.text}
              separatorColor={t.muted}
              copyIconColor={t.accent}
              copiedLabel="Copied"
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <SectionLabel t={t}>Full address</SectionLabel>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, wordBreak: "break-all", lineHeight: 1.6 }}>
              <AddressDisplay
                address="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                truncate={false}
                addressColor={t.muted}
                copyable={false}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <Card title="Recent transactions" t={t} style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TRANSACTIONS.map((tx, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: i < TRANSACTIONS.length - 1 ? `1px solid ${t.cardBorder}` : "none",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{tx.label}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 12 }}>
                  <AddressDisplay
                    address={tx.address}
                    prefixChars={6}
                    suffixChars={4}
                    addressColor={t.muted}
                    separatorColor={t.muted}
                    copyable={false}
                  />
                </div>
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, textAlign: "right" }}>
                <TransactionAmount
                  amount={tx.amount}
                  positiveColor={t.green}
                  negativeColor={t.red}
                  inactiveColor={t.muted}
                  symbol="btc"
                />
              </div>
              <div style={{ minWidth: 100, textAlign: "right" }}>
                <ConfirmationBadge
                  confirmations={tx.confirmations}
                  unconfirmedColor={t.red}
                  confirmingColor={t.amber}
                  confirmedColor={t.green}
                  fontFamily={fonts.sans}
                  style={{ fontSize: 12 }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Amount display variants */}
      <Card title="Display formats" t={t} style={{ marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, textAlign: "center" }}>
          <div>
            <SectionLabel t={t}>With icon</SectionLabel>
            <div style={{ fontFamily: fonts.mono, fontSize: 18 }}>
              <BTCAmount amount={42_000_000} activeColor={t.text} inactiveColor={t.muted} symbol="btc" />
            </div>
          </div>
          <div>
            <SectionLabel t={t}>Sats icon</SectionLabel>
            <div style={{ fontFamily: fonts.mono, fontSize: 18 }}>
              <BTCAmount
                amount={42_000_000}
                activeColor={t.text}
                inactiveColor={t.muted}
                symbol={<SatsIcon size="1em" color={t.text} />}
              />
            </div>
          </div>
          <div>
            <SectionLabel t={t}>Plain</SectionLabel>
            <div style={{ fontFamily: fonts.mono, fontSize: 18 }}>
              <BTCAmount amount={42_000_000} activeColor={t.accent} inactiveColor={t.muted} />
            </div>
          </div>
        </div>
      </Card>

      {/* Seed phrase */}
      <Card title="Recovery phrase backup" t={t}>
        <div style={{ marginBottom: 12 }}>
          <SectionLabel t={t}>Read-only display</SectionLabel>
        </div>
        <SeedPhraseInput
          words={SAMPLE_SEED}
          onWordsChange={() => {}}
          readOnly
          style={{ fontSize: 13, fontFamily: fonts.mono, color: t.text, marginBottom: 24 }}
        />
        <div style={{ marginBottom: 12 }}>
          <SectionLabel t={t}>Import mode</SectionLabel>
        </div>
        <SeedPhraseInput
          words={seedWords}
          onWordsChange={setSeedWords}
          style={{ fontSize: 13, fontFamily: fonts.mono, color: t.text }}
          inputStyle={{
            background: t.inputBg,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: 6,
            color: t.text,
            padding: "6px 10px",
          }}
          dropdownStyle={{
            background: t.card,
            border: `1px solid ${t.cardBorder}`,
            color: t.text,
          }}
        />
      </Card>
    </div>
  );
}

const meta: Meta = {
  title: "Showcase",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** Dark theme wallet dashboard showcasing every component. */
export const Dark: Story = {
  render: () => <Dashboard t={darkTheme} />,
};

/** Light theme wallet dashboard showcasing every component. */
export const Light: Story = {
  render: () => <Dashboard t={lightTheme} />,
};

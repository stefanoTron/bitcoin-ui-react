import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { SeedPhraseInput } from "./SeedPhraseInput";

const meta: Meta<typeof SeedPhraseInput> = {
  title: "Components/SeedPhraseInput",
  component: SeedPhraseInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    wordCount: { control: "select", options: [12, 24] },
    columns: { control: "select", options: [2, 3, 4] },
    readOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SeedPhraseInput>;

const SAMPLE_12 = [
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

const SAMPLE_24 = [
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
  "account",
  "accuse",
  "achieve",
  "acid",
  "acoustic",
  "acquire",
  "across",
  "act",
  "action",
  "actor",
  "actress",
  "actual",
];

/** Empty 12-word grid -- default state */
export const Empty12: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstInput = canvas.getByRole("combobox", { name: "Word 1" });

    // Focus and type a prefix to trigger suggestions
    await userEvent.click(firstInput);
    await userEvent.type(firstInput, "ab");

    // Verify the suggestion dropdown appeared with matching BIP39 words
    const listbox = canvas.getByRole("listbox");
    await expect(listbox).toBeInTheDocument();
    const options = canvas.getAllByRole("option");
    await expect(options.length).toBeGreaterThan(0);
  },
};

/** Empty 24-word grid */
export const Empty24: Story = {
  render: () => {
    const [words, setWords] = useState(Array(24).fill(""));
    return <SeedPhraseInput words={words} onWordsChange={setWords} wordCount={24} />;
  },
};

/** First 3 words filled, rest empty */
export const PartiallyFilled: Story = {
  render: () => {
    const initial = Array(12).fill("");
    initial[0] = "abandon";
    initial[1] = "ability";
    initial[2] = "able";
    const [words, setWords] = useState(initial);
    return <SeedPhraseInput words={words} onWordsChange={setWords} />;
  },
};

/** All 12 words filled — onComplete fires */
export const Complete: Story = {
  render: () => {
    const [words, setWords] = useState([...SAMPLE_12]);
    const [message, setMessage] = useState("");
    return (
      <div>
        <SeedPhraseInput words={words} onWordsChange={setWords} onComplete={() => setMessage("All words valid!")} />
        {message && <p style={{ color: "#16a34a", fontWeight: 600, marginTop: 12 }}>{message}</p>}
      </div>
    );
  },
};

/** Read-only 12-word display */
export const ReadOnly: Story = {
  render: () => {
    return <SeedPhraseInput words={SAMPLE_12} onWordsChange={() => {}} readOnly />;
  },
};

/** Read-only 24-word display */
export const ReadOnly24: Story = {
  render: () => {
    return <SeedPhraseInput words={SAMPLE_24} onWordsChange={() => {}} wordCount={24} readOnly />;
  },
};

/** 3-column layout */
export const ThreeColumns: Story = {
  render: () => {
    const [words, setWords] = useState([...SAMPLE_12]);
    return <SeedPhraseInput words={words} onWordsChange={setWords} columns={3} />;
  },
};

/** 4-column layout with 24 words */
export const FourColumns: Story = {
  render: () => {
    const [words, setWords] = useState([...SAMPLE_24]);
    return (
      <div style={{ maxWidth: 640 }}>
        <SeedPhraseInput words={words} onWordsChange={setWords} wordCount={24} columns={4} />
      </div>
    );
  },
};

/** Autocomplete demo — type in any field to see BIP39 suggestions */
export const WithAutocomplete: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return (
      <div>
        <p style={{ color: "#666", marginBottom: 12 }}>
          Start typing in any field to see BIP39 autocomplete suggestions.
        </p>
        <SeedPhraseInput words={words} onWordsChange={setWords} />
      </div>
    );
  },
};

/** Interactive with progress indicator */
export const Interactive: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    const [complete, setComplete] = useState(false);
    const filled = words.filter((w: string) => w !== "").length;
    return (
      <div>
        <SeedPhraseInput
          words={words}
          onWordsChange={(w) => {
            setWords(w);
            setComplete(false);
          }}
          onComplete={() => setComplete(true)}
        />
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#666" }}>{filled}/12 words entered</span>
          {complete && <span style={{ color: "#16a34a", fontWeight: 600 }}>Complete!</span>}
        </div>
      </div>
    );
  },
};

/** Dark background theme — demonstrates inputStyle and dropdownStyle */
export const DarkTheme: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return (
      <div
        style={{
          background: "#1a1a2e",
          padding: 24,
          borderRadius: 8,
          color: "#e0e0e0",
        }}
      >
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600 }}>Recovery Phrase</h3>
        <SeedPhraseInput
          words={words}
          onWordsChange={setWords}
          inputStyle={{
            background: "#16213e",
            border: "1px solid #333",
            borderRadius: 6,
            color: "#e0e0e0",
          }}
          dropdownStyle={{
            background: "#16213e",
            border: "1px solid #333",
            color: "#e0e0e0",
          }}
        />
      </div>
    );
  },
};

/** Wallet recovery form context */
export const InAForm: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    const [complete, setComplete] = useState(false);
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 600 }}>Recover Wallet</h3>
        <p style={{ color: "#666", margin: "0 0 16px", fontSize: 13 }}>
          Enter your 12-word recovery phrase to restore your wallet.
        </p>
        <SeedPhraseInput
          words={words}
          onWordsChange={(w) => {
            setWords(w);
            setComplete(false);
          }}
          onComplete={() => setComplete(true)}
        />
        <button
          type="submit"
          disabled={!complete}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "10px 16px",
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            background: complete ? "#f7931a" : "#ccc",
            border: "none",
            borderRadius: 6,
            cursor: complete ? "pointer" : "not-allowed",
          }}
        >
          Restore Wallet
        </button>
      </form>
    );
  },
};

/** 12-word and 24-word grids side by side */
export const SideBySide: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: 32, maxWidth: 720 }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600 }}>12 words</h4>
          <SeedPhraseInput words={SAMPLE_12} onWordsChange={() => {}} readOnly />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600 }}>24 words</h4>
          <SeedPhraseInput words={SAMPLE_24} onWordsChange={() => {}} wordCount={24} readOnly />
        </div>
      </div>
    );
  },
};

/** Rounded pill-style inputs */
export const CustomInputStyle: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return (
      <SeedPhraseInput
        words={words}
        onWordsChange={setWords}
        inputStyle={{
          borderRadius: 20,
          padding: "6px 14px",
          border: "2px solid #e2e8f0",
          background: "#f8fafc",
        }}
        dropdownStyle={{
          borderRadius: 12,
          border: "2px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      />
    );
  },
};

/** Minimal underline-only inputs */
export const UnderlineStyle: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return (
      <SeedPhraseInput
        words={words}
        onWordsChange={setWords}
        inputStyle={{
          border: "none",
          borderBottom: "2px solid #ddd",
          borderRadius: 0,
          padding: "4px 0",
        }}
        dropdownStyle={{
          borderRadius: 0,
          borderTop: "2px solid #f7931a",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      />
    );
  },
};

/** Bitcoin orange accent theme */
export const BitcoinTheme: Story = {
  render: () => {
    const [words, setWords] = useState(Array(12).fill(""));
    return (
      <div style={{ background: "#fff8f0", padding: 24, borderRadius: 8 }}>
        <SeedPhraseInput
          words={words}
          onWordsChange={setWords}
          inputStyle={{
            border: "1px solid #f7931a",
            borderRadius: 6,
            background: "#fff",
            padding: "6px 10px",
          }}
          dropdownStyle={{
            border: "1px solid #f7931a",
            borderRadius: 6,
            background: "#fff",
          }}
          style={{ gap: 10 }}
        />
      </div>
    );
  },
};

import { useCallback } from "react";
import { SeedPhraseInputProps } from "./SeedPhraseInput.types";

export function SeedPhraseInput({
  words,
  onWordsChange,
  wordCount = 12,
  readOnly = false,
  onComplete,
  columns = 2,
  className,
  style,
}: SeedPhraseInputProps) {
  const handleChange = useCallback(
    (index: number, value: string) => {
      const updated = [...words];
      updated[index] = value;
      onWordsChange(updated);
    },
    [words, onWordsChange],
  );

  return (
    <div
      data-testid="seed-phrase-input"
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
        ...style,
      }}
    >
      {Array.from({ length: wordCount }, (_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <label
            htmlFor={readOnly ? undefined : `seed-word-${i}`}
            style={{ minWidth: 28, textAlign: "right" }}
          >
            {i + 1}.
          </label>
          {readOnly ? (
            <span
              style={{
                flex: 1,
                padding: "4px 8px",
              }}
            >
              {words[i] ?? ""}
            </span>
          ) : (
            <input
              id={`seed-word-${i}`}
              type="text"
              autoComplete="off"
              value={words[i] ?? ""}
              onChange={(e) => handleChange(i, e.target.value)}
              style={{
                flex: 1,
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

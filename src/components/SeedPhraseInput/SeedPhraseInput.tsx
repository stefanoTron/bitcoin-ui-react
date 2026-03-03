import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SeedPhraseInputProps } from "./SeedPhraseInput.types";
import { BIP39_ENGLISH_WORDLIST } from "../../data/bip39-english";

const MAX_SUGGESTIONS = 8;

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      const updated = [...words];
      updated[index] = value;
      onWordsChange(updated);
    },
    [words, onWordsChange],
  );

  const focusNextEmpty = useCallback(
    (afterIndex: number, updatedWords: string[]) => {
      for (let i = afterIndex + 1; i < wordCount; i++) {
        if (!updatedWords[i]) {
          inputRefs.current[i]?.focus();
          return;
        }
      }
    },
    [wordCount],
  );

  const handleSelect = useCallback(
    (index: number, word: string) => {
      const updated = [...words];
      updated[index] = word;
      onWordsChange(updated);
      setActiveIndex(null);
      focusNextEmpty(index, updated);
    },
    [words, onWordsChange, focusNextEmpty],
  );

  const currentValue = activeIndex !== null ? (words[activeIndex] ?? "") : "";
  const suggestions = useMemo(() => {
    if (activeIndex === null || currentValue.length === 0) return [];
    return BIP39_ENGLISH_WORDLIST.filter((w) =>
      w.startsWith(currentValue.toLowerCase()),
    ).slice(0, MAX_SUGGESTIONS);
  }, [activeIndex, currentValue]);

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && suggestions.length > 0) {
        e.preventDefault();
        handleSelect(index, suggestions[0]);
      }
    },
    [suggestions, handleSelect],
  );

  useEffect(() => {
    if (!onComplete) return;
    const relevantWords = words.slice(0, wordCount);
    if (relevantWords.length < wordCount) return;
    const allValid = relevantWords.every(
      (w) => w !== "" && BIP39_ENGLISH_WORDLIST.includes(w),
    );
    if (allValid) {
      onComplete(relevantWords);
    }
  }, [words, wordCount, onComplete]);

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
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            position: "relative",
          }}
        >
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
            <>
              <input
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                id={`seed-word-${i}`}
                type="text"
                autoComplete="off"
                value={words[i] ?? ""}
                onChange={(e) => handleChange(i, e.target.value)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => {
                  setTimeout(() => setActiveIndex(null), 150);
                }}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  flex: 1,
                  padding: "4px 8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
              {activeIndex === i && suggestions.length > 0 && (
                <ul
                  role="listbox"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 28,
                    right: 0,
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    background: "#fff",
                    zIndex: 10,
                    maxHeight: 200,
                    overflow: "auto",
                  }}
                >
                  {suggestions.map((word) => (
                    <li
                      key={word}
                      role="option"
                      aria-selected={false}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(i, word)}
                      style={{
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

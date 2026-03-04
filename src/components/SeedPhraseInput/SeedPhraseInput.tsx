import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SeedPhraseInputProps } from "./SeedPhraseInput.types";
import { BIP39_ENGLISH_WORDLIST } from "../../data/bip39-english";

const BIP39_WORD_SET = new Set(BIP39_ENGLISH_WORDLIST);
const MAX_SUGGESTIONS = 8;
const BLUR_DELAY_MS = 150;

/** Binary search for first word >= prefix in sorted wordlist, then collect matches. */
function findSuggestions(prefix: string): string[] {
  if (prefix.length === 0) return [];
  let lo = 0;
  let hi = BIP39_ENGLISH_WORDLIST.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (BIP39_ENGLISH_WORDLIST[mid] < prefix) lo = mid + 1;
    else hi = mid;
  }
  const result: string[] = [];
  for (let i = lo; i < BIP39_ENGLISH_WORDLIST.length && result.length < MAX_SUGGESTIONS; i++) {
    if (BIP39_ENGLISH_WORDLIST[i].startsWith(prefix)) result.push(BIP39_ENGLISH_WORDLIST[i]);
    else break;
  }
  return result;
}

export function SeedPhraseInput({
  words,
  onWordsChange,
  wordCount = 12,
  readOnly = false,
  onComplete,
  columns = 2,
  inputStyle: userInputStyle,
  dropdownStyle: userDropdownStyle,
  className,
  style,
}: SeedPhraseInputProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCompleteRef = useRef(false);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  // Cleanup blur timeout on unmount
  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  // Normalize words to always match wordCount
  const normalizedWords = useMemo(() => {
    const arr = words.slice(0, wordCount);
    while (arr.length < wordCount) arr.push("");
    return arr;
  }, [words, wordCount]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      const updated = [...wordsRef.current];
      updated[index] = value;
      onWordsChange(updated);
    },
    [onWordsChange],
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
      const updated = [...wordsRef.current];
      updated[index] = word;
      onWordsChange(updated);
      setActiveIndex(null);
      focusNextEmpty(index, updated);
    },
    [onWordsChange, focusNextEmpty],
  );

  const suggestions = useMemo(() => {
    if (activeIndex === null) return [];
    const prefix = (normalizedWords[activeIndex] ?? "").toLowerCase();
    return findSuggestions(prefix);
  }, [activeIndex, normalizedWords]);

  const suggestionsRef = useRef(suggestions);
  suggestionsRef.current = suggestions;

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && suggestionsRef.current.length > 0) {
        e.preventDefault();
        handleSelect(index, suggestionsRef.current[0]);
      }
    },
    [handleSelect],
  );

  useEffect(() => {
    if (!onComplete) return;
    const relevantWords = normalizedWords.slice(0, wordCount);
    const allValid = relevantWords.length >= wordCount && relevantWords.every(
      (w) => w !== "" && BIP39_WORD_SET.has(w),
    );
    if (allValid && !prevCompleteRef.current) {
      onComplete(relevantWords);
    }
    prevCompleteRef.current = allValid;
  }, [normalizedWords, wordCount, onComplete]);

  return (
    <div
      data-testid="seed-phrase-input"
      className={className}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${Math.ceil(wordCount / columns)}, auto)`,
        gridAutoFlow: "column",
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
              {normalizedWords[i]}
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
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                value={normalizedWords[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onFocus={() => {
                  if (blurTimeoutRef.current) {
                    clearTimeout(blurTimeoutRef.current);
                    blurTimeoutRef.current = null;
                  }
                  setActiveIndex(i);
                }}
                onBlur={() => {
                  blurTimeoutRef.current = setTimeout(() => {
                    setActiveIndex(null);
                    blurTimeoutRef.current = null;
                  }, BLUR_DELAY_MS);
                }}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  flex: 1,
                  padding: "4px 8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  background: "transparent",
                  color: "inherit",
                  ...userInputStyle,
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
                    color: "#000",
                    zIndex: 10,
                    maxHeight: 200,
                    overflow: "auto",
                    ...userDropdownStyle,
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

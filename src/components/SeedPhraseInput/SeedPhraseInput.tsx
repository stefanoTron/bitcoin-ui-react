import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SeedPhraseInputProps } from "./SeedPhraseInput.types";
import { BIP39_ENGLISH_WORDLIST } from "../../data/bip39-english";

const MAX_SUGGESTIONS = 8;
const BLUR_DELAY_MS = 150;

/** Binary search for first word >= prefix in sorted wordlist, then collect matches. */
function findSuggestions(prefix: string, wordlist: readonly string[]): string[] {
  if (prefix.length === 0) return [];
  let lo = 0;
  let hi = wordlist.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (wordlist[mid] < prefix) lo = mid + 1;
    else hi = mid;
  }
  const result: string[] = [];
  for (let i = lo; i < wordlist.length && result.length < MAX_SUGGESTIONS; i++) {
    if (wordlist[i].startsWith(prefix)) result.push(wordlist[i]);
    else break;
  }
  return result;
}

/**
 * BIP39 seed phrase input with autocomplete suggestions.
 *
 * **Security notice:** Seed phrases are held in plain React state and are visible
 * in React DevTools. Only render this component on secure (HTTPS) pages and ensure
 * no untrusted scripts have access to the page context.
 */
export function SeedPhraseInput({
  words,
  onWordsChange,
  wordCount = 12,
  readOnly = false,
  onComplete,
  columns = 2,
  inputStyle: userInputStyle,
  dropdownStyle: userDropdownStyle,
  wordlist: userWordlist,
  fontFamily = "inherit",
  groupLabel = "Seed phrase",
  labelFormatter = (i: number) => `Word ${i}`,
  className,
  style,
  ref,
}: SeedPhraseInputProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCompleteRef = useRef(false);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  const effectiveWordlist = useMemo(() => userWordlist ?? BIP39_ENGLISH_WORDLIST, [userWordlist]);
  const effectiveWordSet = useMemo(() => new Set(effectiveWordlist), [effectiveWordlist]);

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
    return findSuggestions(prefix, effectiveWordlist);
  }, [activeIndex, normalizedWords, effectiveWordlist]);

  const suggestionsRef = useRef(suggestions);
  suggestionsRef.current = suggestions;

  // Reset highlighted index when active index or suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [activeIndex, suggestions]);

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      const sug = suggestionsRef.current;
      if (sug.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % sug.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev <= 0 ? sug.length - 1 : prev - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < sug.length) {
            handleSelect(index, sug[highlightedIndex]);
          } else if (sug.length > 0) {
            handleSelect(index, sug[0]);
          }
          setHighlightedIndex(-1);
          break;
        case "Escape":
          e.preventDefault();
          setActiveIndex(null);
          setHighlightedIndex(-1);
          break;
      }
    },
    [handleSelect, highlightedIndex],
  );

  useEffect(() => {
    if (!onComplete) return;
    const relevantWords = normalizedWords.slice(0, wordCount);
    const allValid = relevantWords.length >= wordCount && relevantWords.every(
      (w) => w !== "" && effectiveWordSet.has(w),
    );
    if (allValid && !prevCompleteRef.current) {
      onComplete(relevantWords);
    }
    prevCompleteRef.current = allValid;
  }, [normalizedWords, wordCount, onComplete, effectiveWordSet]);

  return (
    <div
      ref={ref}
      data-testid="seed-phrase-input"
      role="group"
      aria-label={groupLabel}
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
            {labelFormatter(i + 1)}
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
                role="combobox"
                aria-expanded={activeIndex === i && suggestions.length > 0}
                aria-controls={`seed-suggestions-${i}`}
                aria-activedescendant={
                  activeIndex === i && highlightedIndex >= 0
                    ? `seed-option-${i}-${highlightedIndex}`
                    : undefined
                }
                aria-autocomplete="list"
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
                  fontFamily,
                  fontSize: "inherit",
                  background: "transparent",
                  color: "inherit",
                  ...userInputStyle,
                }}
              />
              {activeIndex === i && suggestions.length > 0 && (
                <ul
                  id={`seed-suggestions-${i}`}
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
                  {suggestions.map((word, idx) => (
                    <li
                      key={word}
                      id={`seed-option-${i}-${idx}`}
                      role="option"
                      aria-selected={highlightedIndex === idx}
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

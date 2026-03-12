import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import { SeedPhraseInputProps } from "./SeedPhraseInput.types";
import { BIP39_ENGLISH_WORDLIST } from "../../data/bip39-english";
import { useAutocomplete } from "./useAutocomplete";

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
  const idPrefix = useId();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const prevCompleteRef = useRef(false);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  const effectiveWordlist = useMemo(() => userWordlist ?? BIP39_ENGLISH_WORDLIST, [userWordlist]);
  const effectiveWordSet = useMemo(() => new Set(effectiveWordlist), [effectiveWordlist]);

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
      focusNextEmpty(index, updated);
    },
    [onWordsChange, focusNextEmpty],
  );

  const { activeIndex, highlightedIndex, suggestions, handleKeyDown, handleFocus, handleBlur, close } = useAutocomplete(
    {
      wordlist: effectiveWordlist,
      normalizedWords,
      onSelect: handleSelect,
    },
  );

  useEffect(() => {
    if (!onComplete) return;
    const relevantWords = normalizedWords.slice(0, wordCount);
    const allValid =
      relevantWords.length >= wordCount && relevantWords.every((w) => w !== "" && effectiveWordSet.has(w));
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
            id={`${idPrefix}-label-${i}`}
            htmlFor={readOnly ? undefined : `${idPrefix}-word-${i}`}
            style={{ minWidth: 28, textAlign: "end" }}
          >
            {labelFormatter(i + 1)}
          </label>
          {readOnly ? (
            <span
              aria-labelledby={`${idPrefix}-label-${i}`}
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
                id={`${idPrefix}-word-${i}`}
                type="text"
                autoComplete="off"
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                role="combobox"
                aria-expanded={activeIndex === i && suggestions.length > 0}
                aria-controls={`${idPrefix}-suggestions-${i}`}
                aria-activedescendant={
                  activeIndex === i && highlightedIndex >= 0 ? `${idPrefix}-option-${i}-${highlightedIndex}` : undefined
                }
                aria-autocomplete="list"
                value={normalizedWords[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onFocus={() => handleFocus(i)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  flex: 1,
                  padding: "4px 8px",
                  border: "1px solid currentColor",
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
                  id={`${idPrefix}-suggestions-${i}`}
                  role="listbox"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 28,
                    right: 0,
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    border: "1px solid currentColor",
                    borderRadius: 4,
                    background: "var(--btc-ui-color-surface, Canvas)",
                    color: "var(--btc-ui-color-on-surface, CanvasText)",
                    zIndex: 10,
                    maxHeight: 200,
                    overflow: "auto",
                    ...userDropdownStyle,
                  }}
                >
                  {suggestions.map((word, idx) => (
                    <li
                      key={word}
                      id={`${idPrefix}-option-${i}-${idx}`}
                      role="option"
                      aria-selected={highlightedIndex === idx}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        handleSelect(i, word);
                        close();
                      }}
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

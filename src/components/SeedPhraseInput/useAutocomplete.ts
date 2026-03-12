import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

interface UseAutocompleteOptions {
  wordlist: readonly string[];
  normalizedWords: string[];
  onSelect: (index: number, word: string) => void;
}

export function useAutocomplete({ wordlist, normalizedWords, onSelect }: UseAutocompleteOptions) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  const suggestions = useMemo(() => {
    if (activeIndex === null) return [];
    const prefix = (normalizedWords[activeIndex] ?? "").toLowerCase();
    return findSuggestions(prefix, wordlist);
  }, [activeIndex, normalizedWords, wordlist]);

  const suggestionsRef = useRef(suggestions);
  suggestionsRef.current = suggestions;

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [activeIndex, suggestions]);

  const close = useCallback(() => {
    setActiveIndex(null);
    setHighlightedIndex(-1);
  }, []);

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
            onSelect(index, sug[highlightedIndex]);
          } else if (sug.length > 0) {
            onSelect(index, sug[0]);
          }
          setActiveIndex(null);
          setHighlightedIndex(-1);
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    },
    [onSelect, highlightedIndex, close],
  );

  const handleFocus = useCallback((index: number) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setActiveIndex(index);
  }, []);

  const handleBlur = useCallback(() => {
    blurTimeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
      blurTimeoutRef.current = null;
    }, BLUR_DELAY_MS);
  }, []);

  return {
    activeIndex,
    highlightedIndex,
    suggestions,
    handleKeyDown,
    handleFocus,
    handleBlur,
    close,
  };
}

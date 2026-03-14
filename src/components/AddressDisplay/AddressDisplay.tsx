import { useCallback, useEffect, useRef, useState } from "react";
import { AddressDisplayProps } from "./AddressDisplay.types";
import { useBTCUIContext } from "../../context";

/** Truncated Bitcoin address display with copy-to-clipboard functionality. */
export function AddressDisplay(props: AddressDisplayProps) {
  const ctx = useBTCUIContext();
  const d = ctx?.addressDisplay;

  const {
    address,
    prefixChars = d?.prefixChars ?? 8,
    suffixChars = d?.suffixChars ?? 5,
    truncate = d?.truncate ?? true,
    separator = d?.separator ?? "...",
    copyable = d?.copyable ?? true,
    copyAriaLabel = d?.copyAriaLabel ?? "Copy address",
    onCopy,
    addressColor = d?.addressColor ?? "currentColor",
    separatorColor = d?.separatorColor ?? "var(--btc-ui-color-inactive, #999999)",
    copyIconColor = d?.copyIconColor ?? "var(--btc-ui-color-inactive, #999999)",
    copiedLabel = d?.copiedLabel ?? "Copied!",
    fontFamily = d?.fontFamily ?? ctx?.fontFamily ?? "var(--btc-ui-font-family, inherit)",
    className,
    style,
    ref,
  } = props;

  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const needsTruncation = truncate && address.length > prefixChars + suffixChars;
  const prefix = needsTruncation ? address.slice(0, prefixChars) : address;
  const suffix = needsTruncation ? address.slice(-suffixChars) : "";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      onCopy?.();
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch {
      // Clipboard API not available — silently fail
    }
  }, [address, onCopy]);

  return (
    <span
      ref={ref}
      data-testid="address-display"
      data-btc-ui=""
      role="group"
      aria-label={address}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4em",
        fontFamily,
        ...style,
      }}
    >
      <span style={{ color: addressColor }}>{prefix}</span>
      {needsTruncation && <span style={{ color: separatorColor }}>{separator}</span>}
      {needsTruncation && <span style={{ color: addressColor }}>{suffix}</span>}
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? copiedLabel : copyAriaLabel}
          aria-live="polite"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: copyIconColor,
            fontSize: "inherit",
            lineHeight: 1,
            display: "inline-flex",
          }}
        >
          {copied ? (
            <span style={{ fontSize: "0.75em", color: copyIconColor }}>{copiedLabel}</span>
          ) : (
            <svg
              aria-hidden="true"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={9} y={9} width={13} height={13} rx={2} />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      )}
    </span>
  );
}

import { useCallback, useState } from "react";
import { AddressDisplayProps } from "./AddressDisplay.types";

export function AddressDisplay({
  address,
  prefixChars = 8,
  suffixChars = 5,
  separator = "...",
  copyable = true,
  onCopy,
  addressColor = "currentColor",
  separatorColor = "#999999",
  copyIconColor = "#999999",
  copiedLabel = "Copied!",
  fontFamily = "inherit",
  className,
  style,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const needsTruncation = address.length > prefixChars + suffixChars;
  const prefix = needsTruncation ? address.slice(0, prefixChars) : address;
  const suffix = needsTruncation ? address.slice(-suffixChars) : "";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — silently fail
    }
  }, [address, onCopy]);

  return (
    <span
      data-testid="address-display"
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
      {needsTruncation && (
        <span style={{ color: separatorColor }}>{separator}</span>
      )}
      {needsTruncation && (
        <span style={{ color: addressColor }}>{suffix}</span>
      )}
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy address"
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
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x={9} y={9} width={13} height={13} rx={2} />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      )}
    </span>
  );
}

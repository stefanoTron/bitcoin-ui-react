/** Maximum satoshis (21 million BTC). */
export const MAX_SATS = 2_100_000_000_000_000;

/** Clamp a value to a valid satoshi range (0 to 2,100,000,000,000,000). */
export function clampSats(value: number): number {
  return Math.min(MAX_SATS, Math.max(0, Math.trunc(isNaN(value) ? 0 : value)));
}

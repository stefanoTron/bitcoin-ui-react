/** Clamp a value to a non-negative integer (for satoshi amounts). */
export function clampSats(value: number): number {
  return Math.max(0, Math.trunc(isNaN(value) ? 0 : value));
}

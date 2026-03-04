import { isValidElement, ReactElement } from "react";
import { BitcoinIcon } from "../icons/BitcoinIcon/BitcoinIcon";
import { SatsIcon } from "../icons/SatsIcon/SatsIcon";

/** Resolve a symbol prop into a React element. */
export function resolveSymbol(
  symbol: "btc" | "sats" | ReactElement | undefined,
): ReactElement | null {
  if (symbol === "btc") return <BitcoinIcon size="1em" />;
  if (symbol === "sats") return <SatsIcon size="1em" tilted />;
  if (isValidElement(symbol)) return symbol;
  return null;
}

import { createContext, useContext, type ReactNode } from "react";
import type { BTCAmountProps } from "./components/BTCAmount";
import type { BTCInputProps } from "./components/BTCInput";
import type { AddressDisplayProps } from "./components/AddressDisplay";
import type { TransactionAmountProps } from "./components/TransactionAmount";
import type { ConfirmationBadgeProps } from "./components/ConfirmationBadge";
import type { BalanceDisplayProps } from "./components/BalanceDisplay";
import type { SeedPhraseInputProps } from "./components/SeedPhraseInput";

export type BTCAmountDefaults = Partial<
  Pick<
    BTCAmountProps,
    | "animate"
    | "symbol"
    | "symbolPosition"
    | "activeColor"
    | "inactiveColor"
    | "satsSeparator"
    | "btcSeparator"
    | "fontFamily"
  >
>;

export type BTCInputDefaults = Partial<
  Pick<BTCInputProps, "activeColor" | "inactiveColor" | "satsSeparator" | "btcSeparator" | "fontFamily" | "placeholder">
>;

export type AddressDisplayDefaults = Partial<
  Pick<
    AddressDisplayProps,
    | "prefixChars"
    | "suffixChars"
    | "truncate"
    | "separator"
    | "copyable"
    | "copiedLabel"
    | "copyAriaLabel"
    | "addressColor"
    | "separatorColor"
    | "copyIconColor"
    | "fontFamily"
  >
>;

export type TransactionAmountDefaults = Partial<
  Pick<
    TransactionAmountProps,
    | "positiveColor"
    | "negativeColor"
    | "inactiveColor"
    | "showSign"
    | "symbol"
    | "symbolPosition"
    | "fontFamily"
    | "satsSeparator"
    | "btcSeparator"
  >
>;

export type ConfirmationBadgeDefaults = Partial<
  Pick<
    ConfirmationBadgeProps,
    | "threshold"
    | "unconfirmedColor"
    | "confirmingColor"
    | "confirmedColor"
    | "unconfirmedLabel"
    | "confirmedLabel"
    | "showCount"
    | "fontFamily"
  >
>;

export type BalanceDisplayDefaults = Partial<
  Pick<
    BalanceDisplayProps,
    "locale" | "activeColor" | "labelColor" | "showToggle" | "btcLabel" | "satsLabel" | "fontFamily" | "toggleAriaLabel"
  >
>;

export type SeedPhraseInputDefaults = Partial<
  Pick<SeedPhraseInputProps, "columns" | "inputStyle" | "dropdownStyle" | "wordlist" | "fontFamily" | "wordCount">
>;

export interface BTCUIProviderProps {
  children: ReactNode;
  /** Default font family applied to all components. Overridden by component-specific fontFamily. */
  fontFamily?: string;
  /** Defaults for BTCAmount components. */
  btcAmount?: BTCAmountDefaults;
  /** Defaults for BTCInput components. */
  btcInput?: BTCInputDefaults;
  /** Defaults for AddressDisplay components. */
  addressDisplay?: AddressDisplayDefaults;
  /** Defaults for TransactionAmount components. */
  transactionAmount?: TransactionAmountDefaults;
  /** Defaults for ConfirmationBadge components. */
  confirmationBadge?: ConfirmationBadgeDefaults;
  /** Defaults for BalanceDisplay components. */
  balanceDisplay?: BalanceDisplayDefaults;
  /** Defaults for SeedPhraseInput components. */
  seedPhraseInput?: SeedPhraseInputDefaults;
}

interface BTCUIContextValue {
  fontFamily?: string;
  btcAmount?: BTCAmountDefaults;
  btcInput?: BTCInputDefaults;
  addressDisplay?: AddressDisplayDefaults;
  transactionAmount?: TransactionAmountDefaults;
  confirmationBadge?: ConfirmationBadgeDefaults;
  balanceDisplay?: BalanceDisplayDefaults;
  seedPhraseInput?: SeedPhraseInputDefaults;
}

const BTCUIContext = createContext<BTCUIContextValue | null>(null);

export function BTCUIProvider({ children, ...defaults }: BTCUIProviderProps) {
  return <BTCUIContext.Provider value={defaults}>{children}</BTCUIContext.Provider>;
}

export function useBTCUIContext(): BTCUIContextValue | null {
  return useContext(BTCUIContext);
}

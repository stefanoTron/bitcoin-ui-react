import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BalanceDisplayProps } from "./BalanceDisplay.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";

type Unit = "btc" | "sats" | "fiat";

function formatSatsNumber(sats: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(Math.max(0, Math.trunc(isNaN(sats) ? 0 : sats)));
}

function formatFiat(value: number, code: string, locale: string): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: code }).format(value);
}

export function BalanceDisplay({
  amount,
  fiatValue,
  fiatCode = "USD",
  fiatLocale = "en-US",
  unit: controlledUnit,
  onUnitChange,
  activeColor = "currentColor",
  labelColor = "#999999",
  showToggle = true,
  btcLabel = "BTC",
  satsLabel = "sats",
  toggleAriaLabel = "Switch display unit",
  className,
  style,
}: BalanceDisplayProps) {
  const hasFiat = fiatValue !== undefined;
  const units: Unit[] = hasFiat ? ["btc", "sats", "fiat"] : ["btc", "sats"];

  const [internalUnit, setInternalUnit] = useState<Unit>("btc");
  const currentUnit = controlledUnit ?? internalUnit;

  const handleToggle = () => {
    const idx = units.indexOf(currentUnit);
    const next = units[(idx + 1) % units.length];
    if (controlledUnit === undefined) {
      setInternalUnit(next);
    }
    onUnitChange?.(next);
  };

  const label = currentUnit === "btc" ? btcLabel : currentUnit === "sats" ? satsLabel : fiatCode;

  return (
    <div
      data-testid="balance-display"
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      <div aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUnit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ color: activeColor }}
          >
            {currentUnit === "btc" && (
              <BTCAmount amount={amount} activeColor={activeColor} animate={false} />
            )}
            {currentUnit === "sats" && (
              <span aria-label={`${formatSatsNumber(amount, fiatLocale)} ${satsLabel}`}>
                {formatSatsNumber(amount, fiatLocale)}
              </span>
            )}
            {currentUnit === "fiat" && fiatValue !== undefined && (
              <span aria-label={formatFiat(fiatValue, fiatCode, fiatLocale)}>
                {formatFiat(fiatValue, fiatCode, fiatLocale)}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {showToggle ? (
        <button
          type="button"
          onClick={handleToggle}
          data-testid="balance-toggle"
          aria-label={toggleAriaLabel}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: labelColor,
            fontSize: "0.5em",
            fontFamily: "inherit",
            marginTop: "0.2em",
          }}
        >
          {label}
        </button>
      ) : (
        <span style={{ color: labelColor, fontSize: "0.5em", marginTop: "0.2em" }}>
          {label}
        </span>
      )}
    </div>
  );
}

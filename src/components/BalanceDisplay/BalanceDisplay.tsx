import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BalanceDisplayProps, BalanceUnit, FiatEntry } from "./BalanceDisplay.types";
import { BTCAmount } from "../BTCAmount/BTCAmount";
import { clampSats } from "../../utils/clampSats";

function formatSatsNumber(sats: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(clampSats(sats));
}

function formatFiat(value: number, code: string, locale: string): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: code }).format(value);
}

function resolvedFiats(props: Pick<BalanceDisplayProps, "fiats" | "fiatValue" | "fiatCode">): FiatEntry[] {
  if (props.fiats !== undefined) return props.fiats;
  if (props.fiatValue !== undefined) return [{ code: props.fiatCode ?? "USD", value: props.fiatValue }];
  return [];
}

function buildUnits(fiats: FiatEntry[]): BalanceUnit[] {
  const units: BalanceUnit[] = ["btc", "sats"];
  for (let i = 0; i < fiats.length; i++) {
    units.push(`fiat:${i}`);
  }
  return units;
}

/** Normalize "fiat" to "fiat:0" for backward compat. */
function normalizeUnit(unit: BalanceUnit): BalanceUnit {
  return unit === "fiat" ? "fiat:0" : unit;
}

/** Get the fiat index from a unit string, or -1 if not a fiat unit. */
function fiatIndex(unit: BalanceUnit): number {
  if (unit === "fiat") return 0;
  if (unit.startsWith("fiat:")) return parseInt(unit.slice(5), 10);
  return -1;
}

/** Multi-unit balance display with animated crossfade between BTC, sats, and fiat. */
export function BalanceDisplay({
  amount,
  fiats: fiatsProp,
  fiatValue,
  fiatCode = "USD",
  locale = "en-US",
  unit: controlledUnit,
  onUnitChange,
  activeColor = "currentColor",
  labelColor = "var(--btc-ui-color-inactive, #999999)",
  showToggle = true,
  btcLabel = "BTC",
  satsLabel = "sats",
  fontFamily = "inherit",
  toggleAriaLabel = "Switch display unit",
  className,
  style,
  ref,
}: BalanceDisplayProps) {
  const prefersReducedMotion = useReducedMotion();
  const fiats = resolvedFiats({ fiats: fiatsProp, fiatValue, fiatCode });
  const units = buildUnits(fiats);

  const [internalUnit, setInternalUnit] = useState<BalanceUnit>("btc");
  const currentUnit = normalizeUnit(controlledUnit ?? internalUnit);

  const handleToggle = () => {
    const idx = units.indexOf(currentUnit);
    const next = units[(idx + 1) % units.length];
    if (controlledUnit === undefined) {
      setInternalUnit(next);
    }
    onUnitChange?.(next);
  };

  const fi = fiatIndex(currentUnit);
  const currentFiat = fi >= 0 && fi < fiats.length ? fiats[fi] : undefined;

  const label =
    currentUnit === "btc"
      ? btcLabel
      : currentUnit === "sats"
        ? satsLabel
        : currentFiat?.code ?? fiatCode;

  return (
    <div
      ref={ref}
      data-testid="balance-display"
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily,
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
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            style={{ color: activeColor }}
          >
            {currentUnit === "btc" && <BTCAmount amount={amount} activeColor={activeColor} animate={false} />}
            {currentUnit === "sats" && <span>{formatSatsNumber(amount, locale)}</span>}
            {currentFiat !== undefined && (
              <span>{formatFiat(currentFiat.value, currentFiat.code, locale)}</span>
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
        <span style={{ color: labelColor, fontSize: "0.5em", marginTop: "0.2em" }}>{label}</span>
      )}
    </div>
  );
}

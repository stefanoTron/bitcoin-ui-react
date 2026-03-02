import { ChangeEventHandler } from "react";

export interface BTCInputProps {
  id?: string;
  label?: string;
  error?: boolean;
  message?: string;
  success?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  activeColor?: React.CSSProperties["color"];
  inactiveColor?: React.CSSProperties["color"];
  satsSeparator?: string;
  btcSeparator?: string;
  amount: number;
}

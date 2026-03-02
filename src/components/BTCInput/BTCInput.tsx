import React, {
  FC,
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BTCInputProps } from "./BTCInput.types";
import styles from "./BTCInput.module.css";
import { Spring, animate, useMotionValue, useSpring } from "framer-motion";

const insert = (str: string, index: number, value: string) => {
  return str.substr(0, index) + value + str.substr(index);
};

const Input: FC<BTCInputProps> = ({
  id,
  disabled,
  label,
  message,
  error,
  success,
  onChange,
  placeholder,
  activeColor = "#000000",
  inactiveColor = "#e7e7e7",
  satsSeparator = " ",
  btcSeparator = ".",
  amount = 0,
}) => {
  const handleChange = (value: string) => {
    let val = value.replace(/[^\d.-]/g, "");
    val = val.replace(".", "");

    ///0.00 000 000 -> 12length

    if (val.length >= 4) {
      val = insert(val, val.length - 3, " ");
    }
    // "0.00 000 000";
    if (val.length >= 8) {
      val = insert(val, val.length - 7, " ");
    }
    if (val.length >= 11) {
      val = insert(val, val.length - 10, ".");
    }
    console.log("-->", val, val.length);

    return val;
  };

  useEffect(() => {
    formatValue(amount);
  }, [amount]);

  //slashed zero 0̷
  const formatValue = (value = 0) => {
    let formattedString: React.ReactNode[] = []; //0.00 000 000
    if (isNaN(value)) {
      value = 0;
    }
    const valueStringArray = Math.trunc(value).toString().split("");
    const max = Math.max(valueStringArray.length, 9);
    for (let i = 0; i < max; i++) {
      const index = valueStringArray.length - 1 - i;
      let val;
      if (valueStringArray[index]) {
        val = (
          <div style={{ display: "inline", color: activeColor }}>
            {valueStringArray[index]?.toString()}
          </div>
        );
      } else {
        val = <div style={{ display: "inline", color: inactiveColor }}>0</div>;
      }

      if (i === 3 || i === 6) {
        formattedString = [satsSeparator, ...formattedString];
      }
      if (i === 8) {
        let color = inactiveColor;
        if (value >= 100000000) {
          color = activeColor;
        }
        formattedString = [
          <div style={{ display: "inline", color }}>{btcSeparator}</div>,
          ...formattedString,
        ];
      }
      formattedString = [val, ...formattedString];
    }
    return <>{formattedString}</>;
  };

  const [valueAmount, setValueAmount] = useState<string>(
    handleChange(amount.toString())
  );
  const [intAmount, setIntAmount] = useState<number>(amount);

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      style={{
        fontFamily: "SF Mono, Menlo, Futura, D-DIN",
      }}
    >
      {
        <div
          style={{
            display: "inline-block",
            position: "relative",
          }}
        >
          <input
            ref={inputRef}
            value={valueAmount}
            onChange={(e) => {
              setValueAmount(handleChange(e.target.value));
              let val = e.target.value.replace(/[^\d.-]/g, "");
              val = val.replace(".", "");
              setIntAmount(parseInt(val));
            }}
            style={{
              width: "100%",
              position: "absolute",
              caretColor: activeColor,
              textAlign: "right",
              // color: "transparent",
              color: activeColor,
              fontSize: 16,
              padding: 0,
              border: "none",
              background: "transparent",
              fontFamily: "SF Mono, Menlo, Futura, D-DIN",
            }}
            className={styles.input}
          />

          {formatValue(intAmount)}
        </div>
      }

      <div>{formatValue(2000000000)}</div>
      <div>{formatValue(12537829)}</div>
      <div>{formatValue(10000.32323)}</div>
      <div>{formatValue(100000000)}</div>
      <div>{formatValue(10000000)}</div>
      <div>{formatValue(1000000)}</div>
      <div>{formatValue(100000)}</div>
      <div>{formatValue(10000)}</div>
      <div>{formatValue(1000)}</div>
      <div>{formatValue(100)}</div>
      <div>{formatValue(10)}</div>
      <div>{formatValue(1)}</div>
      <div>{formatValue(0)}</div>
      <div>{formatValue(undefined)}</div>
    </div>
  );
};

export default Input;

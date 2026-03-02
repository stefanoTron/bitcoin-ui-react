import React, {
  FC,
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BTCAmountProps } from "./BTCAmount.types";
import styles from "./BTCAmount.module.css";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

const BTCAmount: FC<BTCAmountProps> = ({
  activeColor = "#000000",
  inactiveColor = "#e7e7e7",
  satsSeparator = " ",
  btcSeparator = ".",
  amount = 0,
  fontFamily = "SF Mono, Menlo, Futura, D-DIN",
}) => {
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
  }; /*


  

   return (
    <div
      style={{
        fontFamily,
      }}
    >
      {formatValue(amount)}
    </div>
  );*/

  const direction: string = "up";
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? amount : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 10,
  });

  useEffect(() => {
    motionValue.set(direction === "down" ? 0 : amount);
  }, [motionValue, amount]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          /*ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          );*/
          //  ref.current.appendChild(formatValue(latest));
          ref.current.innerHTML = "";
          ref.current.appendChild(document.createElement(formatValue(latest)));
        }
      }),
    [springValue]
  );

  return (
    <>
      <span ref={ref} />
    </>
  );
};

export default BTCAmount;

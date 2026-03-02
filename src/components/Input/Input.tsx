import React, { FC, Fragment } from "react";
import { InputProps } from "./Input.types";

const Input: FC<InputProps> = ({
  id,
  disabled,
  label,
  message,
  error,
  success,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <Fragment>
      <div>
        <div>{label}</div>
      </div>
      <input
        id={id}
        type="text"
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      ></input>
      <div>
        <div>{message}</div>
      </div>
    </Fragment>
  );
};

export default Input;

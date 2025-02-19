import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import classes from "./Input.module.scss";

interface Props {
  id: string;
  type: string;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  classes?: string;
  value?: string | number | Date;
  ref?: HTMLInputElement;
  readonly?: boolean;
  autocomplete?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}
const Input = React.forwardRef<IImperativeHandler, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

 
  const initialValue = props.value instanceof Date 
    ? props.value.toISOString().split("T")[0] : props.value ?? "";
  
  const [value, setValue] = useState<string | number>(initialValue);
  useEffect(() => {
    if (props.value instanceof Date) {
      setValue(props.value.toISOString().split("T")[0]);
    } else {
      setValue(props.value ?? "");
    }
  }, [props.value]);

  function inputChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
    if (props.onChange) {
      props.onChange(e);
    }
  }

  function inputFocused() {
    inputRef.current?.focus();
    inputRef.current?.setAttribute("style", "border:2px solid red");
  }

  useImperativeHandle(ref, () => {
    return {
      focus: inputFocused,
      value: String(value),
    };
  });

  return (
    <div className={`${classes.form__control} ${props.classes}`}>
      <label htmlFor={props.id}>{(`${props.id}`)}</label>
      <input
        ref={inputRef}
        id={props.id}
        minLength={props.minLength}
        maxLength={props.maxLength}
        type={props.type}
        placeholder={props.placeholder}
        value={value}
        readOnly={props.readonly || false}
        onChange={inputChangeHandler}
        autoComplete={props.autocomplete ?? "off"}
      />
    </div>
  );
});

export default Input;
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import classes from "./Input.module.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  id: string;
  options: SelectOption[];
  classes?: string;
  value?: string;
  ref?: HTMLSelectElement;
  onChange?: (event: React.FormEvent<HTMLSelectElement>) => void;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}

const Select = React.forwardRef<IImperativeHandler, Props>((props, ref) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [value, setValue] = useState(props.value ?? "");

  function selectChangeHandler(e: React.FormEvent<HTMLSelectElement>) {
    setValue(e.currentTarget.value);
    if (props.onChange) {
      props.onChange(e);
    }
  }

  function selectFocused() {
    selectRef.current?.focus();
    selectRef.current?.setAttribute("style", "border: 2px solid red");
  }

  useImperativeHandle(ref, () => {
    return {
      focus: selectFocused,
      value: String(value),
    };
  });

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <div className={`${classes.form__control} ${props.classes}`}>
      <label htmlFor={props.id}>{`${props.id}`}</label>
      <select
        ref={selectRef}
        id={props.id}
        value={value}
        onChange={selectChangeHandler}
      >
        <option value="">
          Select {props.id}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
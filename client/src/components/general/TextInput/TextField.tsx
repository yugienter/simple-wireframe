import React from "react";
import "./TextField.scss";
import { TextFieldInputProps } from ".";


const TextField: React.FC<TextFieldInputProps> = (props) => {
  const { label, className, error, name, ...fieldProps } = props;
  return (
    <div className="text-field">
      <input name={name} className={`text-field__input ${className || ""}`} {...fieldProps} />
      <div className="text-field__line"></div>
      <label
        htmlFor={name}
        className={`text-field__label ${fieldProps.value !== "" ? "text-field__valid" : ""}`}>
        {label || name}
      </label>
      {!!error && <span className="text-field__error">{error}</span>}
    </div>
  );
};

export default TextField;

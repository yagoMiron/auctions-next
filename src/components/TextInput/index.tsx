"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

interface Props {
  title?: string;
  type: "text" | "email" | "tel" | "password" | "number" | "date" | "number";
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  value: string | number;
  customValidity?: string;
  setter: Dispatch<SetStateAction<string>>;
  hideAsterisk?: boolean;
}

const TextInput = ({
  title,
  type,
  placeholder,
  maxLength,
  minLength,
  value,
  setter,
}: Props) => {
  return (
    <div className={styles.campo}>
      {title && <label>{title}:</label>}
      <input
        minLength={minLength}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength || 255}
        onChange={(e) => {
          if (setter) {
            const v = e.target.value;
            setter(v);
            e.currentTarget.setCustomValidity("");
          }
        }}
      />
    </div>
  );
};

export default TextInput;

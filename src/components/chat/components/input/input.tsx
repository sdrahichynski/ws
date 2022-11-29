import * as React from "react";
import styles from "./input.module.scss";

interface InputProps {
  onSubmit(text: string): void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    setValue("");
    onSubmit(value);
  };

  return (
    <input
      className={styles.input}
      placeholder="Message..."
      type="text"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSubmit();
      }}
    />
  );
};

export default Input;

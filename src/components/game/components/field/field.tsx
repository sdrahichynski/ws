import * as React from "react";
import styles from "./field.module.scss";

interface FieldProps {
  value: string[];

  onChange(value: string[]): void;
}

const Field: React.FC<FieldProps> = ({ value, onChange }) => {
  const size = Math.floor(Math.sqrt(value.length));
  const fieldValue = new Array(size)
    .fill(null)
    .map((_, index) => value.slice(index * size, (index + 1) * size));

  const handleClick =
    (index: number): React.MouseEventHandler =>
    () => {
      const newValue = [...value];
      newValue[index] = "red";
      onChange(newValue);
    };

  return (
    <div className={styles.wrapper}>
      {fieldValue.map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              className={styles.cell}
              onMouseDown={handleClick(rowIndex * size + cellIndex)}
              style={{ backgroundColor: cell }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Field;

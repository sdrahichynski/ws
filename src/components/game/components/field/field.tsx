import * as React from "react";
import styles from "./field.module.scss";
import {Colorpicker} from "./components";

interface FieldProps {
  value: string[];

  onChange(value: string[]): void;
}

const Field: React.FC<FieldProps> = ({ value, onChange }) => {
  const [color, setColor] = React.useState("#ea1e23");
  const size = Math.floor(Math.sqrt(value.length));
  const fieldValue = new Array(size)
    .fill(null)
    .map((_, index) => value.slice(index * size, (index + 1) * size));

  const handleClick =
    (index: number): React.MouseEventHandler =>
    () => {
      const newValue = [...value];
      newValue[index] = color;
      onChange(newValue);
    };

  return (
    <div className={styles.wrapper}>
      <Colorpicker value={color} onChange={setColor} />

      <div className={styles.field}>
        {fieldValue.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={styles.cell}
                onMouseDown={handleClick(rowIndex * size + cellIndex)}
                style={{ backgroundColor: cell }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Field;

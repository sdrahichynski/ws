import * as React from "react";
import cx from "classnames";
import { consts } from "./duck";
import styles from "./colorpicker.module.scss";

interface ColorpickerProps {
  value: string;

  onChange(color: string): void;
}

const Colorpicker: React.FC<ColorpickerProps> = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      {consts.COLORS.map((color) => (
        <div
          key={color}
          className={cx(styles.colorItem, { [styles.active]: color === value })}
          style={{ backgroundColor: color }}
          onMouseDown={() => onChange(color)}
        />
      ))}
    </div>
  );
};

export default Colorpicker;

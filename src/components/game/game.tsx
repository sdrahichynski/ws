import * as React from "react";
import * as LC from "./components";
import styles from "./game.module.css";
import { consts } from "./duck";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const [value, setValue] = React.useState(consts.DEFAULT_VALUE);

  return (
    <div className={styles.wrapper}>
      <LC.Field
        value={value}
        onChange={(newValue: typeof consts.DEFAULT_VALUE) => setValue(newValue)}
      />
    </div>
  );
};

export default Game;

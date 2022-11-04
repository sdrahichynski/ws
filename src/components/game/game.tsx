import * as React from "react";
import * as LC from "./components";
import styles from "./game.module.css";
import {io, Socket} from "socket.io-client";
import { consts } from "./duck";

interface GameProps {
  id: string;
}

const Game: React.FC<GameProps> = ({ id }) => {
  const [value, setValue] = React.useState<string[]>([]);
  const socketRef = React.useRef<Socket | null>(null);

  React.useEffect(() => {
    if (!process.env.REACT_APP_WS) return;
    const socketClient = io(process.env.REACT_APP_WS + `/game`, { transports: ["websocket"]});

    socketClient.on("connect", () => {
      console.log("connected");
    });

    socketClient.on("NEW_VALUE", (data) => {
      data && setValue(data);
    });

    socketRef.current = socketClient;
  }, []);

  return (
    <div className={styles.wrapper}>
      <LC.Field
        value={value}
        onChange={({ index, color }) => {
          const newValue = [...value.slice(0, index), color, ...value.slice(index + 1)];
          socketRef.current?.emit("UPDATE_VALUE", { index, color });
          setValue(newValue);
        }}
      />
    </div>
  );
};

export default Game;

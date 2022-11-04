import * as React from "react";
import * as LC from "./components";
import styles from "./game.module.css";
import {io, Socket} from "socket.io-client";
import { consts } from "./duck";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const [value, setValue] = React.useState<string[]>([]);
  const socketRef = React.useRef<Socket | null>(null);

  React.useEffect(() => {
    if (!process.env.REACT_APP_WS) return;
    const socketClient = io(process.env.REACT_APP_WS, { transports: ["websocket"]});

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
        onChange={(newValue: typeof consts.DEFAULT_VALUE) => {
          socketRef.current?.emit("UPDATE_VALUE", newValue);
          setValue(newValue)
        }}
      />
    </div>
  );
};

export default Game;

import * as React from "react";
import * as LC from "./components";
import styles from "./game.module.css";
import {io, Socket} from "socket.io-client";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
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

    socketClient.on("UPDATE_VALUE", ({ index, color }) => {
      setValue((oldValue) => {
        return [...oldValue.slice(0, index), color, ...oldValue.slice(index + 1)];
      });
    });

    socketRef.current = socketClient;

    // for some magic
    //@ts-ignore
    window.SOKET = socketClient;
    //@ts-ignore
    window.HELP = () => {
      socketClient.emit("RUN_BOT!");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <LC.Field
        value={value}
        onChange={({ index, color }) => {
          socketRef.current?.emit("UPDATE_VALUE", { index, color });
          setValue(oldValue => [...oldValue.slice(0, index), color, ...value.slice(index + 1)]);
        }}
      />
    </div>
  );
};

export default Game;

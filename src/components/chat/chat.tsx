import * as React from "react";
import * as LC from "./components";
import styles from "./chat.module.scss";
import { utils } from "./duck";
import { getMessages, subscribe } from "./duck/utils";

const Chat: React.FC = () => {
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    getMessages().then((data) => {
      setMessages(data);

      subscribe((message) => {
        setMessages(prev => [...prev, message]);
      });
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src="https://im.aristeksystems.com/assets/logo.png"  alt="" />
      </div>

      <div className={styles.chat}>
        <div className={styles.messages}>
          {messages.map((message, i) => (
            <div key={i} className={styles.message}>
              {message}
            </div>
          ))}
        </div>

        <div className={styles.form}>
          <LC.Input
            onSubmit={(text) => {
              utils.postMessage(text);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;

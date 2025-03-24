import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { addMessage } from "../../chatSlice";
import { SystemMessageType, MessageType, ChatMessage } from "../../types";
import { Message } from "../Message";
import styles from "./Chat.module.css"; // Import styles

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const dispatch = useDispatch();
  const messages = useSelector(
    (state: { chat: { messages: ChatMessage[] } }) => state.chat.messages
  );

  useEffect(() => {
    const chat = io("wss://potato.ipv6b.my.id:2096", {
      transports: ["websocket", "polling"],
    });

    chat.on("connect", () => {
      setSocket(chat);
      console.log("connected to chat");
    });

    chat.on("disconnect", () => {
      setSocket(null);
      console.log("disconnected from chat");
      dispatch(
        addMessage({
          type: "system",
          data: {
            text: "You were disconnected from chat!",
            timestamp: new Date().toISOString(),
          },
        })
      );
    });

    chat.on("connect_error", (err) => {
      console.error("Connection error:", err);
      dispatch(
        addMessage({
          type: "system",
          data: {
            text: "Connection error! Please try again later.",
            timestamp: new Date().toISOString(),
          },
        })
      );
    });

    chat.on("system", (systemMsg: SystemMessageType) => {
      dispatch(
        addMessage({
          type: "system",
          data: systemMsg,
        })
      );
    });

    chat.on("message", (msg: MessageType) => {
      dispatch(
        addMessage({
          type: "message",
          data: msg,
        })
      );
    });

    return () => {
      chat.disconnect();
    };
  }, [dispatch]);

  const sendMessage = useCallback(async () => {
    if (!socket || !inputText.trim()) return;

    if (inputText.startsWith("/name ")) {
      const nn = inputText.substring("/name ".length).trim();
      if (!nn) return;
      setNickname(nn);
      socket.emit("set_username", { username: nn });
    } else {
      if (!nickname) {
        alert("Please set a name using /name <yourname>");
        setInputText("/name ");
        return;
      }

      const message: MessageType = {
        text: inputText.trim(),
        username: nickname,
        timestamp: new Date().toISOString(),
      };
      socket.emit("message", message);
      setInputText("");
    }
  }, [socket, inputText, nickname]);

  return (
    <div className={styles.chatContainer}>
      <h3 className={styles.chatHeader}>Chat</h3>
      <div className={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <Message
            key={"chat-message-no-" + i}
            type={msg.type}
            data={msg.data}
          />
        ))}
      </div>
      <div className={styles.inputArea}>
        <textarea
          className={styles.messageInput}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          placeholder="Type a message..."
        />
        <button
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={!inputText.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

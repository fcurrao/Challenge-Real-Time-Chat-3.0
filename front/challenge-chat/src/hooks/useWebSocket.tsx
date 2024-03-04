import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:3000");

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [status, setStatus] = useState<"idle" | "waiting" | "writing">("idle");

  const createNewChat = () => {
    const newId = uuidv4();
    socket.emit("initialize_chat", newId);
    localStorage.setItem("uuid", newId);
    return newId;
  };

  const initializeChat = () => {
    var uuid = localStorage.getItem("uuid");
    if (uuid === null) {
      uuid = createNewChat();
    }
    fetch("http://localhost:3000/messages/" + uuid)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  };

  const sendMessage = (message: string) => {
    var uuid = localStorage.getItem("uuid");
    socket.emit("message_emitted", { message, uuid });
  };

  useEffect(() => {
    socket.on("new_message", (data: Message) => {
      console.log("data.sender", data.sender)
      if (data.sender !== "System") {
        setMessages((msg) => {
          if (msg === undefined) {
            return [data];
          }
          return [...msg, data];
        });
        return;
      }
      setStatus("writing");
      let index = 0;
      let interval = setInterval(() => {
        setMessages((msg) => {
          if (index === data.message.length) {
            clearInterval(interval);
            setStatus("idle");
          }
          const message = Array.from(data.message).splice(0, index).join("");
          index += 1;
          const nextMessage = {
            ...data,
            message,
          };
          if (msg === undefined) {
            return [nextMessage];
          }
          if (msg[msg.length - 1].sender === "System") {
            const messagesHead = msg.slice(0, msg.length - 1);
            return [...messagesHead, nextMessage];
          }
          return [...msg, nextMessage];
        });
      }, 100);
    });

    initializeChat();

    socket.on("writing", () => setStatus("waiting"));

    return () => {
      socket.off();
    };
  }, []);

  return { messages, createNewChat, initializeChat, sendMessage, status };
};

type Message = {
  sender: string;
  message: string;
  date: string;
  id: number;
};

import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useMessages } from "../hooks/useWebSocket";

export const Chat = () => {
  const { messages, initializeChat, sendMessage, createNewChat, status } =
    useMessages();
  const [inputTextValue, setInputTextValue] = useState("");

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    const el = document.getElementById("messages");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages?.length]);

  const handleSubmit = (e:any) => {
    e.preventDefault()
    sendMessage(inputTextValue);
    setInputTextValue("")
  };

  if (messages?.length === 0) {
    return (
      <div className="items-center flex justify-center min-h-full">
        <button
          className="bg-blue-500 text-white rounded-sm py-2 px-4"
          onClick={() => createNewChat()}
        >
          Start new chat
        </button>
      </div>
    );
  }

  return (
    <ChatContainer>
      <Header status={status} />
      <MessagesContainer>
        {messages?.map((message) => (
          <MyMessage
            key={message.id}
            text={message.message}
            reversed={message.sender === "System"}
          />
        ))}
      </MessagesContainer>
      <ChatTextInput
        value={inputTextValue}
        onChange={(ev, value) => setInputTextValue(value)}
        onSubmit={handleSubmit}
      />
    </ChatContainer>
  );
};

const ChatContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen bg-gray-100">
    {children}
  </div>
);

const MessagesContainer = ({ children }: { children: ReactNode }) => (
  <div
    id="messages"
    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
  >
    {children}
  </div>
);

const ChatTextInput = ({
  onChange,
  value,
  onSubmit,
}: {
  onChange: (ev: ChangeEvent<HTMLInputElement>, text: string) => void;
  value: string;
  onSubmit: (e:any) =>  void;
}) => (
  <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
    <div className="relative flex">
      <form style={{width:"80%"}}>
        <input 
          type="text"
          value={value}
          onChange={(ev) => onChange(ev, ev.target.value)}
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="submit"
            onClick={onSubmit}
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
          >
            <span className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
);

const Header = ({ status }: { status: "idle" | "writing" | "waiting" }) => (
  <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
    <div className="relative flex items-center space-x-4">
      <div className="relative">
        <span className="absolute text-green-500 right-0 bottom-0">
          <svg width="20" height="20">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
          </svg>
        </span>
        <Avatar
          showLiveIndicator
          size="large"
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <div className="text-2xl mt-1 flex items-center">
          <span className="text-gray-700 mr-3">Anderson Vanhron</span>
        </div>
        <span className="text-lg text-gray-600">Junior Developer</span>
        <span> {status === "waiting" ? "Writing..." : "Live"} </span>
      </div>
    </div>
  </div>
);

const MyMessage = ({ text, reversed }: { text: string; reversed: boolean }) => (
  <div className="chat-message">
    <div className={`flex items-end ${!reversed ? "justify-end" : ""}`}>
      <div
        className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${reversed ? "order-2 items-start" : "order-1 items-end"
          }`}
      >
        <div>
          <span
            className={`px-4 py-2 rounded-lg inline-block rounded-br-none ${reversed ? "bg-gray-300 text-gray-600" : "bg-blue-600 text-white "
              } `}
          >
            {text}
          </span>
        </div>
      </div>
      <div className={`${reversed ? "order-1" : "order-2"}`}>
        <Avatar
          size="small"
          showLiveIndicator={false}
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        />
      </div>
    </div>
  </div>
);

const Avatar = ({
  src,
  showLiveIndicator,
  size,
}: {
  src: string;
  showLiveIndicator: boolean;
  size: "small" | "large";
}) => (
  <div className="relative">
    {showLiveIndicator && (
      <span className="absolute text-green-500 right-0 bottom-0">
        <svg width="20" height="20">
          <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
        </svg>
      </span>
    )}
    <img
      src={src}
      alt=""
      className={"rounded-full " + (size === "small" ? "w-6 h-6" : "w-16 h-16")}
    />
  </div>
);

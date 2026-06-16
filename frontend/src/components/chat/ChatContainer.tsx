import ChatWindow from "./ChatWindow";
import ChatInput from "../Input/ChatInput";
import { useChat } from "../../hooks/useChat";

const ChatContainer = () => {
  const { messages, sendMessage } = useChat();

  return (
    <>
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </>
  );
};

export default ChatContainer;
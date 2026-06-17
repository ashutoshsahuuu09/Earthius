import ChatWindow from "./ChatWindow";
import ChatInput from "../Input/ChatInput";
import { useChat } from "../../hooks/useChat";

const ChatContainer = () => {
  const { messages, sendMessage, loading } = useChat();

  return (
    <>
      <ChatWindow
        messages={messages}
        loading={loading}
      />

      <ChatInput
        onSend={sendMessage}
      />
    </>
  );
};

export default ChatContainer;
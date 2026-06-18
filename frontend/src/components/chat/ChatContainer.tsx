import ChatWindow from "./ChatWindow";
import ChatInput from "../Input/ChatInput";
import { useChat } from "../../hooks/useChat";

const ChatContainer = () => {
  const {
    messages,
    sendMessage,
    regenerate,
    stopGeneration,
    loading,
  } = useChat();

  return (
    <>
      <ChatWindow
        messages={messages}
        loading={loading}
        regenerate={regenerate}
      />

      <ChatInput
        onSend={sendMessage}
        loading={loading}
        stopGeneration={stopGeneration}
      />
    </>
  );
};

export default ChatContainer;
import ChatWindow from "./ChatWindow";
import ChatInput from "../Input/ChatInput";
import WelcomeScreen from "./WelcomeScreen";
import type { Message } from "../../types/message";

interface ChatContainerProps {
  messages: Message[];
  loading: boolean;
  activeChatId: string | null;
  onSend: (text: string) => void;
  regenerate: () => void;
  stopGeneration: () => void;
  deepThink: boolean;
  webSearch: boolean;
  onToggleDeepThink: () => void;
  onToggleWebSearch: () => void;
}

const ChatContainer = ({
  messages,
  loading,
  activeChatId,
  onSend,
  regenerate,
  stopGeneration,
  deepThink,
  webSearch,
  onToggleDeepThink,
  onToggleWebSearch,
}: ChatContainerProps) => {
  const showWelcome = !activeChatId || messages.length === 0;

  return (
    <>
      {showWelcome ? (
        <WelcomeScreen onSuggestionClick={onSend} />
      ) : (
        <ChatWindow
          messages={messages}
          loading={loading}
          regenerate={regenerate}
        />
      )}

      <ChatInput
        onSend={onSend}
        loading={loading}
        stopGeneration={stopGeneration}
        deepThink={deepThink}
        webSearch={webSearch}
        onToggleDeepThink={onToggleDeepThink}
        onToggleWebSearch={onToggleWebSearch}
      />
    </>
  );
};

export default ChatContainer;
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../../types/message";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

const ChatWindow = ({ messages, loading }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div
        className="
          max-w-5xl
          mx-auto
          px-6
          py-8
          space-y-5
        "
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            message={message.content}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
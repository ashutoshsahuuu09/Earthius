import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../../types/message";
import { RotateCcw } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  regenerate: () => void;
}

const ChatWindow = ({
  messages,
  loading,
  regenerate,
}: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Find if the last message is an empty assistant message (still generating)
  const lastMessage = messages[messages.length - 1];
  const isWaitingForResponse =
    loading && lastMessage?.role === "assistant" && !lastMessage.content;

  // Filter out the empty assistant placeholder — we'll show TypingIndicator instead
  const displayMessages = isWaitingForResponse
    ? messages.slice(0, -1)
    : messages;

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
        {displayMessages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            message={message.content}
          />
        ))}

        {/* Show typing indicator while waiting for first chunk */}
        {isWaitingForResponse && <TypingIndicator />}

        {/* Regenerate Button */}
        {!loading && messages.length > 1 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={regenerate}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-slate-800
                hover:bg-slate-700
                text-slate-300
                hover:text-white
                transition
              "
            >
              <RotateCcw size={16} />
              Regenerate Response
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
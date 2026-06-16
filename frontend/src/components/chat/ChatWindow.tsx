import ChatMessage from "./ChatMessage";
import { type Message } from "../../types/message";

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role}
          message={message.content}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
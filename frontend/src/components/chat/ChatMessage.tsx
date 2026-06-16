interface ChatMessageProps {
  role: "user" | "assistant";
  message: string;
}

const ChatMessage = ({ role, message }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-3xl
          px-6
          py-4
          rounded-2xl
          shadow-md
          whitespace-pre-wrap
          break-words
          leading-8
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-slate-900 text-white border border-slate-700 rounded-bl-md"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
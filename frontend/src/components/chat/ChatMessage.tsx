import logo from "../../assets/logo.png"; // Change to your logo file
import MarkdownRenderer from "./MarkdownRenderer";
interface ChatMessageProps {
  role: "user" | "assistant";
  message: string;
}

const ChatMessage = ({ role, message }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <img
          src={logo}
          alt="Earthius"
          className="w-9 h-9 rounded-full object-cover mt-1"
        />
      )}

      {/* Message Bubble */}
      <div
        className={`
          max-w-[560px]
          px-5
          py-3
          rounded-2xl
          text-[15px]
          leading-7
          {/*whitespace-pre-wrap*/}
          break-words
          transition-all
          duration-200
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md shadow-md"
              : "bg-[#111827] border border-slate-700 text-slate-100 rounded-bl-md"
          }
        `}
      >
        <MarkdownRenderer content={message} />
      </div>
    </div>
  );
};

export default ChatMessage;
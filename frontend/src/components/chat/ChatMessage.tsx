import { useState } from "react";
import { Copy, Check } from "lucide-react";
import logo from "../../assets/logo.png";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatMessageProps {
  role: "user" | "assistant";
  message: string;
  isLast?: boolean;
}

const ChatMessage = ({ role, message, isLast }: ChatMessageProps) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <img
          src={logo}
          alt="Earthius"
          className="w-9 h-9 rounded-full object-cover mt-1"
        />
      )}

      <div className="flex flex-col max-w-[560px]">
        {/* Message Bubble */}
        <div
          className={`
            px-5
            py-3
            rounded-2xl
            text-[15px]
            leading-7
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

        {/* Actions — show on hover for assistant messages */}
        {!isUser && hovered && message && (
          <div className="flex gap-3 mt-1.5 ml-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition"
              title="Copy message"
            >
              {copied ? (
                <>
                  <Check size={13} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
import { useState } from "react";
import {
  Paperclip,
  Globe,
  Brain,
  Mic,
  SendHorizontal,
  Square,
} from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  loading: boolean;
  stopGeneration: () => void;
}

const ChatInput = ({
  onSend,
  loading,
  stopGeneration,
}: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const text = input.trim();

    if (!text || loading) return;

    onSend(text);
    setInput("");
  };

  return (
    <div className="border-t border-slate-800 bg-[#0B1120] p-3">
      <div className="flex items-center gap-3 bg-slate-900 rounded-2xl px-4 py-3 border border-slate-700">

        {/* Attach */}
        <button className="text-slate-400 hover:text-white transition">
          <Paperclip size={18} />
        </button>

        {/* Internet */}
        <button className="text-slate-400 hover:text-white transition">
          <Globe size={18} />
        </button>

        {/* Brain */}
        <button className="text-slate-400 hover:text-white transition">
          <Brain size={18} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder={
            loading
              ? "Earthius is generating..."
              : "Message Earthius..."
          }
          className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500"
        />

        {/* Voice */}
        <button className="text-slate-400 hover:text-white transition">
          <Mic size={20} />
        </button>

        {/* Send / Stop */}
        {loading ? (
          <button
            onClick={stopGeneration}
            className="bg-red-600 hover:bg-red-700 rounded-xl p-3 transition"
            title="Stop Generation"
          >
            <Square size={16} fill="white" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl p-3 transition"
            title="Send"
          >
            <SendHorizontal size={16} />
          </button>
        )}

      </div>
    </div>
  );
};

export default ChatInput;
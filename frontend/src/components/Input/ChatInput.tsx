import { useState } from "react";
import {
  Paperclip,
  Globe,
  Brain,
  Mic,
  SendHorizontal,
} from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const text = input.trim();

    if (!text) return;

    onSend(text);
    setInput("");
  };

  return (
    <div className="border-t border-slate-800 bg-[#0B1120] p-6">
      <div className="flex items-center gap-3 bg-slate-900 rounded-2xl px-5 py-4 border border-slate-700">

        {/* Attach */}
        <button className="text-slate-400 hover:text-white">
          <Paperclip size={20} />
        </button>

        {/* Internet */}
        <button className="text-slate-400 hover:text-white">
          <Globe size={20} />
        </button>

        {/* Brain */}
        <button className="text-slate-400 hover:text-white">
          <Brain size={20} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Message Earthius..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500"
        />

        {/* Voice */}
        <button className="text-slate-400 hover:text-white">
          <Mic size={20} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl p-3 transition"
        >
          <SendHorizontal size={18} />
        </button>

      </div>
    </div>
  );
};

export default ChatInput;
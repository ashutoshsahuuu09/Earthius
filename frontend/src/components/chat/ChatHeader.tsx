import { Moon, Circle } from "lucide-react";
import logo from "../../assets/logo.png"

const ChatHeader = () => {
  return (
    <header className="h-13 border-b border-slate-900 bg-[#0B1120] flex items-center justify-between px-8">

      <div className="flex items-center gap-4">

        <h1>
          <strong><a href="http://localhost:5173/">EarthiusAI</a></strong>
        </h1>

      </div>

      <div className="flex items-center gap-6">

        <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
          <Moon size={18} />
        </button>

        <div className="bg-slate-800 rounded-xl px-4 py-2">
          <span className="text-sm">
            Gemma 2B ▼
          </span>
        </div>

      </div>

    </header>
  );
};

export default ChatHeader;
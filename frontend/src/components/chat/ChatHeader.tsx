import { Moon, Circle } from "lucide-react";
import logo from "../../assets/logo.png"

const ChatHeader = () => {
  return (
    <header className="h-20 border-b border-slate-800 bg-[#0B1120] flex items-center justify-between px-8">

      <div>

        <img 
        src = {logo}
        alt = "EarthiusAI"
        className ="h-11 w-auto"
        />

        <div className="flex items-center gap-2 mt-1">
          <Circle
            size={10}
            fill="#22c55e"
            className="text-green-500"
          />

          <span className="text-sm text-slate-400">
            Online
          </span>
        </div>
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
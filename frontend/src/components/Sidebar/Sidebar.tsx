import {
  Plus,
  Search,
  BookOpen,
  Folder,
  Settings,
  User,
  MessageSquare,
} from "lucide-react";
import logo from "../../assets/logo.png"

const todayChats = [
  "Explain Quantum Computing",
  "React Best Practices",
];

const yesterdayChats = [
  "Docker vs Kubernetes",
  "Machine Learning Basics",
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#0B1120] border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">

        
        <img 
        src = {logo}
        alt = "EarthiusAI"
        className ="h-11 w-auto"
        />

        <p className="text-slate-400 text-sm mt-1">
          Your Local AI Assistant
        </p>
      </div>

      {/* New Chat */}
      <div className="px-5 pt-5">
        <button
          className="w-full flex items-center justify-center gap-2
          bg-blue-600 hover:bg-blue-700 transition
          rounded-xl py-3 font-medium"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="px-5 mt-4">
        <div className="flex items-center bg-slate-900 rounded-xl px-3 py-3">
          <Search
            className="text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search chats..."
            className="bg-transparent outline-none text-sm ml-2 flex-1 text-white"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-5 mt-6">

        <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
          Today
        </h2>

        {todayChats.map((chat) => (
          <button
            key={chat}
            className="w-full flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800 transition mb-2"
          >
            <MessageSquare size={16} />
            <span className="text-sm truncate">
              {chat}
            </span>
          </button>
        ))}

        <h2 className="text-xs uppercase tracking-wider text-slate-500 mt-6 mb-3">
          Yesterday
        </h2>

        {yesterdayChats.map((chat) => (
          <button
            key={chat}
            className="w-full flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800 transition mb-2"
          >
            <MessageSquare size={16} />
            <span className="text-sm truncate">
              {chat}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}

      <div className="border-t border-slate-800 p-5 space-y-3">

        <button className="flex items-center gap-3 w-full hover:text-blue-400 transition">
          <BookOpen size={18} />
          Knowledge Base
        </button>

        <button className="flex items-center gap-3 w-full hover:text-blue-400 transition">
          <Folder size={18} />
          Files
        </button>

        <button className="flex items-center gap-3 w-full hover:text-blue-400 transition">
          <Settings size={18} />
          Settings
        </button>

        <div className="border-t border-slate-700 pt-4 mt-4">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <p className="font-medium">
                Ashutosh
              </p>

              <p className="text-green-400 text-sm">
                ● Local Mode
              </p>
            </div>

          </div>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;
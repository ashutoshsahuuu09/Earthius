import { useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  Folder,
  Settings,
  User,
  MessageSquare,
  Trash2,
  X,
} from "lucide-react";
import type { Chat } from "../../types/chat";
import logo from "../../assets/logo.png";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSwitchChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onClearAll: () => void;
  onOpenSettings: () => void;
}

function groupChatsByDate(chats: Chat[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;
  const weekAgo = today - 7 * 86400000;

  const groups: { label: string; chats: Chat[] }[] = [
    { label: "Today", chats: [] },
    { label: "Yesterday", chats: [] },
    { label: "Previous 7 Days", chats: [] },
    { label: "Older", chats: [] },
  ];

  for (const chat of chats) {
    const t = chat.createdAt;
    if (t >= today) groups[0].chats.push(chat);
    else if (t >= yesterday) groups[1].chats.push(chat);
    else if (t >= weekAgo) groups[2].chats.push(chat);
    else groups[3].chats.push(chat);
  }

  return groups.filter((g) => g.chats.length > 0);
}

const Sidebar = ({
  chats,
  activeChatId,
  onNewChat,
  onSwitchChat,
  onDeleteChat,
  onClearAll,
  onOpenSettings,
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = searchQuery.trim()
    ? chats.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

  const groups = groupChatsByDate(filtered);

  return (
    <aside className="w-64 h-screen bg-[#0B1120] border-r border-slate-800 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <img src={logo} alt="EarthiusAI" className="h-11 w-auto" />
        <p className="text-slate-400 text-sm mt-1">
          Your Local AI Assistant
        </p>
      </div>

      {/* New Chat */}
      <div className="px-5 pt-5">
        <button
          onClick={onNewChat}
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
          <Search className="text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm ml-2 flex-1 text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-slate-400 hover:text-white transition"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-5 mt-6">
        {groups.length === 0 && (
          <p className="text-slate-500 text-sm text-center mt-8">
            {searchQuery ? "No chats found" : "No conversations yet"}
          </p>
        )}

        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3 mt-4 first:mt-0">
              {group.label}
            </h2>

            {group.chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSwitchChat(chat.id)}
                onMouseEnter={() => setHoveredId(chat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-full flex items-center gap-3 rounded-lg p-3 transition mb-1 group
                  ${
                    activeChatId === chat.id
                      ? "bg-slate-800 text-white"
                      : "hover:bg-slate-800/50 text-slate-300"
                  }`}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="text-sm truncate flex-1 text-left">
                  {chat.title}
                </span>

                {hoveredId === chat.id && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="text-slate-400 hover:text-red-400 transition flex-shrink-0"
                    title="Delete chat"
                  >
                    <Trash2 size={14} />
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-800 p-5 space-y-3">
        <button
          className="flex items-center gap-3 w-full text-slate-400 hover:text-slate-300 transition"
          title="Coming soon"
        >
          <BookOpen size={18} />
          <span className="text-sm">Knowledge Base</span>
          <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">Soon</span>
        </button>

        <button
          className="flex items-center gap-3 w-full text-slate-400 hover:text-slate-300 transition"
          title="Coming soon"
        >
          <Folder size={18} />
          <span className="text-sm">Files</span>
          <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">Soon</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-3 w-full text-slate-400 hover:text-blue-400 transition"
        >
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </button>

        {chats.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-3 w-full text-red-400/60 hover:text-red-400 transition text-sm mt-2"
          >
            <Trash2 size={16} />
            Clear All Chats
          </button>
        )}

        <div className="border-t border-slate-700 pt-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">Ashutosh</p>
              <p className="text-green-400 text-sm">● Local Mode</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
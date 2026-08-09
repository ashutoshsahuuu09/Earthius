import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { fetchModels } from "../../services/chatService";

interface ChatHeaderProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const ChatHeader = ({ selectedModel, onModelChange }: ChatHeaderProps) => {
  const [models, setModels] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchModels().then((m) => {
      setModels(m);
      // Auto-select first model if none selected
      if (!selectedModel && m.length > 0) {
        onModelChange(m[0]);
      }
    });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayName = selectedModel
    ? selectedModel.replace(":latest", "")
    : "Select Model";

  return (
    <header className="h-13 border-b border-slate-800/80 bg-[#0B1120] flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h1>
          <strong>
            <a href="/" className="hover:text-blue-400 transition">
              EarthiusAI
            </a>
          </strong>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Model Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-2 flex items-center gap-2 transition"
          >
            <span className="text-sm">
              {displayName}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
              {models.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-400">
                  No models found. Is Ollama running?
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {models.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        onModelChange(model);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-700 transition flex items-center justify-between
                        ${selectedModel === model ? "text-blue-400 bg-slate-700/50" : "text-slate-200"}`}
                    >
                      <span>{model.replace(":latest", "")}</span>
                      {selectedModel === model && (
                        <span className="text-blue-400 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
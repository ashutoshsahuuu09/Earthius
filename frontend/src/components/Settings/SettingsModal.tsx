import { useState, useEffect, useRef } from "react";
import { X, Trash2, Download, Upload } from "lucide-react";
import { fetchModels } from "../../services/chatService";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  onClearAll: () => void;
  chatCount: number;
}

const SettingsModal = ({
  isOpen,
  onClose,
  selectedModel,
  onModelChange,
  onClearAll,
  chatCount,
}: SettingsModalProps) => {
  const [models, setModels] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchModels().then(setModels);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Export chats
  const handleExport = () => {
    const data = localStorage.getItem("earthius-chats") || "[]";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `earthius-chats-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import chats
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (Array.isArray(data)) {
            localStorage.setItem("earthius-chats", JSON.stringify(data));
            window.location.reload();
          }
        } catch {
          alert("Invalid file format");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#0f1729] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-6">
          {/* Default Model */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Default Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => onModelChange(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition"
            >
              {models.length === 0 && (
                <option value="">No models found</option>
              )}
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Chat Data */}
          <div>
            <label className="text-sm text-slate-400 mb-3 block">
              Chat Data ({chatCount} conversations)
            </label>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm transition"
              >
                <Download size={16} />
                Export Chats
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm transition"
              >
                <Upload size={16} />
                Import Chats
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-slate-800 pt-5">
            <label className="text-sm text-red-400/70 mb-3 block">
              Danger Zone
            </label>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure? This will delete all your chat history."
                  )
                ) {
                  onClearAll();
                  onClose();
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm transition"
            >
              <Trash2 size={16} />
              Delete All Chats
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-500">
          Earthius v1.0 — Running locally via Ollama
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

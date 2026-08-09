import { useRef, useState, useEffect } from "react";
import {
  Paperclip,
  Globe,
  Brain,
  Mic,
  MicOff,
  SendHorizontal,
  Square,
  X,
} from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  loading: boolean;
  stopGeneration: () => void;
  deepThink: boolean;
  webSearch: boolean;
  onToggleDeepThink: () => void;
  onToggleWebSearch: () => void;
}

const ChatInput = ({
  onSend,
  loading,
  stopGeneration,
  deepThink,
  webSearch,
  onToggleDeepThink,
  onToggleWebSearch,
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    content: string;
  } | null>(null);
  const [isListening, setIsListening] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }
  }, [input]);

  // ----- File Attachment -----
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isDocument = file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx');

    if (isDocument) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error("Failed to parse document");
        }
        
        const data = await response.json();
        setAttachedFile({ name: file.name, content: data.text });
      } catch (error: any) {
        alert(error.message || "Failed to read document");
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setAttachedFile({ name: file.name, content });
      };
      reader.readAsText(file);
    }

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeFile = () => setAttachedFile(null);

  // ----- Voice Input -----
  const toggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + transcript : transcript));
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  // ----- Send -----
  const handleSend = () => {
    let text = input.trim();
    if ((!text && !attachedFile) || loading) return;

    // Prepend file content if attached
    if (attachedFile) {
      const fileBlock = `[Attached File: ${attachedFile.name}]\n\`\`\`\n${attachedFile.content}\n\`\`\`\n\n`;
      text = fileBlock + text;
      setAttachedFile(null);
    }

    onSend(text);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-800 bg-[#0B1120] p-3">
      {/* Attached file preview */}
      {attachedFile && (
        <div className="max-w-5xl mx-auto mb-2 flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300">
          <Paperclip size={14} />
          <span className="truncate flex-1">{attachedFile.name}</span>
          <button
            onClick={removeFile}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="max-w-5xl mx-auto flex items-end gap-3 bg-slate-900 rounded-2xl px-4 py-3 border border-slate-700">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.md,.py,.js,.ts,.tsx,.jsx,.json,.html,.css,.java,.cpp,.c,.h,.go,.rs,.rb,.php,.sql,.yaml,.yml,.xml,.csv,.log,.sh,.bat,.env,.cfg,.ini,.toml"
          onChange={handleFileChange}
        />

        {/* Utility Buttons */}
        <div className="flex items-center gap-1 pb-0.5">
          {/* Attach File */}
          <button
            onClick={handleFileClick}
            className={`p-1.5 rounded-lg transition ${
              attachedFile
                ? "text-blue-400 bg-blue-400/10"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title="Attach a file"
          >
            <Paperclip size={18} />
          </button>

          {/* Web Search Toggle */}
          <button
            onClick={onToggleWebSearch}
            className={`p-1.5 rounded-lg transition ${
              webSearch
                ? "text-green-400 bg-green-400/10"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title={webSearch ? "Web Search: ON" : "Web Search: OFF"}
          >
            <Globe size={18} />
          </button>

          {/* Deep Think Toggle */}
          <button
            onClick={onToggleDeepThink}
            className={`p-1.5 rounded-lg transition ${
              deepThink
                ? "text-purple-400 bg-purple-400/10"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title={deepThink ? "Deep Think: ON" : "Deep Think: OFF"}
          >
            <Brain size={18} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            loading
              ? "Earthius is generating..."
              : "Message Earthius..."
          }
          rows={1}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 resize-none leading-6 max-h-[200px] scrollbar-thin"
        />

        {/* Active toggles indicator */}
        {(deepThink || webSearch) && !loading && (
          <div className="flex gap-1 pb-0.5">
            {deepThink && (
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full">
                Think
              </span>
            )}
            {webSearch && (
              <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full">
                Web
              </span>
            )}
          </div>
        )}

        {/* Voice + Send/Stop */}
        <div className="flex items-center gap-2 pb-0.5">
          {/* Voice Input */}
          <button
            onClick={toggleVoice}
            className={`p-1.5 rounded-lg transition ${
              isListening
                ? "text-red-400 bg-red-400/10 animate-pulse"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title={isListening ? "Stop listening" : "Voice input"}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

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
              disabled={!input.trim() && !attachedFile}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl p-3 transition"
              title="Send"
            >
              <SendHorizontal size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
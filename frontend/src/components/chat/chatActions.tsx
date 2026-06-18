import { Copy, RotateCcw } from "lucide-react";

interface Props {
  onCopy: () => void;
  onRegenerate: () => void;
}

const ChatActions = ({
  onCopy,
  onRegenerate,
}: Props) => {
  return (
    <div className="flex gap-2 mt-2 ml-2">

      <button
        onClick={onCopy}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
      >
        <Copy size={14} />
        Copy
      </button>

      <button
        onClick={onRegenerate}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
      >
        <RotateCcw size={14} />
        Regenerate
      </button>

    </div>
  );
};

export default ChatActions;
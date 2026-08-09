import { ReactNode } from "react";

interface SuggestionCardProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
}

const SuggestionCard = ({
  title,
  icon,
  onClick,
}: SuggestionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="
      bg-slate-900
      hover:bg-slate-800
      border
      border-slate-700
      hover:border-slate-600
      rounded-2xl
      p-5
      transition
      duration-300
      flex
      items-center
      gap-3
      text-left
      w-full
      cursor-pointer
      active:scale-[0.98]
      "
    >
      <div className="text-2xl">
        {icon}
      </div>

      <span className="font-medium text-white">
        {title}
      </span>
    </button>
  );
};

export default SuggestionCard;
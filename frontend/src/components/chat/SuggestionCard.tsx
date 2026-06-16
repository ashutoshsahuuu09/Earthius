import { ReactNode } from "react";

interface SuggestionCardProps {
  title: string;
  icon: ReactNode;
}

const SuggestionCard = ({
  title,
  icon,
}: SuggestionCardProps) => {
  return (
    <button
      className="
      bg-slate-900
      hover:bg-slate-800
      border
      border-slate-700
      rounded-2xl
      p-5
      transition
      duration-300
      flex
      items-center
      gap-3
      text-left
      w-full
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
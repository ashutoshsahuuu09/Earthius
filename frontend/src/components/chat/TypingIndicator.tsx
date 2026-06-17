const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 px-8 py-4">
      {/* Earthius Avatar */}
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg">
        🌍
      </div>

      {/* Typing Animation */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
          <span
            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
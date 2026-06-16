import SuggestionCard from "./SuggestionCard";

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10">

      <div className="text-6xl mb-6">
        🌍
      </div>

      <h1 className="text-5xl font-bold text-white text-center">
        Welcome back, Ashutosh 👋
      </h1>

      <p className="text-slate-400 mt-5 text-center">
        I'm Earthius, your local AI assistant.
      </p>

      <div className="grid grid-cols-2 gap-5 mt-12 w-full max-w-4xl">

        <SuggestionCard
          title="Explain React"
          icon="⚛️"
        />

        <SuggestionCard
          title="Learn FastAPI"
          icon="🚀"
        />

        <SuggestionCard
          title="Blockchain Basics"
          icon="⛓️"
        />

        <SuggestionCard
          title="Build an AI Agent"
          icon="🤖"
        />

        <SuggestionCard
          title="Machine Learning"
          icon="🧠"
        />

        <SuggestionCard
          title="Python Interview Questions"
          icon="🐍"
        />

      </div>

    </div>
  );
};

export default WelcomeScreen;
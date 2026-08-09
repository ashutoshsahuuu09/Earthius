
interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}


const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-10 overflow-y-auto">

      <div className="text-6xl mb-6">
        🌍EarthiusAI
      </div>


    </div>
  );
};

export default WelcomeScreen;
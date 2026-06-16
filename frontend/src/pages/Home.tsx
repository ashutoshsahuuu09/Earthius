import ChatHeader from "../components/chat/ChatHeader";
import ChatContainer from "../components/chat/ChatContainer";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-[#020617]">
      <ChatHeader />

      <ChatContainer />
    </div>
  );
};

export default Home;
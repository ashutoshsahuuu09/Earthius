import { useState } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import ChatContainer from "../components/chat/ChatContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import SettingsModal from "../components/Settings/SettingsModal";
import { useChat } from "../hooks/useChat";

const Home = () => {
  const {
    chats,
    activeChatId,
    messages,
    loading,
    selectedModel,
    deepThink,
    webSearch,
    sendMessage,
    regenerate,
    stopGeneration,
    createNewChat,
    switchChat,
    deleteChat,
    clearAllChats,
    setSelectedModel,
    setDeepThink,
    setWebSearch,
  } = useChat();

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#020617]">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSwitchChat={switchChat}
        onDeleteChat={deleteChat}
        onClearAll={clearAllChats}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />

        <ChatContainer
          messages={messages}
          loading={loading}
          activeChatId={activeChatId}
          onSend={sendMessage}
          regenerate={regenerate}
          stopGeneration={stopGeneration}
          deepThink={deepThink}
          webSearch={webSearch}
          onToggleDeepThink={() => setDeepThink((v) => !v)}
          onToggleWebSearch={() => setWebSearch((v) => !v)}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onClearAll={clearAllChats}
        chatCount={chats.length}
      />
    </div>
  );
};

export default Home;
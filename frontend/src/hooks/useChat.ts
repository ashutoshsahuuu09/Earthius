import { useState } from "react";
import type { Message } from "../types/message";
import { askEarthius } from "../services/chatService";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm Earthius. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // User Message
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setLoading(true);

    try {
      // Ask Earthius
      const reply = await askEarthius(text);

      // AI Message
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "⚠️ Unable to connect to Earthius AI.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Hide typing indicator
      setLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    loading,
  };
};
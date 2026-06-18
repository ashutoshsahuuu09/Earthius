import { useRef, useState } from "react";
import type { Message } from "../types/message";
import {
  streamEarthius,
  type ChatMessage,
} from "../services/chatService";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm Earthius. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");

  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setLastPrompt(text);
    setLoading(true);

    abortRef.current = new AbortController();

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const aiId = Date.now() + 1;

    const aiMessage: Message = {
      id: aiId,
      role: "assistant",
      content: "",
    };

    // Build conversation history BEFORE updating state
    const conversation: ChatMessage[] = [
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      {
        role: "user",
        content: text,
      },
    ];

    // Keep only the last 20 messages
    const recentConversation = conversation.slice(-20);

    // Show user + empty assistant bubble immediately
    setMessages((prev) => [...prev, userMessage, aiMessage]);

    try {
      await streamEarthius(
        recentConversation,
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiId
                ? {
                    ...msg,
                    content: msg.content + chunk,
                  }
                : msg
            )
          );
        },
        abortRef.current.signal
      );
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiId
              ? {
                  ...msg,
                  content: "⚠️ Unable to connect to Earthius AI.",
                }
              : msg
          )
        );
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const regenerate = () => {
    if (!lastPrompt || loading) return;

    sendMessage(lastPrompt);
  };

  const stopGeneration = () => {
    abortRef.current?.abort();
    setLoading(false);
  };

  return {
    messages,
    loading,
    sendMessage,
    regenerate,
    stopGeneration,
  };
};
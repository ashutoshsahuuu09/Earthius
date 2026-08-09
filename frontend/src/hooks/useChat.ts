import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../types/message";
import type { Chat } from "../types/chat";
import { streamEarthius, type ChatMessage } from "../services/chatService";

const MAX_HISTORY = 10; // Reduced from 20 — less tokens sent = faster TTFT
const STORAGE_KEY = "earthius-chats";
const ACTIVE_KEY = "earthius-active-chat";
const MODEL_KEY = "earthius-model";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadChats(): Chat[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* ignore */
  }
  return [];
}

function saveChats(chats: Chat[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

function generateTitle(message: string): string {
  const cleaned = message.trim().replace(/\n/g, " ");
  if (cleaned.length <= 40) return cleaned;
  return cleaned.slice(0, 40) + "…";
}

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>(loadChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_KEY) || null;
  });
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem(MODEL_KEY) || "";
  });

  const [deepThink, setDeepThink] = useState(false);
  const [webSearch, setWebSearch] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const lastPromptRef = useRef<string>("");

  // Refs for stale-closure-safe access during streaming
  const chatsRef = useRef(chats);
  chatsRef.current = chats;
  const activeChatIdRef = useRef(activeChatId);
  activeChatIdRef.current = activeChatId;
  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;
  const deepThinkRef = useRef(deepThink);
  deepThinkRef.current = deepThink;
  const webSearchRef = useRef(webSearch);
  webSearchRef.current = webSearch;

  // ── Streaming buffer ────────────────────────────────────────────────────────
  // Accumulate chunks in a ref; flush to state via rAF to avoid hammering React
  const streamBufferRef = useRef<string>("");
  const rafRef = useRef<number | null>(null);
  const streamingChatIdRef = useRef<string | null>(null);
  const streamingMsgIdRef = useRef<number | null>(null);

  const flushBuffer = useCallback(() => {
    rafRef.current = null;
    const text = streamBufferRef.current;
    if (!text) return;
    streamBufferRef.current = "";

    const chatId = streamingChatIdRef.current;
    const msgId = streamingMsgIdRef.current;
    if (!chatId || msgId === null) return;

    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c; // ← skip untouched chats cheaply
        return {
          ...c,
          messages: c.messages.map((m) =>
            m.id === msgId ? { ...m, content: m.content + text } : m
          ),
        };
      })
    );
  }, []);

  const scheduleFlush = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(flushBuffer);
  }, [flushBuffer]);

  const onChunk = useCallback(
    (chunk: string) => {
      streamBufferRef.current += chunk;
      scheduleFlush();
    },
    [scheduleFlush]
  );
  // ────────────────────────────────────────────────────────────────────────────

  // Persist chats (debounced via effect, not every render)
  useEffect(() => {
    const t = setTimeout(() => saveChats(chats), 500);
    return () => clearTimeout(t);
  }, [chats]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(ACTIVE_KEY, activeChatId);
    } else {
      localStorage.removeItem(ACTIVE_KEY);
    }
  }, [activeChatId]);

  useEffect(() => {
    if (selectedModel) localStorage.setItem(MODEL_KEY, selectedModel);
  }, [selectedModel]);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;
  const messages = activeChat?.messages || [];

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: generateId(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat.id;
  }, []);

  const switchChat = useCallback((id: string) => {
    setActiveChatId(id);
  }, []);

  const deleteChat = useCallback((id: string) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    setActiveChatId((prevId) => (prevId === id ? null : prevId));
  }, []);

  const clearAllChats = useCallback(() => {
    setChats([]);
    setActiveChatId(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      lastPromptRef.current = text;
      setLoading(true);
      abortRef.current = new AbortController();

      let chatId = activeChatIdRef.current;

      if (!chatId) {
        const newId = generateId();
        const newChat: Chat = {
          id: newId,
          title: generateTitle(text),
          messages: [],
          createdAt: Date.now(),
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(newId);
        chatId = newId;
      }

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

      // Wire up streaming refs before we start
      streamingChatIdRef.current = chatId;
      streamingMsgIdRef.current = aiId;
      streamBufferRef.current = "";

      const currentChat = chatsRef.current.find((c) => c.id === chatId);
      const existingMessages = currentChat?.messages || [];

      const finalChatId = chatId;

      // Single state update: add both user + AI messages
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== finalChatId) return c;
          const isFirst = c.messages.filter((m) => m.role === "user").length === 0;
          return {
            ...c,
            title: isFirst ? generateTitle(text) : c.title,
            messages: [...c.messages, userMessage, aiMessage],
          };
        })
      );

      // Build conversation, trimmed to MAX_HISTORY and skip empty messages
      const conversation: ChatMessage[] = existingMessages
        .slice(-MAX_HISTORY)
        .filter((m) => m.content.trim() !== "")
        .map((m) => ({ role: m.role, content: m.content }));
      conversation.push({ role: "user", content: text });

      try {
        await streamEarthius(
          conversation,
          onChunk,
          abortRef.current.signal,
          selectedModelRef.current || undefined,
          deepThinkRef.current,
          webSearchRef.current
        );

        // Flush any remaining buffer
        if (streamBufferRef.current) {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
          flushBuffer();
        }
      } catch (error: unknown) {
        const err = error as { name?: string };
        if (err.name !== "AbortError") {
          setChats((prev) =>
            prev.map((c) => {
              if (c.id !== finalChatId) return c;
              return {
                ...c,
                messages: c.messages.map((msg) =>
                  msg.id === aiId
                    ? { ...msg, content: "⚠️ Unable to connect to Earthius AI." }
                    : msg
                ),
              };
            })
          );
        }
      } finally {
        streamingChatIdRef.current = null;
        streamingMsgIdRef.current = null;
        streamBufferRef.current = "";
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, onChunk, flushBuffer]
  );

  const regenerate = useCallback(() => {
    if (!lastPromptRef.current || loading) return;
    sendMessage(lastPromptRef.current);
  }, [loading, sendMessage]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    // Flush whatever is buffered before stopping
    if (streamBufferRef.current) flushBuffer();
    setLoading(false);
  }, [flushBuffer]);

  return {
    chats,
    activeChatId,
    activeChat,
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
  };
};
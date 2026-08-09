const API_URL = "http://localhost:8000";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}


//Fetch Available Models

export const fetchModels = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/models`);

    if (!response.ok) return [];

    const data = await response.json();
    return data.models || [];
  } catch {
    return [];
  }
};


//Normal Chat
export const askEarthius = async (
  messages: ChatMessage[],
  model?: string
) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      ...(model && { model }),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact backend");
  }

  const data = await response.json();

  return data.response;
};

/* --------------------------
   Streaming Chat
---------------------------*/
export const streamEarthius = async (
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
  model?: string,
  deepThink?: boolean,
  webSearch?: boolean
) => {
  const response = await fetch(`${API_URL}/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      ...(model && { model }),
      deep_think: !!deepThink,
      web_search: !!webSearch,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error("Streaming failed");
  }

  const reader = response.body?.getReader();

  if (!reader) return;

  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    if (value) {
      onChunk(decoder.decode(value, { stream: true }));
    }
  }
};
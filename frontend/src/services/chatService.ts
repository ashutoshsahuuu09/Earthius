const API_URL = "http://localhost:8000";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* --------------------------
   Normal Chat
---------------------------*/
export const askEarthius = async (
  messages: ChatMessage[]
) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
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
  signal?: AbortSignal
) => {
  const response = await fetch(`${API_URL}/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
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

    const chunk = decoder.decode(value);

    // Send chunk to UI
    onChunk(chunk);

    // Smooth typing delay
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
};
import { ollama } from "../api/ollama";

export const askEarthius = async (prompt: string) => {
  const response = await ollama.post("/api/generate", {
    model: "gemma:2b",
    prompt,
    stream: false,
  });

  return response.data.response;
};
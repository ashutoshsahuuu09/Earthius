const API_URL = "http://localhost:8000";

export const askEarthius = async (message: string) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact Earthius backend");
  }

  const data = await response.json();

  return data.response;
};
import Groq from "groq-sdk";

let cachedGroqClient: Groq | null = null;

export function getGroqClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("GROQ_API_KEY is not configured on the server");
  }

  if (!cachedGroqClient) {
    cachedGroqClient = new Groq({
      apiKey: apiKey.trim(),
    });
  }

  return cachedGroqClient;
}

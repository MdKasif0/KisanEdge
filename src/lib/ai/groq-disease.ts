import Groq from "groq-sdk";

let cachedDiseaseGroqClient: Groq | null = null;

/**
 * Returns a dedicated Groq client for vision-based disease detection.
 * Strictly uses GROQ_DISEASE_API_KEY (independent of GROQ_API_KEY).
 */
export function getDiseaseGroqClient(): Groq {
  const apiKey = process.env.GROQ_DISEASE_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("GROQ_DISEASE_API_KEY is not configured on the server");
  }

  if (!cachedDiseaseGroqClient) {
    cachedDiseaseGroqClient = new Groq({
      apiKey: apiKey.trim(),
    });
  }

  return cachedDiseaseGroqClient;
}

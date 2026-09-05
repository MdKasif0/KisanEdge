import { ChatRequest, ChatRole } from "@/types/ai";

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitizedRequest?: ChatRequest;
}

const MAX_MESSAGE_LENGTH = 4000;
const MAX_CONVERSATION_HISTORY = 20;

export function validateChatRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const { message, conversation, context } = body as Record<string, unknown>;

  // 1. Validate Message
  if (typeof message !== "string") {
    return { valid: false, error: "Missing or invalid 'message' field (must be a string)" };
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return { valid: false, error: "Message cannot be empty" };
  }

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message exceeds maximum allowed length of ${MAX_MESSAGE_LENGTH} characters` };
  }

  // 2. Validate Conversation
  const sanitizedConversation: { role: ChatRole; content: string }[] = [];

  if (conversation !== undefined) {
    if (!Array.isArray(conversation)) {
      return { valid: false, error: "'conversation' must be an array of messages" };
    }

    for (let i = 0; i < conversation.length; i++) {
      const item = conversation[i];
      if (!item || typeof item !== "object") {
        return { valid: false, error: `Invalid message item at conversation index ${i}` };
      }

      const role = (item as Record<string, unknown>).role;
      const content = (item as Record<string, unknown>).content;

      if (role !== "user" && role !== "assistant") {
        return { valid: false, error: `Invalid role at conversation index ${i}. Only 'user' and 'assistant' are permitted` };
      }

      if (typeof content !== "string") {
        return { valid: false, error: `Invalid message content at conversation index ${i} (must be a string)` };
      }

      const trimmedContent = content.trim();
      if (trimmedContent.length > MAX_MESSAGE_LENGTH) {
        return { valid: false, error: `Message at index ${i} exceeds maximum allowed length` };
      }

      sanitizedConversation.push({
        role,
        content: trimmedContent,
      });
    }
  }

  // Window conversation history to the most recent messages
  const windowedConversation = sanitizedConversation.slice(-MAX_CONVERSATION_HISTORY);

  // 3. Validate Context (optional)
  let sanitizedContext = undefined;
  if (context !== undefined) {
    if (typeof context !== "object" || context === null) {
      return { valid: false, error: "'context' must be an object if provided" };
    }
    sanitizedContext = context as any;
  }

  return {
    valid: true,
    sanitizedRequest: {
      message: trimmedMessage,
      conversation: windowedConversation,
      context: sanitizedContext,
    },
  };
}

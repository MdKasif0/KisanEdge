import { NextRequest, NextResponse } from "next/server";
import { getGroqClient } from "@/lib/ai/groq";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { validateChatRequest } from "@/lib/ai/validation";
import { ChatResponse } from "@/types/ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse<ChatResponse>> {
  const startTime = Date.now();

  try {
    // 1. Parse JSON body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_JSON",
            message: "Malformed request payload. JSON expected.",
          },
        },
        { status: 400 }
      );
    }

    // 2. Validate request
    const validation = validateChatRequest(body);
    if (!validation.valid || !validation.sanitizedRequest) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: validation.error || "Invalid request format.",
          },
        },
        { status: 400 }
      );
    }

    const { message, conversation = [], context } = validation.sanitizedRequest;

    // 3. Initialize Groq client
    let groq;
    try {
      groq = getGroqClient();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("[KisanEdge AI] Server configuration error:", errorMessage);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "AI_CONFIG_ERROR",
            message: "KisanEdge AI is temporarily unavailable (configuration error).",
          },
        },
        { status: 500 }
      );
    }

    // 4. Build System Prompt with Application Context
    const systemPrompt = buildSystemPrompt(context);

    // 5. Construct Groq chat messages (system prompt + windowed history + current message)
    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...conversation.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    console.log(
      `[KisanEdge AI] Request started. Model: openai/gpt-oss-120b, Role: ${context?.role || "unknown"}, Context crops: ${context?.crop || "none"}, Turns: ${conversation.length}`
    );

    // 6. Execute model completion with reasoning_effort: "medium"
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      reasoning_effort: "medium",
      max_tokens: 1024,
      temperature: 0.6,
    });

    const latency = Date.now() - startTime;
    console.log(`[KisanEdge AI] Request completed in ${latency}ms`);

    // 7. Extract response content (discard reasoning tokens)
    const choice = completion.choices[0];
    const aiContent = choice?.message?.content?.trim();

    if (!aiContent) {
      console.error("[KisanEdge AI] Empty response received from Groq");
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "EMPTY_RESPONSE",
            message: "KisanEdge AI returned an empty response. Please rephrase or try again.",
          },
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: {
        role: "assistant",
        content: aiContent,
      },
    });
  } catch (error: any) {
    const latency = Date.now() - startTime;
    const status = error?.status || 500;
    const errorCode = error?.code || error?.error?.code || "AI_UNAVAILABLE";

    console.error(`[KisanEdge AI] Error after ${latency}ms:`, {
      status,
      code: errorCode,
      message: error?.message || "Unknown error",
    });

    // Friendly messages for known error conditions
    if (status === 429 || errorCode === "rate_limit_exceeded") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: "KisanEdge AI is experiencing high demand. Please wait a moment and try again.",
          },
        },
        { status: 429 }
      );
    }

    if (error?.name === "AbortError" || error?.code === "ETIMEDOUT") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "TIMEOUT",
            message: "Request timed out. Please check your connection and try again.",
          },
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "AI_UNAVAILABLE",
          message: "Sorry, KisanEdge AI is temporarily unavailable. Please try again.",
        },
      },
      { status: 503 }
    );
  }
}

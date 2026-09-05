import { NextRequest, NextResponse } from "next/server";
import { getDiseaseGroqClient } from "@/lib/ai/groq-disease";
import { buildDiseaseSystemPrompt, USER_ANALYSIS_INSTRUCTION } from "@/lib/ai/disease-prompt";
import { validateImageUpload, sanitizeDiseaseResult, MAX_IMAGE_SIZE_BYTES } from "@/lib/ai/disease-validation";
import { DiseaseDetectionContext, DiseaseDetectionResponse } from "@/types/disease";

export const runtime = "nodejs";

const TIMEOUT_MS = 45000; // 45 seconds timeout

export async function POST(req: NextRequest): Promise<NextResponse<DiseaseDetectionResponse>> {
  const startTime = Date.now();

  try {
    let imageDataUrl: string = "";
    let imageMimeType: string = "image/jpeg";
    let imageSize: number = 0;
    const context: DiseaseDetectionContext = {};

    const contentType = req.headers.get("content-type") || "";

    // 1. Handle multipart/form-data or application/json
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("image") as File | null;

      if (!file) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "MISSING_IMAGE",
              message: "Please select or capture a plant image to analyze.",
            },
          },
          { status: 400 }
        );
      }

      imageSize = file.size;
      imageMimeType = file.type || "image/jpeg";

      const validation = validateImageUpload(imageSize, imageMimeType);
      if (!validation.valid && validation.error) {
        return NextResponse.json(
          {
            success: false,
            error: validation.error,
          },
          { status: 400 }
        );
      }

      // Convert buffer to base64 data URL
      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      imageDataUrl = `data:${imageMimeType};base64,${base64}`;

      // Extract optional fields
      context.crop = (formData.get("crop") as string) || undefined;
      context.plant = (formData.get("plant") as string) || undefined;
      context.language = (formData.get("language") as string) || undefined;
      context.location = (formData.get("location") as string) || undefined;
      context.growthStage = (formData.get("growthStage") as string) || undefined;
      context.additionalContext = (formData.get("additionalContext") as string) || undefined;

      const tempVal = formData.get("temperature");
      if (tempVal) context.temperature = Number(tempVal);
      const humVal = formData.get("humidity");
      if (humVal) context.humidity = Number(humVal);
      const rainVal = formData.get("rainProbability");
      if (rainVal) context.rainProbability = Number(rainVal);
      const soilMVal = formData.get("soilMoisture");
      if (soilMVal) context.soilMoisture = Number(soilMVal);
      const soilTVal = formData.get("soilTemperature");
      if (soilTVal) context.soilTemperature = Number(soilTVal);
    } else {
      // JSON body fallback
      let jsonBody: any;
      try {
        jsonBody = await req.json();
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "INVALID_JSON",
              message: "Malformed request payload.",
            },
          },
          { status: 400 }
        );
      }

      if (!jsonBody?.image || typeof jsonBody.image !== "string") {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "MISSING_IMAGE",
              message: "Please provide an image Data URL in the 'image' field.",
            },
          },
          { status: 400 }
        );
      }

      imageDataUrl = jsonBody.image;
      // Estimate size from base64 string
      imageSize = Math.round((imageDataUrl.length * 3) / 4);
      const match = imageDataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,/);
      imageMimeType = match ? match[1] : "image/jpeg";

      const validation = validateImageUpload(imageSize, imageMimeType);
      if (!validation.valid && validation.error) {
        return NextResponse.json(
          {
            success: false,
            error: validation.error,
          },
          { status: 400 }
        );
      }

      context.crop = jsonBody.crop;
      context.plant = jsonBody.plant;
      context.language = jsonBody.language;
      context.location = jsonBody.location;
      context.growthStage = jsonBody.growthStage;
      context.additionalContext = jsonBody.additionalContext;
      context.temperature = jsonBody.temperature;
      context.humidity = jsonBody.humidity;
      context.rainProbability = jsonBody.rainProbability;
      context.soilMoisture = jsonBody.soilMoisture;
      context.soilTemperature = jsonBody.soilTemperature;
    }

    // 2. Initialize dedicated Groq Disease client (strictly GROQ_DISEASE_API_KEY)
    let groqDisease;
    try {
      groqDisease = getDiseaseGroqClient();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("[KisanEdge Disease AI] Groq Disease client configuration error:", errorMessage);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CONFIG_ERROR",
            message: "KisanEdge disease detection service is not properly configured.",
          },
        },
        { status: 500 }
      );
    }

    // 3. Build system prompt
    const systemPrompt = buildDiseaseSystemPrompt(context);

    console.log(
      `[KisanEdge Disease AI] Starting analysis with qwen/qwen3.8-27b. Image size: ${(imageSize / 1024).toFixed(1)} KB. Crop: ${context.crop || "unspecified"}`
    );

    // 4. Execute with timeout and controlled retry (max 1 retry for transient issues)
    let completion: any;
    let lastError: any = null;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        completion = await groqDisease.chat.completions.create(
          {
            model: "qwen/qwen3.8-27b",
            max_tokens: 3000,
            reasoning_effort: "medium",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: USER_ANALYSIS_INSTRUCTION,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: imageDataUrl,
                    },
                  },
                ],
              },
            ],
          },
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);
        break; // Success, exit retry loop
      } catch (err: any) {
        lastError = err;
        console.warn(`[KisanEdge Disease AI] Attempt ${attempt} failed:`, err?.message || err);
        if (
          attempt === 1 &&
          (err?.status === 429 ||
            err?.code === "ETIMEDOUT" ||
            err?.message?.includes("json_validate_failed") ||
            err?.message?.includes("completion tokens"))
        ) {
          // Wait 1.5s before retry
          await new Promise((resolve) => setTimeout(resolve, 1500));
          continue;
        }
        throw err;
      }
    }

    const latency = Date.now() - startTime;
    console.log(`[KisanEdge Disease AI] Model completion finished in ${latency}ms`);

    // 5. Extract and sanitize structured result
    const choice = completion?.choices?.[0];
    const rawContent = choice?.message?.content?.trim();

    if (!rawContent) {
      console.error("[KisanEdge Disease AI] Model returned empty content");
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "EMPTY_DIAGNOSIS",
            message: "Unable to analyze this image right now. Please try again with a clearer photo.",
          },
        },
        { status: 502 }
      );
    }

    const sanitized = sanitizeDiseaseResult(rawContent);
    sanitized.id = `scan-${Date.now()}`;
    sanitized.timestamp = new Date().toISOString();

    return NextResponse.json({
      success: true,
      result: sanitized,
    });
  } catch (error: any) {
    const latency = Date.now() - startTime;
    const status = error?.status || 500;
    const errorCode = error?.code || error?.error?.code || "AI_UNAVAILABLE";
    const rawMsg = error?.message || error?.error?.message || "";

    console.error(`[KisanEdge Disease AI] Error after ${latency}ms:`, {
      status,
      code: errorCode,
      message: rawMsg || "Unknown error",
    });

    if (error?.name === "AbortError") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "TIMEOUT",
            message: "Plant image analysis timed out. Please try again with a smaller or clearer photo.",
          },
        },
        { status: 504 }
      );
    }

    if (status === 429 || errorCode === "rate_limit_exceeded") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many scans are being processed right now. Please try again shortly.",
          },
        },
        { status: 429 }
      );
    }

    if (status === 400) {
      // Differentiate between JSON generation failure and actual image decoding error
      if (
        rawMsg.includes("json_validate_failed") ||
        rawMsg.includes("Failed to generate JSON") ||
        rawMsg.includes("completion tokens")
      ) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "MODEL_GENERATION_FAILED",
              message: "Unable to complete disease diagnosis for this image right now. Please retake the photo closer to the affected leaf in good lighting.",
            },
          },
          { status: 502 }
        );
      }

      if (rawMsg.toLowerCase().includes("image") || errorCode === "invalid_image") {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "INVALID_IMAGE",
              message: "The uploaded image could not be decoded. Please upload a clear photo in JPEG, PNG, or WebP format.",
            },
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Unable to analyze this image. Please upload a clear photo of the plant.",
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "AI_UNAVAILABLE",
          message: "KisanEdge disease detection is temporarily unavailable. Please try again.",
        },
      },
      { status: 503 }
    );
  }
}

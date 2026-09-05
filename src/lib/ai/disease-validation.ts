import { DiseaseDetectionResult, DiseaseStatus, Severity, EnvironmentalRisk } from "@/types/disease";

export const MAX_IMAGE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const VALID_STATUSES: DiseaseStatus[] = [
  "healthy",
  "disease_detected",
  "pest_detected",
  "nutrient_deficiency_possible",
  "environmental_stress",
  "poor_image",
  "not_a_plant",
  "uncertain",
];

const VALID_SEVERITIES: Severity[] = [
  "healthy",
  "early",
  "mild",
  "moderate",
  "severe",
  "critical",
  "unknown",
];

const VALID_RISKS: EnvironmentalRisk[] = ["low", "moderate", "high", "unknown"];

export interface ImageValidationResult {
  valid: boolean;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Validates image buffer or file before forwarding to Groq vision model.
 */
export function validateImageUpload(size: number, mimeType: string): ImageValidationResult {
  if (size <= 0) {
    return {
      valid: false,
      error: {
        code: "EMPTY_IMAGE",
        message: "The uploaded image file is empty or corrupted.",
      },
    };
  }

  if (size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: {
        code: "IMAGE_TOO_LARGE",
        message: "Please upload an image smaller than 20 MB.",
      },
    };
  }

  // Normalize mime type
  const normalizedMime = mimeType.toLowerCase();
  const isAllowed = ALLOWED_MIME_TYPES.some((allowed) => normalizedMime.includes(allowed) || allowed.includes(normalizedMime));

  if (!isAllowed) {
    return {
      valid: false,
      error: {
        code: "UNSUPPORTED_IMAGE_TYPE",
        message: "Unsupported image format. Please upload a JPEG, PNG, or WebP photo.",
      },
    };
  }

  return { valid: true };
}

/**
 * Validates and sanitizes raw model output to ensure complete schema conformance.
 */
export function sanitizeDiseaseResult(rawText: string): DiseaseDetectionResult {
  let jsonString = rawText.trim();

  // Strip markdown code fences if model enclosed JSON in ```json ... ```
  if (jsonString.startsWith("```")) {
    jsonString = jsonString.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    console.error("[KisanEdge Disease AI] Failed to parse model JSON:", rawText);
    throw new Error("Model response was not valid JSON");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Parsed model output is not an object");
  }

  // 1. Status
  let status: DiseaseStatus = VALID_STATUSES.includes(parsed.status) ? parsed.status : "uncertain";

  // 2. Plant Detected
  let plantDetected = Boolean(parsed.plantDetected);

  // Enforce consistency: if either indicates no plant, set to not_a_plant
  if (status === "not_a_plant" || !plantDetected) {
    status = "not_a_plant";
    plantDetected = false;
  }

  // 3. Plant Type & Part
  const plantType = plantDetected && typeof parsed.plantType === "string" && parsed.plantType.trim() ? parsed.plantType.trim() : null;
  const plantPart = plantDetected && typeof parsed.plantPart === "string" && parsed.plantPart.trim() ? parsed.plantPart.trim() : null;

  // 4. Condition Name
  let conditionName = typeof parsed.conditionName === "string" && parsed.conditionName.trim() ? parsed.conditionName.trim() : null;
  if (!plantDetected) {
    conditionName = "No Plant Detected";
  }

  // 5. Confidence (0 to 100)
  let confidence = typeof parsed.confidence === "number" ? Math.round(parsed.confidence) : 50;
  // If model returned fraction (0.0 - 1.0), scale to 0 - 100
  if (confidence <= 1 && confidence > 0) {
    confidence = Math.round(confidence * 100);
  }
  confidence = Math.max(0, Math.min(100, confidence));

  // 6. Severity
  const severity: Severity = plantDetected && VALID_SEVERITIES.includes(parsed.severity) ? parsed.severity : (plantDetected ? "unknown" : "healthy");

  // 7. Affected Area Percent
  let affectedAreaPercent: number | null = null;
  if (plantDetected && typeof parsed.affectedAreaPercent === "number" && !isNaN(parsed.affectedAreaPercent)) {
    affectedAreaPercent = Math.max(0, Math.min(100, Math.round(parsed.affectedAreaPercent)));
  }

  // 8. Observed Symptoms
  const observedSymptoms: string[] = plantDetected && Array.isArray(parsed.observedSymptoms)
    ? parsed.observedSymptoms.filter((s: any) => typeof s === "string" && s.trim().length > 0).map((s: string) => s.trim())
    : [];

  // 9. Explanation
  const explanation = typeof parsed.explanation === "string" && parsed.explanation.trim()
    ? parsed.explanation.trim()
    : (!plantDetected
        ? "No plant, leaf, or crop was detected in this photo. The image shows a person, room, or non-plant object."
        : "Visual analysis completed for the provided plant image.");

  // 10. Alternative Conditions (limit to 3)
  const alternativeConditions: { name: string; reason: string }[] = plantDetected && Array.isArray(parsed.alternativeConditions)
    ? parsed.alternativeConditions
        .filter((c: any) => c && typeof c === "object" && c.name)
        .slice(0, 3)
        .map((c: any) => ({
          name: String(c.name).trim(),
          reason: typeof c.reason === "string" ? c.reason.trim() : "",
        }))
    : [];

  // 11. Recommended Actions
  let recommendedActions: string[] = [];
  if (!plantDetected) {
    recommendedActions = [
      "Point the camera directly at a plant leaf, stem, or crop",
      "Ensure good natural lighting and sharp focus on the foliage",
      "Hold the camera 10–20 cm away from the affected area to capture leaf details",
    ];
  } else if (Array.isArray(parsed.recommendedActions) && parsed.recommendedActions.length > 0) {
    recommendedActions = parsed.recommendedActions.filter((a: any) => typeof a === "string" && a.trim().length > 0).map((a: string) => a.trim());
  } else {
    recommendedActions = [
      "Inspect the plant regularly under natural lighting.",
      "Ensure proper airflow and avoid unnecessary leaf moisture.",
      "Consult local agricultural guidance if symptoms worsen.",
    ];
  }

  // 12. Warnings
  const warnings: string[] = Array.isArray(parsed.warnings)
    ? parsed.warnings.filter((w: any) => typeof w === "string" && w.trim().length > 0).map((w: string) => w.trim())
    : [];

  if (!plantDetected) {
    warnings.push("Please photograph a real agricultural crop or plant part to receive a health diagnosis.");
  } else {
    const standardWarning = "This is an AI visual assessment and not a laboratory-confirmed diagnosis.";
    if (!warnings.some((w) => w.toLowerCase().includes("laboratory"))) {
      warnings.push(standardWarning);
    }
  }

  // 13. Flags & Environmental Risk
  const needsBetterImage = Boolean(parsed.needsBetterImage || status === "poor_image" || !plantDetected);
  const expertVerificationRecommended = Boolean(
    plantDetected && (parsed.expertVerificationRecommended || severity === "severe" || severity === "critical" || status === "uncertain")
  );
  const environmentalRisk: EnvironmentalRisk = plantDetected && VALID_RISKS.includes(parsed.environmentalRisk) ? parsed.environmentalRisk : "unknown";

  return {
    status,
    plantDetected,
    plantType,
    plantPart,
    conditionName,
    confidence,
    severity,
    affectedAreaPercent,
    observedSymptoms,
    explanation,
    alternativeConditions,
    recommendedActions,
    warnings,
    needsBetterImage,
    expertVerificationRecommended,
    environmentalRisk,
  };
}

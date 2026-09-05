export type DiseaseStatus =
  | "healthy"
  | "disease_detected"
  | "pest_detected"
  | "nutrient_deficiency_possible"
  | "environmental_stress"
  | "poor_image"
  | "not_a_plant"
  | "uncertain";

export type Severity =
  | "healthy"
  | "early"
  | "mild"
  | "moderate"
  | "severe"
  | "critical"
  | "unknown";

export type EnvironmentalRisk = "low" | "moderate" | "high" | "unknown";

export interface AlternativeCondition {
  name: string;
  reason: string;
}

export interface DiseaseDetectionResult {
  id?: string;
  status: DiseaseStatus;
  plantDetected: boolean;
  plantType: string | null;
  plantPart: string | null;
  conditionName: string | null;
  confidence: number;
  severity: Severity;
  affectedAreaPercent: number | null;
  observedSymptoms: string[];
  explanation: string;
  alternativeConditions: AlternativeCondition[];
  recommendedActions: string[];
  warnings: string[];
  needsBetterImage: boolean;
  expertVerificationRecommended: boolean;
  environmentalRisk: EnvironmentalRisk;
  timestamp?: string;
  imagePreview?: string;
}

export interface DiseaseDetectionContext {
  crop?: string;
  plant?: string;
  language?: string;
  location?: string;
  growthStage?: string;
  additionalContext?: string;
  temperature?: number;
  humidity?: number;
  rainProbability?: number;
  soilMoisture?: number;
  soilTemperature?: number;
}

export interface DiseaseDetectionResponse {
  success: boolean;
  result?: DiseaseDetectionResult;
  error?: {
    code: string;
    message: string;
  };
}

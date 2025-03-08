export interface AnalysisResult {
  metrics: {
    cholesterol: string;
    bloodPressure: string;
    bloodGlucose: string;
    bmi: string;
  };
  recommendations: string[];
}

export interface ApiError {
  error: string;
  details?: string;
}
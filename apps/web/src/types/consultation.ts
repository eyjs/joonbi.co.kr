export type ConsultationType = 'SIMPLE' | 'ANALYSIS';

export type ConsultationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED' | 'CONVERTED';

export type AnalysisStatus = 'PENDING' | 'PROCESSING' | 'DONE' | 'FAILED' | 'SKIPPED';

export type Feasibility = 'FEASIBLE' | 'CONDITIONAL' | 'INFEASIBLE';

export type ConsultationStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface AiFeature {
  name: string;
  price: number;
  required: boolean;
}

export interface CreateConsultationDto {
  type: ConsultationType;
  projectName: string;
  description: string;
  referenceUrls: string[];
  budgetRange?: string;
  desiredDate?: string;
}

export interface CreatePublicConsultationDto {
  description: string;
  referenceUrls?: string[];
  budgetRange?: string;
}

export interface ConfirmSpecDto {
  customerComment?: string;
}

export interface SubmitInfoDto {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  businessNumber?: string;
}

export interface ConsultationResponse {
  id: string;
  accessToken: string;
  userId: string | null;
  type: ConsultationType;
  projectName: string;
  description: string;
  referenceUrls: string[];
  budgetRange: string | null;
  desiredDate: string | null;
  status: ConsultationStatus;
  analysisStatus: AnalysisStatus;
  aiAnalysis: Record<string, unknown> | null;
  aiFeatures: AiFeature[] | null;
  aiEstimatedMin: number | null;
  aiEstimatedMax: number | null;
  aiEstimatedDays: number | null;
  aiFeasibility: Feasibility | null;
  aiRisks: string[];
  createdAt: string;
  updatedAt: string;
}

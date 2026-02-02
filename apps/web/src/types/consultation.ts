export type ConsultationType = 'SIMPLE' | 'ANALYSIS';

export interface CreateConsultationDto {
  type: ConsultationType;
  projectName: string;
  description: string;
  referenceUrls: string[];
  budgetRange?: string;
  desiredDate?: string;
}

export interface ConsultationResponse {
  id: string;
  userId: string;
  type: ConsultationType;
  projectName: string;
  description: string;
  referenceUrls: string[];
  budgetRange?: string | null;
  desiredDate?: Date | null;
  status: string;
  analysisStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

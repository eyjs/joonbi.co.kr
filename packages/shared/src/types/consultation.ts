// packages/shared/src/types/consultation.ts

export enum ConsultationType {
  SIMPLE = 'SIMPLE',
  ANALYSIS = 'ANALYSIS',
}

export enum ConsultationStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CONVERTED = 'CONVERTED',
}

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
  type: ConsultationType;
  projectName: string;
  description: string;
  referenceUrls: string[];
  status: ConsultationStatus;
  createdAt: string;
}

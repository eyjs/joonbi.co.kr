export enum ConsultationType {
  SIMPLE = 'SIMPLE',
  ANALYSIS = 'ANALYSIS',
}

export enum ConsultationStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CONVERTED = 'CONVERTED',
}

export interface Consultation {
  id: string;
  userId: string;
  ticketId?: string;
  type: ConsultationType;
  projectName: string;
  description: string;
  referenceUrls: string[];
  budgetRange?: string;
  desiredDate?: Date;
  attachmentPath?: string;
  status: ConsultationStatus;
  isFeasible?: boolean;
  rejectReason?: string;
  estimatedMin?: number;
  estimatedMax?: number;
  adminMemo?: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface CreateConsultationDto {
  type: ConsultationType;
  projectName: string;
  description: string;
  referenceUrls?: string[];
  budgetRange?: string;
  desiredDate?: Date;
}

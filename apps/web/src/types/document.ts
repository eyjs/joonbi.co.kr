export type DocumentStatus = 'WAITING' | 'WORKING' | 'REVIEW' | 'REVISION' | 'DELIVERED';
export type DocumentType = 'REQUIREMENTS' | 'DESIGN' | 'SOURCE' | 'TEST' | 'MANUAL';
export type FeedbackType = 'BUG' | 'IMPROVEMENT' | 'QUESTION' | 'OTHER';
export type FeedbackStatus = 'PENDING' | 'RESOLVED' | 'REJECTED';

export interface DocumentResponse {
  id: string;
  projectId: string;
  docCode: string;
  docType: DocumentType;
  docName: string;
  status: DocumentStatus;
  weight: number;
  filePath?: string;
  reviewDeadline?: Date;
  feedbackItemCount: number;
  feedbackLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFeedbackDto {
  content: string;
  type: FeedbackType;
  isNewFeature?: boolean;
  extraCost?: number;
}

export interface FeedbackResponse {
  id: string;
  documentId: string;
  content: string;
  type: FeedbackType;
  isNewFeature: boolean;
  extraCost: number | null;
  status: FeedbackStatus;
  response: string | null;
  createdAt: Date;
  updatedAt: Date;
  document?: {
    id: string;
    docCode: string;
    docName: string;
    docType: string;
  };
}

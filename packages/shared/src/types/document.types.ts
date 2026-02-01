export enum DocumentType {
  REQUIRED = 'REQUIRED',
  OPTIONAL = 'OPTIONAL',
}

export enum DocumentStatus {
  WAITING = 'WAITING',
  WORKING = 'WORKING',
  REVIEW = 'REVIEW',
  FEEDBACK = 'FEEDBACK',
  APPROVED = 'APPROVED',
  DELIVERED = 'DELIVERED',
}

export enum FeedbackType {
  REQUEST = 'REQUEST',
  REPLY = 'REPLY',
  APPROVAL = 'APPROVAL',
  COMMENT = 'COMMENT',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  RESOLVED = 'RESOLVED',
}

export interface Document {
  id: string;
  projectId: string;
  docCode: string;
  docName: string;
  docType: DocumentType;
  price: number;
  status: DocumentStatus;
  weight: number;
  filePath?: string;
  fileName?: string;
  fileType?: string;
  uploadedAt?: Date;
  version: number;
  reviewRequestedAt?: Date;
  reviewDeadline?: Date;
  approvedAt?: Date;
  autoApproved: boolean;
  feedbackItemCount: number;
  feedbackItemLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentFeedback {
  id: string;
  documentId: string;
  userId: string;
  type: FeedbackType;
  content: string;
  attachments?: unknown;
  requestStatus?: RequestStatus;
  rejectReason?: string;
  isNewFeature: boolean;
  extraCost: number;
  parentId?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

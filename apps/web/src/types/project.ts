export type ProjectStatus = 'PENDING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'CANCELLED';

export interface ProjectResponse {
  id: string;
  userId: string;
  consultationId?: string;
  projectCode: string;
  projectName: string;
  status: ProjectStatus;
  totalAmount: number;
  contractAmount?: number;
  finalAmount?: number;
  startDate?: Date;
  expectedEndDate?: Date;
  actualEndDate?: Date;
  portfolioAgreed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectProgressDto {
  totalProgress: number;
  documents: Array<{
    docCode: string;
    docName: string;
    status: string;
    weight: number;
    completion: number;
  }>;
  nextMilestone?: string;
}

export interface ProjectListResponse {
  data: ProjectResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export enum ProjectStatus {
  PENDING = 'PENDING',
  CONTRACT_WAITING = 'CONTRACT_WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINAL_WAITING = 'FINAL_WAITING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Project {
  id: string;
  userId: string;
  consultationId?: string;
  projectCode: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  totalAmount: number;
  contractAmount?: number;
  finalAmount?: number;
  optionalDocsAmount: number;
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
  portfolioAgreed: boolean;
  portfolioType?: string;
  asStartDate?: Date;
  asEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDto {
  userId: string;
  consultationId?: string;
  title: string;
  description?: string;
  totalAmount: number;
}

export interface UpdateProjectDto {
  status?: ProjectStatus;
  progress?: number;
  startDate?: Date;
  dueDate?: Date;
}

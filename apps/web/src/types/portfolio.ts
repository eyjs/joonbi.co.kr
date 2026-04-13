export type PortfolioSectionType =
  | 'OVERVIEW'
  | 'BRIEF'
  | 'VIDEO'
  | 'DIAGRAM'
  | 'DOCUMENT'
  | 'IMAGES'
  | 'SCREENSHOT'
  | 'BEFORE_AFTER';

export type PortfolioDisplay = 'FULL' | 'ANONYMOUS' | 'PRIVATE';

export interface BeforeAfterItem {
  icon: string;
  text: string;
}

export interface Milestone {
  date: string;
  title: string;
  status: string;
}

export interface PortfolioImage {
  id: string;
  imageUrl: string;
  displayOrder: number;
  createdAt: string;
}

export interface PortfolioSection {
  id: string;
  sectionType: PortfolioSectionType;
  title?: string;
  displayOrder: number;
  textContent?: string;
  videoUrl?: string;
  diagramCode?: string;
  diagramKind?: string;
  fileUrl?: string;
  fileName?: string;
  caption?: string;
  imageUrls?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  id: string;
  projectId: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  displayType: PortfolioDisplay;
  isPublic: boolean;
  techStack: string[];
  category?: string;
  completedAt?: string;
  clientName?: string;
  summary?: string;
  duration?: string;
  heroVideoUrl?: string;
  priceRange?: string;
  beforeItems?: BeforeAfterItem[];
  afterItems?: BeforeAfterItem[];
  milestones?: Milestone[];
  images: PortfolioImage[];
  sections: PortfolioSection[];
  project?: {
    projectName: string;
    status: string;
    actualEndDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioListResponse {
  data: Portfolio[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

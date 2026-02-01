import { DocumentStatus } from '../types';

export const DOCUMENT_WEIGHTS: Record<string, number> = {
  'DOC-01': 20, // 요구사항명세서
  'DOC-02': 50, // 소스코드
  'DOC-03': 20, // 운영매뉴얼
  'DOC-04': 10, // 관리자계정정보
};

export const STATUS_COMPLETION: Record<DocumentStatus, number> = {
  [DocumentStatus.WAITING]: 0,
  [DocumentStatus.WORKING]: 0.3,
  [DocumentStatus.REVIEW]: 0.7,
  [DocumentStatus.FEEDBACK]: 0.5,
  [DocumentStatus.APPROVED]: 0.9,
  [DocumentStatus.DELIVERED]: 1.0,
};

export const FEEDBACK_ITEM_LIMITS = {
  DEFAULT: 5,
  PAID: 10,
};

export const REVIEW_DEADLINE_DAYS = 7;
export const AUTO_APPROVE_DAYS = 7;

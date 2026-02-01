import {
  ProjectStatus,
  ConsultationStatus,
  DocumentStatus,
  PaymentStatus,
} from '../types';

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.PENDING]: '대기',
  [ProjectStatus.CONTRACT_WAITING]: '계약 대기',
  [ProjectStatus.IN_PROGRESS]: '진행중',
  [ProjectStatus.FINAL_WAITING]: '최종 대기',
  [ProjectStatus.COMPLETED]: '완료',
  [ProjectStatus.CANCELLED]: '취소',
};

export const CONSULTATION_STATUS_LABELS: Record<ConsultationStatus, string> = {
  [ConsultationStatus.PENDING]: '대기',
  [ConsultationStatus.REVIEWING]: '검토중',
  [ConsultationStatus.COMPLETED]: '완료',
  [ConsultationStatus.REJECTED]: '거절',
  [ConsultationStatus.CONVERTED]: '프로젝트 전환',
};

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  [DocumentStatus.WAITING]: '대기',
  [DocumentStatus.WORKING]: '작업중',
  [DocumentStatus.REVIEW]: '검토중',
  [DocumentStatus.FEEDBACK]: '수정요청',
  [DocumentStatus.APPROVED]: '승인',
  [DocumentStatus.DELIVERED]: '전달완료',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: '대기',
  [PaymentStatus.COMPLETED]: '완료',
  [PaymentStatus.FAILED]: '실패',
  [PaymentStatus.REFUNDED]: '환불',
};

export enum TicketType {
  FREE = 'FREE',
  PAID = 'PAID',
  EVENT = 'EVENT',
}

export enum TicketStatus {
  AVAILABLE = 'AVAILABLE',
  USED = 'USED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentType {
  TICKET = 'TICKET',
  CONTRACT = 'CONTRACT',
  FINAL = 'FINAL',
  OPTIONAL_DOC = 'OPTIONAL_DOC',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Ticket {
  id: string;
  userId: string;
  type: TicketType;
  status: TicketStatus;
  amount: number;
  usedAt?: Date;
  consultationId?: string;
  refundedAt?: Date;
  refundReason?: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  paymentType: PaymentType;
  projectId?: string;
  ticketId?: string;
  documentId?: string;
  amount: number;
  pgProvider?: string;
  pgTid?: string;
  status: PaymentStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface CreatePaymentDto {
  paymentType: PaymentType;
  targetId: string;
  amount: number;
}

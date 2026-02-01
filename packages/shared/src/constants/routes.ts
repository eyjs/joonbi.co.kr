export const API_ROUTES = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  USERS: {
    ME: '/api/users/me',
    UPDATE_ME: '/api/users/me',
    UPDATE_PASSWORD: '/api/users/me/password',
  },
  TICKETS: {
    LIST: '/api/tickets',
    PURCHASE: '/api/tickets/purchase',
  },
  CONSULTATIONS: {
    LIST: '/api/consultations',
    CREATE: '/api/consultations',
    GET: (id: string) => `/api/consultations/${id}`,
    FILES: (id: string) => `/api/consultations/${id}/files`,
  },
  PROJECTS: {
    LIST: '/api/projects',
    GET: (id: string) => `/api/projects/${id}`,
    PROGRESS: (id: string) => `/api/projects/${id}/progress`,
    DOCUMENTS: (id: string) => `/api/projects/${id}/documents`,
    MESSAGES: (id: string) => `/api/projects/${id}/messages`,
  },
  DOCUMENTS: {
    GET: (id: string) => `/api/documents/${id}`,
    DOWNLOAD: (id: string) => `/api/documents/${id}/download`,
    APPROVE: (id: string) => `/api/documents/${id}/approve`,
    FEEDBACKS: (id: string) => `/api/documents/${id}/feedbacks`,
  },
  PAYMENTS: {
    LIST: '/api/payments',
    PREPARE: '/api/payments/prepare',
    CALLBACK: '/api/payments/callback',
    WEBHOOK: '/api/payments/webhook',
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    READ: (id: string) => `/api/notifications/${id}/read`,
    READ_ALL: '/api/notifications/read-all',
  },
  PORTFOLIOS: {
    LIST: '/api/portfolios',
    GET: (slug: string) => `/api/portfolios/${slug}`,
  },
  ADMIN: {
    CONSULTATIONS: '/api/admin/consultations',
    CONSULTATION: (id: string) => `/api/admin/consultations/${id}`,
    PROJECTS: '/api/admin/projects',
    PROJECT: (id: string) => `/api/admin/projects/${id}`,
    DOCUMENTS: (id: string) => `/api/admin/documents/${id}`,
    CUSTOMERS: '/api/admin/customers',
    PAYMENTS: '/api/admin/payments',
    PORTFOLIOS: '/api/admin/portfolios',
  },
} as const;

export const APP_ROUTES = {
  PUBLIC: {
    HOME: '/',
    PORTFOLIO: '/portfolio',
    PORTFOLIO_DETAIL: (slug: string) => `/portfolio/${slug}`,
    SERVICES: '/services',
    PRICING: '/pricing',
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  CUSTOMER: {
    DASHBOARD: '/my',
    TICKETS: '/my/tickets',
    TICKETS_BUY: '/my/tickets/buy',
    CONSULT: '/my/consult',
    CONSULT_NEW: '/my/consult/new',
    CONSULT_DETAIL: (id: string) => `/my/consult/${id}`,
    PROJECTS: '/my/projects',
    PROJECT_DETAIL: (id: string) => `/my/projects/${id}`,
    SETTINGS: '/my/settings',
  },
  ADMIN: {
    DASHBOARD: '/admin',
    CONSULTATIONS: '/admin/consults',
    CONSULTATION_DETAIL: (id: string) => `/admin/consults/${id}`,
    PROJECTS: '/admin/projects',
    PROJECT_DETAIL: (id: string) => `/admin/projects/${id}`,
    CUSTOMERS: '/admin/customers',
    PAYMENTS: '/admin/payments',
    EVENTS: '/admin/events',
    PORTFOLIOS: '/admin/portfolios',
  },
} as const;

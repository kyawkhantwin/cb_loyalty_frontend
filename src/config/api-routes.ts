export const API_ROUTES = {
  members: {
    list: '/members',
    adjustPoints: '/members/adjust-points',
    detail: (id: string) => `/members/${id}`,
  },
  qr: {
    generate: '/qr/generate',
    scan: '/qr/scan',
  },
  wallet: {
    templates: '/wallet/templates',
    issue: '/wallet/issue',
  },
  merchants: {
    list: '/merchants',
    detail: (id: string) => `/merchants/${id}`,
  },
} as const;

export type ApiRoutes = typeof API_ROUTES;

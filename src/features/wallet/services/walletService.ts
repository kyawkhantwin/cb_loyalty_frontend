import { api } from '@/lib/axios';
import { API_ROUTES } from '@/config/api-routes';
import { WalletTemplate, WalletTemplateResponse } from '../types';

const MOCK_TEMPLATES: WalletTemplate[] = [
  {
    id: '1',
    name: 'Standard Loyalty Pass',
    platform: 'Apple',
    backgroundColor: '#000000',
    foregroundColor: '#FFFFFF',
    description: 'Default template for new members.',
    status: 'Published',
    lastUpdated: '2024-01-10'
  },
  {
    id: '2',
    name: 'Google Pay Membership',
    platform: 'Google',
    backgroundColor: '#4285F4',
    foregroundColor: '#FFFFFF',
    description: 'Android optimized pass.',
    status: 'Published',
    lastUpdated: '2024-01-12'
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const WalletService = {
  getTemplates: async (): Promise<WalletTemplateResponse> => {
    await delay(800);
    return { data: MOCK_TEMPLATES, total: MOCK_TEMPLATES.length };
  },

  createTemplate: async (template: Omit<WalletTemplate, 'id' | 'lastUpdated'>): Promise<WalletTemplate> => {
    await delay(500);
    return { ...template, id: Math.random().toString(), lastUpdated: new Date().toISOString() };
  },

  updateTemplate: async (id: string, template: Partial<WalletTemplate>): Promise<WalletTemplate> => {
    await delay(500);
    const existing = MOCK_TEMPLATES.find(t => t.id === id) || MOCK_TEMPLATES[0];
    return { ...existing, ...template, id, lastUpdated: new Date().toISOString() };
  },

  deleteTemplate: async (id: string): Promise<void> => {
    await delay(500);
  }
};

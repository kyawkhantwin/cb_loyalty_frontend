import { api } from '@/lib/axios';
import { API_ROUTES } from '@/config/api-routes';

export interface WalletTemplate {
  id: string;
  platform: 'Apple' | 'Google' | 'Samsung';
  name: string;
  status: 'Active' | 'Inactive';
  lastSyncedAt: string;
}

const MOCK_TEMPLATES: WalletTemplate[] = [
  { id: '1', platform: 'Apple', name: 'Standard Loyalty Pass', status: 'Active', lastSyncedAt: new Date().toISOString() },
  { id: '2', platform: 'Google', name: 'Retail Rewards', status: 'Active', lastSyncedAt: new Date().toISOString() },
  { id: '3', platform: 'Samsung', name: 'VIP Membership', status: 'Inactive', lastSyncedAt: new Date().toISOString() },
];

const simulateLatency = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

export const WalletService = {
  getTemplates: async (): Promise<WalletTemplate[]> => {
    await simulateLatency(600);
    return MOCK_TEMPLATES;
  },

  createTemplate: async (templateData: Omit<WalletTemplate, 'id' | 'lastSyncedAt'>): Promise<WalletTemplate> => {
    await simulateLatency(500);
    return { ...templateData, id: Math.random().toString(), lastSyncedAt: new Date().toISOString() };
  },

  updateTemplate: async (templateId: string, templateData: Partial<WalletTemplate>): Promise<WalletTemplate> => {
    await simulateLatency(500);
    return { ...MOCK_TEMPLATES[0], ...templateData, id: templateId };
  },

  deleteTemplate: async (templateId: string): Promise<void> => {
    await simulateLatency(500);
  },
};

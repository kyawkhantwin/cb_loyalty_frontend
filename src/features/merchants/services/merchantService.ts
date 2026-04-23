import { api } from '@/lib/axios';
import { API_ROUTES } from '@/config/api-routes';

export interface Merchant {
  id: string;
  name: string;
  branches: number;
  category: string;
  status: 'Active' | 'Inactive';
}

const MOCK_MERCHANTS: Merchant[] = [
  { id: '1', name: 'Coffee House #12', branches: 4, category: 'Food & Drink', status: 'Active' },
  { id: '2', name: 'Urban Outfitters', branches: 12, category: 'Retail', status: 'Active' },
  { id: '3', name: 'FitLife Gym', branches: 2, category: 'Health', status: 'Active' },
];

const simulateLatency = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

export const MerchantService = {
  getMerchants: async (): Promise<Merchant[]> => {
    await simulateLatency(700);
    return MOCK_MERCHANTS;
  },

  createMerchant: async (merchantData: Omit<Merchant, 'id'>): Promise<Merchant> => {
    await simulateLatency(500);
    return { ...merchantData, id: Math.random().toString() };
  },

  updateMerchant: async (merchantId: string, merchantData: Partial<Merchant>): Promise<Merchant> => {
    await simulateLatency(500);
    return { ...MOCK_MERCHANTS[0], ...merchantData, id: merchantId };
  },

  deleteMerchant: async (merchantId: string): Promise<void> => {
    await simulateLatency(500);
  },
};

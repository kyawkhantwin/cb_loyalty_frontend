import { api } from '@/lib/axios';
import { API_ROUTES } from '@/config/api-routes';
import { Merchant, MerchantResponse } from '../types';

const MOCK_MERCHANTS: Merchant[] = [
  { 
    id: '1', 
    name: 'Coffee House #12', 
    branches: 4, 
    category: 'Food & Drink', 
    status: 'Active', 
    joinedAt: '2023-05-10' 
  },
  { 
    id: '2', 
    name: 'Urban Outfitters', 
    branches: 12, 
    category: 'Retail', 
    status: 'Active', 
    joinedAt: '2023-06-15' 
  },
  { 
    id: '3', 
    name: 'FitLife Gym', 
    branches: 2, 
    category: 'Health', 
    status: 'Active', 
    joinedAt: '2023-07-20' 
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MerchantService = {
  getMerchants: async (): Promise<MerchantResponse> => {
    await delay(800);
    return { data: MOCK_MERCHANTS, total: MOCK_MERCHANTS.length };
  },

  createMerchant: async (merchant: Omit<Merchant, 'id' | 'joinedAt'>): Promise<Merchant> => {
    await delay(500);
    return { ...merchant, id: Math.random().toString(), joinedAt: new Date().toISOString() };
  },

  updateMerchant: async (id: string, merchant: Partial<Merchant>): Promise<Merchant> => {
    await delay(500);
    const existing = MOCK_MERCHANTS.find(m => m.id === id) || MOCK_MERCHANTS[0];
    return { ...existing, ...merchant, id };
  },

  deleteMerchant: async (id: string): Promise<void> => {
    await delay(500);
  },

  archiveMerchant: async (id: string): Promise<void> => {
    await delay(500);
  }
};

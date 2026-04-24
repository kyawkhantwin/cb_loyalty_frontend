import { api } from '@/lib/axios';
import type { GetQrScansResponse, QrScanRecord } from '../types';

export const QrHistoryService = {
  getScans: async (limit = 500): Promise<QrScanRecord[]> => {
    const response = await api.get<GetQrScansResponse>('/qr/history', { params: { limit } });
    if (!response.data.ok) throw new Error(response.data.error);
    return response.data.scans;
  },
};

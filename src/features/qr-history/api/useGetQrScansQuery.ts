'use client';

import { useQuery } from '@tanstack/react-query';
import { QrHistoryService } from '../services/qrHistoryService';

export function useGetQrScansQuery(limit: number) {
  return useQuery({
    queryKey: ['qr-scans', limit],
    queryFn: () => QrHistoryService.getScans(limit),
    refetchInterval: 5_000,
  });
}


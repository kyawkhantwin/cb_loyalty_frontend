'use client';

import { useQuery } from '@tanstack/react-query';
import { WalletService } from '../services/walletService';

export const useGetTemplatesQuery = () => {
  return useQuery({
    queryKey: ['wallet-templates'],
    queryFn: WalletService.getTemplates,
  });
};

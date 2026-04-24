'use client';

import { useQuery } from '@tanstack/react-query';
import { MerchantService } from '../services/merchantService';

export const useGetMerchantsQuery = () => {
  return useQuery({
    queryKey: ['merchants'],
    queryFn: MerchantService.getMerchants,
  });
};

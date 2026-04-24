'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MerchantService } from '../services/merchantService';
import { Merchant } from '../types';

export const useUpdateMerchantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ merchantId, merchantData }: { merchantId: string; merchantData: Partial<Merchant> }) =>
      MerchantService.updateMerchant(merchantId, merchantData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchants'] });
    },
  });
};

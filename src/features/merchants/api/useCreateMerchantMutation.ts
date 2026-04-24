'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MerchantService } from '../services/merchantService';

export const useCreateMerchantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MerchantService.createMerchant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchants'] });
    },
  });
};

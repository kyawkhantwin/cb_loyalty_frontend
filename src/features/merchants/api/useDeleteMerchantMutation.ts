'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MerchantService } from '../services/merchantService';

export const useDeleteMerchantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MerchantService.deleteMerchant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchants'] });
    },
  });
};

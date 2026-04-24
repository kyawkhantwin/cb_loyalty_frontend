'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WalletService } from '../services/walletService';

export const useDeleteTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: WalletService.deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-templates'] });
    },
  });
};

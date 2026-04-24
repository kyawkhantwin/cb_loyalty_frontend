'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WalletService } from '../services/walletService';

export const useCreateTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: WalletService.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-templates'] });
    },
  });
};

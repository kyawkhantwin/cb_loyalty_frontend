'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WalletService } from '../services/walletService';
import { WalletTemplate } from '../types';

export const useUpdateTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ templateId, templateData }: { templateId: string; templateData: Partial<WalletTemplate> }) =>
      WalletService.updateTemplate(templateId, templateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-templates'] });
    },
  });
};

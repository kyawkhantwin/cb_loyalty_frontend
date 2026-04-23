import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { WalletService } from '../services/walletService';
import { WalletTemplate } from '../services/walletService';

export const useGetTemplates = () => {
  return useQuery({
    queryKey: ['wallet-templates'],
    queryFn: WalletService.getTemplates,
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: WalletService.createTemplate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wallet-templates'] }),
  });
};

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<WalletTemplate> }) => WalletService.updateTemplate(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wallet-templates'] }),
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: WalletService.deleteTemplate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wallet-templates'] }),
  });
};

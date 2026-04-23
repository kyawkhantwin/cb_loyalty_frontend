import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { MerchantService } from '../services/merchantService';
import { Merchant } from '../services/merchantService';

export const useGetMerchants = () => {
  return useQuery({
    queryKey: ['merchants'],
    queryFn: MerchantService.getMerchants,
  });
};

export const useCreateMerchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MerchantService.createMerchant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['merchants'] }),
  });
};

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Merchant> }) => MerchantService.updateMerchant(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['merchants'] }),
  });
};

export const useDeleteMerchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MerchantService.deleteMerchant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['merchants'] }),
  });
};

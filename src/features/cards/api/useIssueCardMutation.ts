'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CardService } from '../services/cardService';

export const useIssueCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CardService.issueCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issued-cards'] });
    },
  });
};

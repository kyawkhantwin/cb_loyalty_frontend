'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MemberService } from '../services/memberService';

export const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => MemberService.deleteMember(memberId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
  });
};

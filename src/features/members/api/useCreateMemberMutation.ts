'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MemberService } from '../services/memberService';

export const useCreateMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MemberService.createMember,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
  });
};

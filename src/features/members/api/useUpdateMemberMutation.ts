'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MemberService } from '../services/memberService';
import { Member } from '../types';

export const useUpdateMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, memberData }: { memberId: string, memberData: Partial<Member> }) => 
      MemberService.updateMember(memberId, memberData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
  });
};

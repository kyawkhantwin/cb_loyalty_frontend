'use client';

import { useQuery } from '@tanstack/react-query';
import { MemberService } from '../services/memberService';

export const useGetMembersQuery = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: MemberService.getMembers,
  });
};

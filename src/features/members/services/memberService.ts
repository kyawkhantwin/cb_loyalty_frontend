import { api } from '@/lib/axios';
import { API_ROUTES } from '@/config/api-routes';
import { Member, MemberResponse } from '../types';

const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    points: 1250,
    tier: 'Gold',
    status: 'Active',
    joinedAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    points: 450,
    tier: 'Silver',
    status: 'Active',
    joinedAt: '2023-03-20',
  },
  {
    id: '3',
    name: 'Robert Brown',
    email: 'robert@example.com',
    points: 3200,
    tier: 'Platinum',
    status: 'Banned',
    joinedAt: '2022-11-05',
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MemberService = {
  getMembers: async (): Promise<MemberResponse> => {
    await delay(800);
    return { data: MOCK_MEMBERS, total: MOCK_MEMBERS.length };
  },

  createMember: async (member: Omit<Member, 'id' | 'joinedAt'>): Promise<Member> => {
    await delay(500);
    return { ...member, id: Math.random().toString(), joinedAt: new Date().toISOString() };
  },

  updateMember: async (id: string, member: Partial<Member>): Promise<Member> => {
    await delay(500);
    return { ...MOCK_MEMBERS[0], ...member, id };
  },

  deleteMember: async (id: string): Promise<void> => {
    await delay(500);
  },
};

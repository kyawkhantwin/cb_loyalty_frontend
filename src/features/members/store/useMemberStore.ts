import { create } from 'zustand';
import { Member } from '../types';

interface MemberState {
  members: Member[];
  isLoading: boolean;
  setMembers: (members: Member[]) => void;
  updateMemberPoints: (memberId: string, pointsBalance: number) => void;
}

const updateMemberPointsList = (members: Member[], memberId: string, points: number) =>
  members.map(member => (member.id === memberId ? { ...member, points } : member));

export const useMemberStore = create<MemberState>((set) => ({
  members: [],
  isLoading: false,
  setMembers: (members) => set({ members }),
  updateMemberPoints: (memberId, pointsBalance) => 
    set((state) => ({ members: updateMemberPointsList(state.members, memberId, pointsBalance) })),
}));

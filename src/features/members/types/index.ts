export type MemberTier = 'Silver' | 'Gold' | 'Platinum';
export type MemberStatus = 'Active' | 'Inactive' | 'Banned';

export interface Member {
  id: string;
  name: string;
  email: string;
  points: number;
  tier: MemberTier;
  status: MemberStatus;
  joinedAt: string;
  avatar?: string;
}

export interface PointAdjustmentRequest {
  memberId: string;
  amount: number;
  reason: string;
}

export interface PointAdjustmentResponse {
  newBalance: number;
  transactionId: string;
}

export interface PointTransaction {
  id: string;
  memberId: string;
  amount: number;
  type: 'Earned' | 'Burned' | 'Adjusted';
  source: string;
  createdAt: string;
}

export interface MemberResponse {
  data: Member[];
  total: number;
}

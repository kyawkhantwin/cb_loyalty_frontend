export type MerchantStatus = 'Active' | 'Inactive' | 'Pending';

export interface Merchant {
  id: string;
  name: string;
  category: string;
  branches: number;
  status: MerchantStatus;
  joinedAt: string;
  contactEmail?: string;
  address?: string;
}

export interface MerchantResponse {
  data: Merchant[];
  total: number;
}

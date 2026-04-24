export type CardStatus = 'Active' | 'Revoked' | 'Expired';

export interface IssuedCard {
  id: string;
  memberId: string;
  memberName: string;
  templateId: string;
  platform: 'Apple' | 'Google' | 'Samsung';
  balance: number;
  status: CardStatus;
  issuedAt: string;
  lastUsedAt?: string;
}

export interface IssuedCardResponse {
  data: IssuedCard[];
  total: number;
}

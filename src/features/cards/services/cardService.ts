import { IssuedCard, IssuedCardResponse } from '../types';

const MOCK_CARDS: IssuedCard[] = [
  {
    id: 'CARD-1',
    memberId: '1',
    memberName: 'John Doe',
    templateId: '1',
    platform: 'Apple',
    balance: 1250,
    status: 'Active',
    issuedAt: '2024-02-01T10:00:00Z',
    lastUsedAt: '2024-04-23T15:30:00Z'
  },
  {
    id: 'CARD-2',
    memberId: '2',
    memberName: 'Jane Smith',
    templateId: '2',
    platform: 'Google',
    balance: 450,
    status: 'Active',
    issuedAt: '2024-03-15T12:00:00Z',
    lastUsedAt: '2024-04-20T09:15:00Z'
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CardService = {
  getIssuedCards: async (): Promise<IssuedCardResponse> => {
    await delay(800);
    // Sort by newest first so issued cards appear at the top
    const sorted = [...MOCK_CARDS].sort((a, b) => 
      new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
    );
    return { data: sorted, total: MOCK_CARDS.length };
  },

  issueCard: async (card: Omit<IssuedCard, 'id' | 'issuedAt' | 'status'>): Promise<IssuedCard> => {
    await delay(500);
    const newCard: IssuedCard = { 
      ...card, 
      id: `CARD-${Math.floor(Math.random() * 10000)}`, 
      issuedAt: new Date().toISOString(), 
      status: 'Active' 
    };
    MOCK_CARDS.push(newCard);
    return newCard;
  },

  revokeCard: async (id: string): Promise<void> => {
    await delay(500);
  },

  updateBalance: async (id: string, newBalance: number): Promise<void> => {
    await delay(500);
  }
};

'use client';

import { useQuery } from '@tanstack/react-query';
import { CardService } from '../services/cardService';

export const useGetIssuedCardsQuery = () => {
  return useQuery({
    queryKey: ['issued-cards'],
    queryFn: CardService.getIssuedCards,
  });
};

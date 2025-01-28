import { useMemo } from 'react';
import { Offer } from '../types/offers';

export function useMapPoints(offers: Offer[]) {
  return useMemo(
    () =>
      offers.map((offer) => ({
        id: offer.id,
        location: offer.location,
      })),
    [offers]
  );
}

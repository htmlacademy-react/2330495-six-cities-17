import { useMemo } from 'react';
import { Offer } from '../types/offers';
import { SortItem } from '../const';
import { useAppSelector } from './index';

export function useSortedOffers(offers: Offer[]) {
  const currentSort = useAppSelector((state) => state.currentSort);

  return useMemo(() => {
    switch (currentSort) {
      case SortItem.PriceLow:
        return [...offers].sort((a, b) => a.price - b.price);
      case SortItem.PriceHigh:
        return [...offers].sort((a, b) => b.price - a.price);
      case SortItem.Rating:
        return [...offers].sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [offers, currentSort]);
}

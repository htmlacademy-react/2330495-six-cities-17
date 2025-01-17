import { useMemo } from 'react';
import { Offer } from '../types/offers';
import { useAppSelector } from './index';
import { RootState } from '../types/state';
import { useCurrentCity } from './use-current-city';
import { Town } from '../const';

export const useOffersCity = (): Offer[] => {
  const currentCity = useCurrentCity();

  const offersCity = useAppSelector((state: RootState) => state.offers);

  return useMemo(
    () =>
      offersCity.filter((offer) => (offer.city.name as Town) === currentCity),
    [offersCity, currentCity]
  );
};

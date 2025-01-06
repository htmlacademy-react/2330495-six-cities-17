import { Offer } from '../types/offers';
import { useAppSelector } from './index';
import { RootState } from '../types/state';
import { useCurrentCity } from './use-current-city';

export const useOffersCity = (): Offer[] => {
  const currentCity = useCurrentCity();
  return useAppSelector((state: RootState) =>
    state.offers.filter((offer) => offer.city.name === currentCity)
  );
};

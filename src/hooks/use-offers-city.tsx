import { Offer } from '../types/offers';
import { useAppSelector } from '.';
import { RootState } from '../types/state';
import { Town } from '../const';

export const useOffersCity = (): Offer[] => {
  const currentCity = useAppSelector((state: RootState) => state.currentCity);
  return useAppSelector((state: RootState) =>
    state.offers.filter((offer) => (offer.city.name as Town) === currentCity)
  );
};

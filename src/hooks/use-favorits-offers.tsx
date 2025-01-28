import { RootState } from '../types/state';
import { useAppSelector } from './index';

export const getFavorites = (state: RootState) => state.favorites;

export const useFavoritesOffers = () => useAppSelector(getFavorites);


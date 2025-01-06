
import { RootState } from '../types/state';
import { useAppSelector } from './index';
import { Town } from '../const';

export const useCurrentCity = (): Town => useAppSelector((state: RootState) => state.currentCity);

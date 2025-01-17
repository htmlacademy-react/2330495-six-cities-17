import { Location, City } from '../types/offers';

export type Point = {
  id: string;
  location: Location;
};

export type MapPoints = {
  city: City;
  points: Point[];
  isActiveId: string | null;
};

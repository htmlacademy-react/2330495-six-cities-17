import {City} from './offers-for-user';
import {Location} from './offers-for-user';

export type OfferListTotal = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}[]

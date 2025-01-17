import { User } from './reviews';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Locations = Location[];

// type Host = {
//   name: string;
//   avatarUrl: string;
//   isPro: boolean;
// };

export type City = {
  name: string;
  location: Location;
};

export type BaseOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Offer = BaseOffer & {
  previewImage: string;
};

export type FullInfoOffer = BaseOffer & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};

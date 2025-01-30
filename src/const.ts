export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum Town {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = './public/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';


export enum APIRoute {
  Offers = '/offers',
  FullInfoOffer = '/offers/',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
}

export enum SortItem {
  Popular = 'Popular',
  PriceLow = 'Low to high',
  PriceHigh = 'High to low',
  Rating = 'Top rated first',
}

export enum CardClassName {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places',
}


export enum MapClassName {
  Cities = 'cities__map',
  Offer = 'offer__map',
}

export enum FavoritsButtonClassName {
 Place = 'place-card',
 Offer = 'offer',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_NEAR_PLACES_OFFERS = 3;

const ICON_SIZES = {
  SMALL: { width: 18, height: 19 },
  LARGE: { width: 31, height: 33 },
};

export const BUTTON_SIZES = {
  'place-card__bookmark-icon': ICON_SIZES.SMALL,
  'offer__bookmark-icon': ICON_SIZES.LARGE,
};


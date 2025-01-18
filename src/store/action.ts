import { createAction } from '@reduxjs/toolkit';
import { Town, AuthorizationStatus, SortItem } from '../const';
import { Offer, FullInfoOffer } from '../types/offers';
// import Review from '../components/review/review';
import { Review } from '../types/reviews';
import { UserData } from '../types/user-data';

export const changeCity = createAction<Town>('main/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setDataLoadingStatus = createAction<boolean>(
  'data/setDataLoadingStatus'
);
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const changeSorting = createAction<SortItem>('main/changeSorting');
// export const loadFullOffers = createAction<FullInfoOffer[]>(
//   'data/loadFullOffer'
// );
export const LoadCurrentOffer = createAction<FullInfoOffer | null>(
  'offer/setCurrentOffer'
);

export const setError = createAction<string | null>('main/setError');

export const loadComments = createAction<Review[]>('reviews/loadComments');

export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');

export const setUser = createAction<UserData>('user/setUser');

export const clearUser = createAction<void>('user/clearUser');

import { createAction } from '@reduxjs/toolkit';
import { Town, AuthorizationStatus, SortItem } from '../const';
import { Offer } from '../types/offers';

export const changeCity = createAction<Town>('main/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const changeSorting = createAction<SortItem>(
  'main/changeSorting'
);

export const setError = createAction<string | null>('main/setError');

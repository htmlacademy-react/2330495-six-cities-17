import { createAction } from '@reduxjs/toolkit';
import { Town, AuthorizationStatus } from '../const';
import { Offer } from '../types/offers';

export const changeCity = createAction<Town>('main/changeCity');
export const loadOffers = createAction<Offer[]>('main/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

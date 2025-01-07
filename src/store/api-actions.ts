import {
  loadOffers,
  requireAuthorization,
  setError,
  setDataLoadingStatus,
  LoadCurrentOffer,
  loadComments,loadNearbyOffers
} from './action';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/state';
import { Offer, FullInfoOffer } from '../types/offers';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from '.';
import { Review } from '../types/reviews';
import { buildApiRoute } from '../utils/api-routes';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(setDataLoadingStatus(false));
  dispatch(loadOffers(data));
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});

export const clearErrorAction = createAsyncThunk('game/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOfferById = createAsyncThunk<
  FullInfoOffer | null,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchOfferById', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<FullInfoOffer | null>(
    buildApiRoute(APIRoute.Offers, offerId)
  );
  dispatch(LoadCurrentOffer(data));
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Review[]>(
    buildApiRoute(APIRoute. Reviews, offerId));

  dispatch(loadComments(data));
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(
    buildApiRoute(APIRoute.Offers, offerId, 'nearby')
  );

  dispatch(loadNearbyOffers(data));
  return data;
});

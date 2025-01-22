import {
  loadOffers,
  requireAuthorization,
  setError,
  setDataLoadingStatus,
  LoadCurrentOffer,
  loadComments,
  loadNearbyOffers,
  setUser,loadFavoriteOffers
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
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });

      saveToken(data.token);

      dispatch(requireAuthorization(AuthorizationStatus.Auth));

      dispatch(setUser(data));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
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
    buildApiRoute(APIRoute.Reviews, offerId)
  );

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

export const postComment = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }
>(
  'data/postComment',
  async ({ offerId, comment, rating }, { dispatch, getState, extra: api }) => {
    try {
      const response = await api.post<Review>(`/comments/${offerId}`, {
        comment,
        rating,
      });

      const currentReviews = getState().reviews;

      const updatedReviews = [...currentReviews, response.data];

      dispatch(loadComments(updatedReviews));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error posting comment:', error);
      throw error;
    }
  }
);
export const loadFavoriteOfferCards = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('data/loadFavoriteOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(buildApiRoute(APIRoute.Favoriete));

  dispatch(loadFavoriteOffers(data));
  return data;
});

//   Offer,
//   { offerId: string; wasFavorite: boolean },
//   {
//     dispatch: AppDispatch;
//     state: RootState;
//     extra: AxiosInstance;
//   }
// >(
//   'data/uploadFavoritesStatus',
//   async ({ offerId, wasFavorite }, { getState, extra: api }) => {
//     const nextFavoriteStatus = Number(!wasFavorite);
//     const { data } = await api.post<Offer>(
//       buildApiRoute(
//         buildApiRoute(
//           APIRoute.Favoriete,
//           offerId,
//           nextFavoriteStatus.toString()
//         )
//       )
//       // `${APIRoute.Favoriete}/${offerId}/${nextFavoriteStatus}`
//     );
//     const { offers } = getState();
//     const currentOfferCard = offers.find((card) => card.id === data.id);

//     if (!currentOfferCard) {
//       throw new Error(`No such offer with given id:${data.id}`);
//     }
//     return { ...currentOfferCard, isFavorite: data.isFavorite };
//   }
// );
export const uploadFavoritesStatusAction = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }
>(
  'data/uploadFavoritesStatus',
  async ({ offerId, status }, { extra: api }) => {
    if (!api) {
      throw new Error('API client is not defined.');
    }

    const { data } = await api.post<Offer>(`${APIRoute.Favoriete}/${offerId}/${status}`);
    return data;
  }
);


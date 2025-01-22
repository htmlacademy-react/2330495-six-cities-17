import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  requireAuthorization,
  changeSorting,
  setError,
  setDataLoadingStatus,
  LoadCurrentOffer,
  loadComments,
  loadNearbyOffers,
  setUser,
  clearUser,
  loadFavoriteOffers,
  uploadFavoritesStatus,
} from './action';
import { Town, AuthorizationStatus, SortItem } from '../const';
import { Offer, FullInfoOffer } from '../types/offers';
import { Review } from '../types/reviews';
import { UserData } from '../types/user-data';

type State = {
  currentCity: Town;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  currentSort: SortItem;
  isLoading: boolean;
  error: string | null;
  isDataLoading: boolean;
  currentOffer: FullInfoOffer | null;
  reviews: Review[];
  nearbyOffers: Offer[];
  user: UserData | null;
  favoriteOffers: Offer[];
};

export const initialState: State = {
  currentCity: Town.Paris,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  currentSort: SortItem.Popular,
  isLoading: false,
  error: null,
  isDataLoading: false,
  currentOffer: null,
  reviews: [],
  nearbyOffers: [],
  user: null,
  favoriteOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<Town>) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    })
    .addCase(
      requireAuthorization,
      (state, action: PayloadAction<AuthorizationStatus>) => {
        state.authorizationStatus = action.payload;
      }
    )
    .addCase(changeSorting, (state, action: PayloadAction<SortItem>) => {
      state.currentSort = action.payload;
    })
    .addCase(setError, (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    })
    .addCase(
      LoadCurrentOffer,
      (state, action: PayloadAction<FullInfoOffer | null>) => {
        state.currentOffer = action.payload;
      }
    )
    .addCase(loadComments, (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setUser, (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    })
    .addCase(clearUser, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(loadFavoriteOffers, (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(uploadFavoritesStatus, (state, action: PayloadAction<Offer>) => {
      const existingOfferIndex = state.favoriteOffers.findIndex(
        (offer) => offer.id === action.payload.id
      );

      if (existingOfferIndex !== -1) {
        state.favoriteOffers[existingOfferIndex] = action.payload;
      } else {
        state.favoriteOffers.push(action.payload);
      }
    });
});

export { reducer };

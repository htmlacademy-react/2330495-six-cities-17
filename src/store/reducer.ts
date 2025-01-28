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
  clearUser, loadFavorites, toggleFavoriteStatus
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
  // isLoading: boolean;
  error: string | null;
  isDataLoading: boolean;
  currentOffer: FullInfoOffer | null;
  reviews: Review[];
  nearbyOffers: Offer[];
  user: UserData | null;
  favorites: Offer[];
};

export const initialState: State = {
  currentCity: Town.Paris,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  currentSort: SortItem.Popular,
  // isLoading: false,
  error: null,
  isDataLoading: false,
  currentOffer: null,
  reviews: [],
  nearbyOffers: [],
  user: null,
  favorites: [],
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
    .addCase(loadFavorites, (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload;
    })
    .addCase(toggleFavoriteStatus, (state, action: PayloadAction<Offer>) => {
      const updatedOffer = action.payload;


      const index = state.favorites.findIndex((offer) => offer.id === updatedOffer.id);

      if (updatedOffer.isFavorite) {

        if (index === -1) {
          state.favorites = [...state.favorites, updatedOffer];
        }
      } else {

        if (index !== -1) {
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }
      }
    });


});
export { reducer };

import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  requireAuthorization,
  changeSorting,
  setError,setDataLoadingStatus, LoadCurrentOffer, loadComments,
} from './action';
import { Town, AuthorizationStatus, SortItem } from '../const';
import { Offer,FullInfoOffer } from '../types/offers';
import { Review } from '../types/reviews';


type State = {
  currentCity: Town;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  currentSort: SortItem;
  isLoading: boolean;
  error: string | null;
  isDataLoading: boolean;
  // fullOffers:FullInfoOffer [];
  currentOffer: FullInfoOffer | null;
  reviews: Review [];
};

export const initialState: State = {
  currentCity: Town.Paris,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  currentSort: SortItem.Popular,
  isLoading: false,
  error: null,
  isDataLoading: false,
  // fullOffers:[],
  currentOffer: null,
  reviews: [],
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
    // .addCase(loadFullOffers, (state, action: PayloadAction<FullInfoOffer []>) => {
    //   state.fullOffers = action.payload;
    // })
    .addCase(LoadCurrentOffer, (state, action: PayloadAction<FullInfoOffer | null>) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadComments, (state, action: PayloadAction< Review []>) => {
      state.reviews = action.payload;
    });

});
export { reducer };

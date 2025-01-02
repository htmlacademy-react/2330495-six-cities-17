import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuthorization,changeSorting} from './action';
import { Town, AuthorizationStatus, SortItem } from '../const';
import { Offer } from '../types/offers';
import {fetchOffersAction} from './api-actions';


type State = {
  currentCity: Town;
  offers: Offer[];
  authorizationStatus:AuthorizationStatus;
  currentSort:SortItem;
  isLoading: boolean;
}

export const initialState: State = {
  currentCity: Town.Paris,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  currentSort:SortItem.Popular,
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<Town>) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action:PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeSorting, (state, action:PayloadAction<SortItem>) => {
      state.currentSort = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<Offer[]>) => {
      state.isLoading = false;
      state.offers = action.payload;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isLoading = false;
    });

});
export { reducer };

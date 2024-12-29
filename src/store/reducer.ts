import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuthorization} from './action';
import { Town, AuthorizationStatus } from '../const';
import { Offer } from '../types/offers';

type State = {
  currentCity: Town;
  offers: Offer[];
  authorizationStatus:AuthorizationStatus;
}

export const initialState: State = {
  currentCity: Town.Paris,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });

});
export { reducer };

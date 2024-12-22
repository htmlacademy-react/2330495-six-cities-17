import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { changeCity} from './action';
import { loadOffers } from './action';

import { Town } from '../const';
import { Offer } from '../types/offers';

type State = {
  currentCity: Town;
  offers: Offer[];
};

export const initialState: State = {
  currentCity: Town.Paris,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<Town>) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    });
});
export { reducer };

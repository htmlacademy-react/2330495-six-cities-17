import {createAction} from '@reduxjs/toolkit';
// import { ActionType } from '../const';
import { Town } from '../const';
import { Offer } from '../types/offers';


// type ChangeCitiAction ={
//   type: ActionType.ChangeCity;
//   payload: Town;
// }

// type LoadOffersAction = {
//   type: ActionType.LoadOffers;
//   payload: Offer[];
// }
// type Action = ChangeCitiAction| LoadOffersAction;


export const changeCity = createAction<Town>('main/changeCity');
export const loadOffers = createAction<Offer[]>('main/loadOffers');


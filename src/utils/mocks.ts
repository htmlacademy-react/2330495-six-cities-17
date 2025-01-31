
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { RootState } from '../types/state';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;


import {configureStore} from '@reduxjs/toolkit';
import {reducer as offersReducer} from './reducer';

export const store = configureStore({
  reducer: {
    offers: offersReducer, // ключ "offers" должен совпадать с путём в useSelector
  },
});

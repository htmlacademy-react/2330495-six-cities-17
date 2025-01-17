import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import offerListTotal from './mocks/offers';
// import fullInfoOffer from './mocks/offer';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App
        offers={offerListTotal}
        // fullOffer={fullInfoOffer}
      />
    </Provider>
  </React.StrictMode>
);

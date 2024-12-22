import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import offerListTotal from './mocks/offers';
import fullInfoOffer from './mocks/offer';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadOffers } from './store/action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOffers(offerListTotal));

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        // amountPlaces={amountPlaces}
        offers={offerListTotal}
        fullOffer={fullInfoOffer}
        // city={fullInfoOffer.city}
        // points={offerListTotal.map(({id,location}) => ({id,location}))}
      />
    </Provider>
  </React.StrictMode>
);

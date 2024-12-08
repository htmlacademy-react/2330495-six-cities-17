import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import offerListTotal from './mocks/offers';
// import { fullInfoOffers } from './mocks/full-info-offers';
import fullInfoOffer from './mocks/offer';

const amountPlaces = offerListTotal.length;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      amountPlaces={amountPlaces}
      offers={offerListTotal}
      // fullOffers={fullInfoOffers}
      fullOffer ={fullInfoOffer}
    />
  </React.StrictMode>
);

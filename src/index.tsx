import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import offerListTotal from './mocks/offers';


const amountPlaces = offerListTotal.length;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      amountPlaces = {amountPlaces}
      offers = {offerListTotal}
    />
  </React.StrictMode>
);

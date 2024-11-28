import { Route, BrowserRouter, Routes } from 'react-router-dom';
import WelcomeScreen from '../pages/welcome-screen/welcome-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import AuthScreen from '../pages/auth-screen/auth-screen';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';
import { AppRoute } from './const';

type AppScreenProps = {
  amountPlaces: number;
};

function App({ amountPlaces }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<WelcomeScreen amountPlaces={amountPlaces} />}
        />
        <Route path={AppRoute.Favorites} element={<FavoritesScreen />} />
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
        <Route path={AppRoute.Login} element={<AuthScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { RootState } from '../../types/state';
import Spinner from '../spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useDataLoading } from '../../hooks/use-data-loading';
import HistoryRouter from '../../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state: RootState) => state.authorizationStatus
  );

  const isDataLoading = useDataLoading();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<MainScreen />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferScreen />} />
          <Route path={AppRoute.Login} element={<AuthScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;

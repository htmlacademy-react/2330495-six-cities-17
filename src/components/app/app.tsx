import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { RootState } from '../../types/state';
import Spinner from '../../pages/spinner/spinner';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { useDataLoading } from '../../hooks/use-data-loading';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state: RootState) => state.authorizationStatus
  );
  // const isDataLoading = useAppSelector((state: RootState) => state.isDataLoading);
  const isDataLoading = useDataLoading();

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();
  // // eslint-disable-next-line react-hooks/rules-of-hooks
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
      <BrowserRouter>
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
          <Route
            path={AppRoute.Login}
            // element={
            //   <PrivateRoute authorizationStatus={authorizationStatus}>
            //     <AuthScreen />
            //   </PrivateRoute>
            // }
            element={<AuthScreen />}
          />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

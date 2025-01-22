import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
// import { Offer } from '../../types/offers';
import FavoritesPlacesList from '../../components/favoriets-places-list/favoriets-places-list';
import { Link } from 'react-router-dom';
// import { RootState } from '../../types/state';
import { useAppSelector } from '../../hooks';
// import { useEffect } from 'react';
import { groupOffersByCity } from '../../utils/group -offers-by-city';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import FavoritiesEmptyScreen from '../../components/favorites-empty-screen';

// type FavoritesScreenProps = {
//   // offers: Offer[];
//   // cardClassName: string;
//   // onHandleActiveIdChange: (id: string | null) => void;
// };

function FavoritesScreen(
  // offers,
// cardClassName,
// onHandleActiveIdChange,
): JSX.Element {
  // const getFavorites = (state: RootState) => state.favorites;
  // const useFavorites = () => useAppSelector(getFavorites);

  // const favorites = useFavorites();
  // console.log(favorites);
  // console.log('Favorites from Redux:', favorites);

  // useEffect(() => {
  //   console.log('Favorites updated:', favorites);
  // }, [favorites]);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  console.log(favorites);

  useEffect(() => {
    console.log('Favorites updated:', favorites);
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const groupedOffers = groupOffersByCity(favorites);

  return (
    <div className="page">
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <Header />
      {favorites.length === 0 ? (
        <FavoritiesEmptyScreen />
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <ul className="favorites__list">
                {Object.entries(groupedOffers).map(([city, cityOffers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <FavoritesPlacesList offers={cityOffers} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">
        <Link className="footer__logo-link" to="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;

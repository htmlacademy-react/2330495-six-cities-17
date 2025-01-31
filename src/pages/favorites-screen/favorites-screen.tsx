import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import FavoritesPlacesList from '../../components/favoriets-places-list/favoriets-places-list';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { groupOffersByCity } from '../../utils/group -offers-by-city';
import FavoritiesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);

  const groupedOffers = groupOffersByCity(favorites);

  return (
    <div className="page">
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <Header />
      {favorites.length === 0 ? (
        <FavoritiesEmpty />
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
                        <Link className="locations__item-link" to="/">
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

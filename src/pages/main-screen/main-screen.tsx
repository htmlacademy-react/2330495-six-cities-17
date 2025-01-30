import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import { Helmet } from 'react-helmet-async';
import CitiesPlacesList from '../../components/cities-places-list/cities-places-list';

function MainScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <Header></Header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList></LocationsList>
          </section>
        </div>
        <div className="cities">
          <CitiesPlacesList />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

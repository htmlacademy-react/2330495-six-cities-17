import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/location';
import { Helmet } from 'react-helmet-async';
import CitiesPlacesList from '../../components/cities-places-list/cities-places-list';
import { Offers } from '../../types/offers';

type WelcomeScreenProps = {
  amountPlaces: number;
 offers:Offers;
 cardClassName:string;
};

function WelcomeScreen({ amountPlaces,offers,cardClassName }: WelcomeScreenProps): JSX.Element {
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
          <div className="cities__places-container container">
            {/* <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {amountPlaces} places to stay in Amsterdam
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <CitiesPlacesList offers= {offers} cardClassName={cardClassName}></CitiesPlacesList>
            </section> */}
            <CitiesPlacesList offers={offers} cardClassName={cardClassName} amountPlaces={amountPlaces}></CitiesPlacesList>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;

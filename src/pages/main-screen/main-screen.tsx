import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/location-list';
import { Helmet } from 'react-helmet-async';
import CitiesPlacesList from '../../components/cities-places-list/cities-places-list';
import { Offers } from '../../types/offers';
import { City, Locations } from '../../types/offer';
// import { useState } from 'react';

type MainScreenProps = {
  offers: Offers;
  cardClassName: string;
  // onHandleActiveIdChange: (id: string | null) => void;
  city: City;
  points: Locations;
  // isActiveId: string | null;
};

function MainScreen({
  offers,
  cardClassName,
  // onHandleActiveIdChange,
  city,
  points,
}: // isActiveId
MainScreenProps): JSX.Element {
  // const [isActiveId, setIsActiveId] = useState<string | null>(null);

  // // eslint-disable-next-line no-console
  // console.log(isActiveId);

  // const handleActiveIdChange = (id: string | null) => {
  //   setIsActiveId(id);
  // };
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
          <CitiesPlacesList
            offers={offers}
            cardClassName={cardClassName}
            // onHandleActiveIdChange={handleActiveIdChange}
            city={city}
            points={points}
            // isActiveId={isActiveId}
          />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

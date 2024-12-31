import Card from '../card/card';
import Map from '../../components/map/map';
import { useState, useEffect } from 'react';
// import { RootState } from '../../store';
import { RootState, AppDispatch } from '../../types/state';
import { useDispatch, useSelector } from 'react-redux';
import { City } from '../../types/offer';
import { Town } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';


type CitiesPlacesListProps = {
  cardClassName: string;
};

function CitiesPlacesList({
  cardClassName,
}: CitiesPlacesListProps): JSX.Element {
  const [isActiveId, setIsActiveId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);


  const currentCity = useSelector((state: RootState) => state.currentCity);
  const offersCity = useSelector((state: RootState) =>
    state.offers.filter((offer) => (offer.city.name as Town) === currentCity)
  );


  const city: City | null = offersCity.length > 0 ? offersCity[0].city : null;


  const points = offersCity.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const handleActiveIdChange = (id: string | null) => {
    setIsActiveId(id);
  };

  if (!city) {
    return <p>No offers available for {currentCity}</p>;
  }

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offersCity.length} places to stay in {currentCity}
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
            <li className="places__option places__option--active" tabIndex={0}>
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
        <div className="cities__places-list places__list tabs__content">
          {offersCity.map((offer) => (
            <Card
              key={offer.id}
              offer={offer}
              cardClassName={cardClassName}
              onHandleActiveIdChange={handleActiveIdChange}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map city={city} points={points} isActiveId={isActiveId}></Map>
      </div>
    </div>
  );
}

export default CitiesPlacesList;

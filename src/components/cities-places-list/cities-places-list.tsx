import Card from '../card/card';
import { Offers } from '../../types/offers';
import Map from '../../components/map/map';
import { City, Locations } from '../../types/offer';

type CitiesPlacesLisProps = {
  onHandleActiveIdChange: (id: string | null) => void;
  offers: Offers;
  cardClassName: string;
  city: City;
  points: Locations;
  isActiveId:string | null;
};

function CitiesPlacesList({
  onHandleActiveIdChange,
  offers,
  cardClassName,
  city,
  points,isActiveId
}: CitiesPlacesLisProps): JSX.Element {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in Amsterdam
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
          {offers.map((offer) => (
            <Card
              key={offer.id}
              offer={offer}
              cardClassName={cardClassName}
              onHandleActiveIdChange={onHandleActiveIdChange}
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

import Card from '../card/card';
import Map from '../../components/map/map';
import { useState } from 'react';
// import { RootState } from '../../store';
import { RootState } from '../../types/state';
import { useSelector } from 'react-redux';
import { City} from '../../types/offer';
import { Town } from '../../const';

type CitiesPlacesListProps = {
  cardClassName: string; // Передача класса через пропсы
};

function CitiesPlacesList({ cardClassName }: CitiesPlacesListProps): JSX.Element {
  const [isActiveId, setIsActiveId] = useState<string | null>(null);

  // Получение текущего города и предложений из состояния Redux
  const currentCity = useSelector((state: RootState) => state.currentCity);
  const offersCity = useSelector((state: RootState) =>
    state.offers.filter((offer) => offer.city.name as Town === currentCity)
  );

  // Получение текущего города
  const city: City | null = offersCity.length > 0 ? offersCity[0].city : null;

  // Создание списка точек на карте
  const points = offersCity.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const handleActiveIdChange = (id: string | null) => {
    setIsActiveId(id);
  };

  // Если предложений для текущего города нет
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

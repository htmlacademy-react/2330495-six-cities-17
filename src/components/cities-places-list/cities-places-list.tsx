import Card from '../card/card';
// import Map from '../../components/map/map';
import { useState } from 'react';
// import { RootState } from '../../store';
import { RootState } from '../../types/state';
// import { useSelector } from 'react-redux';
import { City } from '../../types/offer';
import { Offer } from '../../types/offers';
import { SortItem } from '../../const';
// import { fetchOffersAction } from '../../store/api-actions';
import Sorting from '../sorting/sorting';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import { useOffersCity } from '../../hooks/use-offers-city';
import { useCurrentCity } from '../../hooks/use-current-city';
import { useAppSelector } from '../../hooks';
import { CardClassName } from '../../const';
import Spinner from '../../pages/spinner/spinner';
import { CitiesMap } from '../../utils/map-components';

type CitiesPlacesListProps = {
  cardClassName: CardClassName;
};

const sortOffers = (offers: Offer[], sortType: SortItem) => {
  switch (sortType) {
    case SortItem.PriceLow:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortItem.PriceHigh:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortItem.Rating:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

function CitiesPlacesList({
  cardClassName,
}: CitiesPlacesListProps): JSX.Element {
  const [isActiveId, setIsActiveId] = useState<string | null>(null);


  const isLoading = useAppSelector((state: RootState) => state.isLoading);


  const currentCity = useCurrentCity();

  const offersCity = useOffersCity();

  const currentSort = useAppSelector((state: RootState) => state.currentSort);

  const sortedOffers = sortOffers(offersCity, currentSort);


  const city: City | null =
    sortedOffers.length > 0 ? sortedOffers[0].city : null;

  const points = sortedOffers.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const handleActiveIdChange = (id: string | null) => {
    setIsActiveId(id);
  };

  if (isLoading) {
    return <Spinner />;
    // return <p> Загрузка</p>;
  }

  if (!city) {
    return <MainEmptyScreen />;
  }


  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {sortedOffers.length} places to stay in {currentCity}
        </b>
        <Sorting />
        <div className="cities__places-list places__list tabs__content">
          {sortedOffers.map((offer) => (
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
        <CitiesMap city={city} points={points} isActiveId={isActiveId}/>
      </div>
    </div>
  );
}

export default CitiesPlacesList;

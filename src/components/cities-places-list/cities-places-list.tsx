import Card from '../card/card';
import Map from '../../components/map/map';
import { useState, useEffect } from 'react';
// import { RootState } from '../../store';
import { RootState, AppDispatch } from '../../types/state';
import { useDispatch, useSelector } from 'react-redux';
import { City } from '../../types/offer';
import { Offers } from '../../types/offers';
import { Town, SortItem } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';
import Sorting from '../sorting/sorting';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';

import Spinner from '../spinner/spinner';

type CitiesPlacesListProps = {
  cardClassName: string;
};

const sortOffers = (offers: Offers, sortType: SortItem) => {
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
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const isLoading = useSelector((state: RootState) => state.isLoading);

  const currentCity = useSelector((state: RootState) => state.currentCity);
  const offersCity = useSelector((state: RootState) =>
    state.offers.filter((offer) => (offer.city.name as Town) === currentCity)
  );

  const currentSort = useSelector((state: RootState) => state.currentSort);

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
    // return <Spinner />;
    return <p> Загрузка</p>;
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
        <Map city={city} points={points} isActiveId={isActiveId}></Map>
      </div>
    </div>
  );
}

export default CitiesPlacesList;

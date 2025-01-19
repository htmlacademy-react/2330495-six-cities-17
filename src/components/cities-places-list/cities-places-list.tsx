import Card from '../card/card';
import { useState, useMemo } from 'react';
import { RootState } from '../../types/state';
import { Offer, City } from '../../types/offers';
import { SortItem } from '../../const';
import Sorting from '../sorting/sorting';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import { useOffersCity } from '../../hooks/use-offers-city';
import { useCurrentCity } from '../../hooks/use-current-city';
import { useAppSelector } from '../../hooks';
import { CardClassName } from '../../const';
// import Spinner from '../../pages/spinner/spinner';
import { CitiesMap } from '../../utils/map-components';
import React from 'react';
import { useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthorizationStatus } from '../../const';
// import { useEffect } from 'react';

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

// eslint-disable-next-line react-refresh/only-export-components
function CitiesPlacesList({
  cardClassName,
}: CitiesPlacesListProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state: RootState) => state.authorizationStatus
  );

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (authorizationStatus !== AuthorizationStatus.Auth) {
  //     navigate('/login');
  //   }
  // }, [authorizationStatus, navigate]);

  const [isActiveId, setIsActiveId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: prevFavorites[id] ?? false, // Если undefined, ставим false
    }));
  };

  const currentCity = useCurrentCity();

  const offersCity = useOffersCity();

  const currentSort = useAppSelector((state: RootState) => state.currentSort);

  // const sortedOffers = sortOffers(offersCity, currentSort);

  const sortedOffers = useMemo(
    () => sortOffers(offersCity, currentSort),
    [offersCity, currentSort]
  );

  const city: City | null =
    sortedOffers.length > 0 ? sortedOffers[0].city : null;

  // const points = sortedOffers.map((offer) => ({
  //   id: offer.id,
  //   location: offer.location,
  // }));

  const points = useMemo(
    () =>
      sortedOffers.map((offer) => ({
        id: offer.id,
        location: offer.location,
      })),
    [sortedOffers]
  );

  // const handleActiveIdChange = (id: string | null) => {
  //   setIsActiveId(id);
  // };

  const handleActiveIdChange = useCallback((id: string | null) => {
    setIsActiveId(id);
  }, []);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  if (!city) {
    return <MainEmptyScreen currentCity={currentCity} />;
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
              isFavorite={favorites[offer.id] ?? false}
              onToggleFavorite={() => toggleFavorite(offer.id)}
              authorizationStatus={authorizationStatus}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <CitiesMap city={city} points={points} isActiveId={isActiveId} />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(CitiesPlacesList);

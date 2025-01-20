// import Card from '../card/card';
import { useMemo } from 'react';
// import { RootState } from '../../types/state';
import { City } from '../../types/offers';
// import { SortItem } from '../../const';
import Sorting from '../sorting/sorting';
import MainEmptyScreen from '../../pages/main-empty-screen/main-empty-screen';
import { useOffersCity } from '../../hooks/use-offers-city';
import { useCurrentCity } from '../../hooks/use-current-city';
// import { useAppSelector } from '../../hooks';
import { CardClassName } from '../../const';
// import { CitiesMap } from '../../utils/map-components';
// import { useCallback } from 'react';
import { useDataLoading } from '../../hooks/use-data-loading';
import Spinner from '../../pages/spinner/spinner';
import OffersListTemplate from '../offer-list-template/offer-list-template';
import { useFavorites } from '../../hooks/use-favorite';
import { useSortedOffers } from '../../hooks/use-sorted-offers';
import { useActiveId } from '../../hooks/use-active-id';
import CityMapSection from '../city-map-section/city-map-section';

function CitiesPlacesList(): JSX.Element {
  const isDataLoading = useDataLoading();

  const { favorites, toggleFavorite } = useFavorites();

  const currentCity = useCurrentCity();

  const offersCity = useOffersCity();

  const sortedOffers = useSortedOffers(offersCity);

  const city: City | null =
    sortedOffers.length > 0 ? sortedOffers[0].city : null;

  const points = useMemo(
    () =>
      sortedOffers.map((offer) => ({
        id: offer.id,
        location: offer.location,
      })),
    [sortedOffers]
  );

  const { isActiveId, handleActiveIdChange } = useActiveId();

  if (isDataLoading) {
    return <Spinner />;
  }

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
        <OffersListTemplate
          offers={sortedOffers}
          cardClassName={CardClassName.Cities}
          wrapperClassName="cities__places-list places__list tabs__content"
          onHandleActiveIdChange={handleActiveIdChange}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </section>
      {/* <div className="cities__right-section">
        <CitiesMap city={city} points={points} isActiveId={isActiveId} />
      </div> */}
      {/* <CityMapSection city={city} points={points} isActiveId={isActiveId} /> */}
      <CityMapSection
        city={city}
        points={points}
        isActiveId={isActiveId}
        wrapperClassName="cities__right-section"
      />
    </div>
  );
}

export default CitiesPlacesList;

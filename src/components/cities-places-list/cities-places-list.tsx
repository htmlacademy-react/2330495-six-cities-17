import { City } from '../../types/offers';
import { CardClassName } from '../../const';

import Sorting from '../sorting/sorting';

import MainEmptyScreen from '../main-empty-screen';

import { useOffersCity } from '../../hooks/use-offers-city';
import { useCurrentCity } from '../../hooks/use-current-city';
import { useDataLoading } from '../../hooks/use-data-loading';
import { useSortedOffers } from '../../hooks/use-sorted-offers';
import { useActiveId } from '../../hooks/use-active-id';
import { useMapPoints } from '../../hooks/use-map-points';
import Spinner from '../../pages/spinner/spinner';
import OffersListTemplate from '../offer-list-template/offer-list-template';
import CityMapSection from '../city-map-section/city-map-section';

function CitiesPlacesList(): JSX.Element {
  const isDataLoading = useDataLoading();

  const currentCity = useCurrentCity();

  const offersCity = useOffersCity();

  const sortedOffers = useSortedOffers(offersCity);

  const city: City | null =
    sortedOffers.length > 0 ? sortedOffers[0].city : null;

  const points = useMapPoints(sortedOffers);

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
        />
      </section>
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

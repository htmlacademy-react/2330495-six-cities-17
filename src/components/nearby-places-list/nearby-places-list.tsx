import { CardClassName } from '../../const';
import { RootState } from '../../types/state';
import { Offer } from '../../types/offers';
import { useSelector } from 'react-redux';
import { MAX_NEAR_PLACES_OFFERS } from '../../const';
import Card from '../card/card';

type NearbyPlacesListProps = {
  cardClassName: CardClassName;
};

function NearbyPlacesList({
  cardClassName,
}: NearbyPlacesListProps): JSX.Element {
  const nearbyOffers = useSelector<RootState, Offer[]>(
    (state) => state.nearbyOffers
  );

  const OffersSliced = nearbyOffers.slice(0, MAX_NEAR_PLACES_OFFERS);
  return (
    <div className="near-places__list places__list">
      {OffersSliced.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardClassName={cardClassName}
          // onHandleActiveIdChange={onHandleActiveIdChange}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;

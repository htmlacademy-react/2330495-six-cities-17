
import Card from '../card/card';
import { Offers } from '../../types/offers';

type OffersListProps = {
  offers: Offers;
};

function OffersList({offers}:OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default OffersList;

import { Offer } from '../../types/offers';
import Card from '../../components/card/card';

type FavoritesPlacesListProps = {
  offers: Offer[];
  cardClassName: string;
};

function FavoritesPlacesList({
  offers,
  cardClassName,
}: FavoritesPlacesListProps): JSX.Element {
  return (
    <div className="favorites__places">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          // onHandleActiveIdChange={onHandleActiveIdChange}
          cardClassName={cardClassName}
        />
      ))}
    </div>
  );
}

export default FavoritesPlacesList;

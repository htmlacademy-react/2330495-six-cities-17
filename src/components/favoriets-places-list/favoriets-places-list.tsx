import { Offers } from '../../types/offers';
import Card from '../../components/card/card';

type FavoritesPlacesListProps = {
  offers: Offers;
  cardClassName: string;
  // onHandleActiveIdChange: (id: string | null) => void;
};

function FavoritesPlacesList({
  // onHandleActiveIdChange,
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

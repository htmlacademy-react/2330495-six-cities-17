import { Offers } from '../../types/offers';
import Card from '../../components/card/card';

type FavoritesPlacesListProps = {
  onHandleActiveIdChange: (id: string | null) => void;
  offers: Offers;
  cardClassName: string;
};

function FavoritesPlacesList({
  onHandleActiveIdChange,
  offers,
  cardClassName,
}: FavoritesPlacesListProps): JSX.Element {
  return (
    <div className="favorites__places">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} cardClassName={cardClassName} onHandleActiveIdChange={onHandleActiveIdChange} />
      ))}
    </div>
  );
}

export default FavoritesPlacesList;

import { Offers } from '../../types/offers';
// import CardFullInfo from '../../components/card-full-info/card-full-info';
import Card from '../../components/card/card';

type FavoritesPlacesListProps = {
  offers: Offers;
  cardClassName: string;
};

function FavoritesPlacesList({
  offers,
  cardClassName,
}: FavoritesPlacesListProps): JSX.Element {
  return (
    <div className="favorites__places">
      {offers.map((offer) => (
        // <CardFullInfo key={offer.id} offer={offer} />
        <Card key={offer.id} offer={offer} cardClassName={cardClassName} />
      ))}
    </div>
  );
}

export default FavoritesPlacesList;

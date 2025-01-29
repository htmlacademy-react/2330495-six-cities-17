import { Offer } from '../../types/offers';
import Card from '../../components/card/card';
import { CardClassName } from '../../const';

type FavoritesPlacesListProps = {
  offers: Offer[];
};

function FavoritesPlacesList({
  offers,
}: FavoritesPlacesListProps): JSX.Element {
  const favoritesCardClassName = CardClassName.Favorites;

  return (
    <div className="favorites__places">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardClassName={favoritesCardClassName}
        />
      ))}
    </div>
  );
}

export default FavoritesPlacesList;


import Card from '../card/card';
import { Offer } from '../../types/offers';
import { CardClassName } from '../../const';

type OffersListTemplateProps = {
  offers: Offer[];
  cardClassName: CardClassName;
  onHandleActiveIdChange: (id: string | null) => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
  wrapperClassName: string; // Класс для оборачивающего div
};

function OffersListTemplate({
  offers,
  cardClassName,
  onHandleActiveIdChange,
  favorites,
  onToggleFavorite,
  wrapperClassName,
}: OffersListTemplateProps): JSX.Element {
  return (
    <div className={wrapperClassName}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardClassName={cardClassName}
          onHandleActiveIdChange={onHandleActiveIdChange}
          isFavorite={favorites[offer.id] ?? false}
          onToggleFavorite={() => onToggleFavorite(offer.id)}
        />
      ))}
    </div>
  );
}

export default OffersListTemplate;


import Card from '../card/card';
import { Offer } from '../../types/offers';
import { CardClassName } from '../../const';

type OffersListTemplateProps = {
  offers: Offer[];
  cardClassName: CardClassName;
  onHandleActiveIdChange?: (id: string | null) => void;
  wrapperClassName: string;
};

function OffersListTemplate({
  offers,
  cardClassName,
  onHandleActiveIdChange,
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
        />
      ))}
    </div>
  );
}

export default OffersListTemplate;

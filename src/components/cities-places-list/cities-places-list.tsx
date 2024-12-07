

import Card from '../card/card';
import { Offers } from '../../types/offers';

type CitiesPlacesLisProps = {
  offers: Offers;
  cardClassName: string;
};

function CitiesPlacesList ({offers,cardClassName}:CitiesPlacesLisProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} cardClassName={cardClassName}/>
      ))}
    </div>
  );
}

export default CitiesPlacesList;

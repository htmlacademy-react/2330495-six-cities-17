import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
// import FormComments from '../../form-comments/form-comments';
import Card from '../../components/card/card';
import { FullInfoOffer } from '../../types/offers';
import FullOfferCard from '../../components/full-offer-card/full-offer-card';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchOfferById,
  fetchNearbyOffersAction,
} from '../../store/api-actions';
import { RootState } from '../../types/state';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import Spinner from '../spinner/spinner';
import { MAX_NEAR_PLACES_OFFERS } from '../../const';
// import NearbyPlacesList from '../../components/nearby-places-list/nearby-places-list';
// import { useOffersCity } from '../../hooks/use-offers-city';
import { CardClassName } from '../../const';
import { Offer } from '../../types/offers';
import { useState } from 'react';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type OfferScreenProps = {
  cardClassName: CardClassName;
  // onHandleActiveIdChange
};

function OfferScreen({ cardClassName }: OfferScreenProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [isActiveId, setIsActiveId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  // const offersCity = useOffersCity();

  const currentOffer = useSelector<RootState, FullInfoOffer | null>(
    (state) => state.currentOffer
  );

  const nearbyOffers = useSelector<RootState, Offer[]>(
    (state) => state.nearbyOffers
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffersAction(id));
    }
  }, [id, dispatch]);

  const offersSliced = nearbyOffers.slice(0, MAX_NEAR_PLACES_OFFERS);

  const points = [
    ...offersSliced.map((offer) => ({
      id: offer.id,
      location: offer.location,
    })),
    ...(currentOffer
      ? [{ id: currentOffer.id, location: currentOffer.location }]
      : []),
  ];

  const handleActiveIdChange = (idOffer: string | null) => {
    setIsActiveId(idOffer);
  };


  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Предложение</title>
      </Helmet>
      <Header></Header>
      <main className="page__main page__main--offer">
        {currentOffer ? (
          <FullOfferCard
            currentOffer={currentOffer}
            points={points}
            isActiveId={isActiveId}
          ></FullOfferCard>
        ) : (
          <Spinner />
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offersSliced.map((offer) => (
                <Card
                  key={offer.id}
                  offer={offer}
                  cardClassName={cardClassName}
                  onHandleActiveIdChange={handleActiveIdChange}
                />
              ))}
            </div>
            {/* <NearbyPlacesList cardClassName={cardClassName}></NearbyPlacesList> */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

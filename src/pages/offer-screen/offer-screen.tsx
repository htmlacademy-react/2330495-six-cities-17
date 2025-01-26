import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
// import FormComments from '../../form-comments/form-comments';
// import Card from '../../components/card/card';
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
import { MAX_NEAR_PLACES_OFFERS } from '../../const';
import { CardClassName } from '../../const';
import { Offer } from '../../types/offers';
import { useState } from 'react';
import Spinner from '../../pages/spinner/spinner';
import OffersListTemplate from '../../components/offer-list-template/offer-list-template';
// import { useFavorites } from '../../hooks/use-favorite';
// import { FavoritsButtonClassName } from '../../const';
// import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
// import { useDataLoading } from '../../hooks/use-data-loading';

function OfferScreen(): JSX.Element {
  // const isDataLoading = useDataLoading();
  const { id: offerId } = useParams<{ id: string }>();
  const [isActiveId, setIsActiveId] = useState<string | null>(null);
  // const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const dispatch = useAppDispatch();
  // const offersCity = useOffersCity();

  const currentOffer = useSelector<RootState, FullInfoOffer | null>(
    (state) => state.currentOffer
  );

  const nearbyOffers = useSelector<RootState, Offer[]>(
    (state) => state.nearbyOffers
  );

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferById(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
    }
  }, [offerId, dispatch]);

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

  // if (isDataLoading) {
  //   return <Spinner />;
  // }

  // const { favorites, toggleFavorite } = useFavorites();
  // const authorizationStatus = useAuthorizationStatus();

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
            // isFavorite={favorites[currentOffer.id]}
            // favorites={favorites}
            // onToggleFavorite={(id) => toggleFavorite(id)}
            // buttonClassName={FavoritsButtonClassName.Offer}
          />
        ) : (
          <Spinner />
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersListTemplate
              offers={offersSliced}
              cardClassName={CardClassName.NearPlaces}
              wrapperClassName="near-places__list places__list"
              onHandleActiveIdChange={handleActiveIdChange}
              // favorites={favorites}
              // onToggleFavorite={toggleFavorite}
              // authorizationStatus={authorizationStatus}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

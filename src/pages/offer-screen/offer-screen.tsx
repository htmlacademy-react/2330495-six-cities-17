import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
// import FormComments from '../../form-comments/form-comments';
import Card from '../../components/card/card';
import { FullInfoOffer } from '../../types/offer';
import FullOfferCard from '../../components/full-offer-card/full-offer-card';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchOfferById } from '../../store/api-actions';
import { RootState } from '../../types/state';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import Spinner from '../spinner/spinner';
import { MAX_NEAR_PLACES_OFFERS } from '../../const';
import { useOffersCity } from '../../hooks/use-offers-city';


type OfferScreenProps = {
  cardClassName: string;
};

function OfferScreen({ cardClassName }: OfferScreenProps): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const offersCity = useOffersCity();

  const currentOffer = useSelector<RootState, FullInfoOffer | null>(
    (state) => state.currentOffer
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
    }
  }, [id, dispatch]);



  return (
    <div className="page">
      <Helmet>
        <title>Предложение</title>
      </Helmet>
      <Header></Header>
      <main className="page__main page__main--offer">
        {currentOffer ? (
          <FullOfferCard currentOffer={currentOffer}></FullOfferCard>
        ) : (
          <Spinner />
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offersCity.slice(0, MAX_NEAR_PLACES_OFFERS).map((offer) => (
                <Card
                  key={offer.id}
                  offer={offer}
                  cardClassName={cardClassName}
                  // onHandleActiveIdChange={onHandleActiveIdChange}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

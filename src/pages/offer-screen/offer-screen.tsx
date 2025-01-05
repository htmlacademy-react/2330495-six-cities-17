import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
// import FormComments from '../../form-comments/form-comments';
import Card from '../../components/card/card';
import { Offer } from '../../types/offers';
import { FullInfoOffer } from '../../types/offer';
import FullOfferCard from '../../components/full-offer-card/full-offer-card';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchOfferById } from '../../store/api-actions';
import { RootState } from '../../types/state';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import Spinner from '../spinner/spinner';

type OfferScreenProps = {
  cardClassName: string;
  offers: Offer[];
  // fullOffer: FullInfoOffer;
  // onHandleActiveIdChange: (id: string | null) => void;
};

function OfferScreen({
  cardClassName,
  offers,
}: // fullOffer,
// onHandleActiveIdChange
OfferScreenProps): JSX.Element {
  // const { goods } = fullOffer;

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

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
          <Spinner/>
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offers.map((offer) => (
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

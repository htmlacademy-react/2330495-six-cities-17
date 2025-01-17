import FormComments from '../form-comments/form-comments';
import UserReview from '../review/review';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { RootState } from '../../types/state';
import { useEffect } from 'react';
import { fetchReviewsAction } from '../../store/api-actions';

type ReviewsProps = {
  offerId: string;
};

function Reviews({ offerId }: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state: RootState) => state.reviews);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchReviewsAction(offerId));
    }
  }, [dispatch, offerId]);

  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <UserReview key={review.id} review={review} />
        ))}
      </ul>
      <FormComments offerId={offerId}></FormComments>
    </section>
  );
}

export default Reviews;

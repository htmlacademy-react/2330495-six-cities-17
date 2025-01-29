import { Review } from '../../types/reviews';

type ReviewProps = {
  review: Review;
};

function formatDate(dateString: string): {
  formatted: string;
  datetime: string;
} {
  const date = new Date(dateString);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];

  return {
    formatted: `${month} ${year}`,
    datetime: `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`,
  };
}

function UserReview({ review }: ReviewProps): JSX.Element {
  const { user, comment, date, rating } = review;
  const { formatted, datetime } = formatDate(date);

  const ratingPercentage = `${Math.round(rating) * 20}%`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingPercentage }}></span>
            <span className="visually-hidden">{`Rating: ${rating}`}</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={datetime}>
          {formatted}
        </time>
      </div>
    </li>
  );
}

export default UserReview;

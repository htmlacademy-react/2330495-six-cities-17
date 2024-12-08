import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';

type CardProps = {
  offer: Offer;
  cardClassName: string;
  onHandleActiveIdChange: (id: string | null) => void;
};

const IMAGE_SIZES = {
  'favorites__card place-card': { width: 150, height: 110 },
  'cities__card place-card': { width: 260, height: 200 },
  'near-places__card place-card': { width: 260, height: 200 },
};

function Card({
  offer,
  cardClassName,
  onHandleActiveIdChange,
}: CardProps): JSX.Element {
  const { price, title, type, rating } = offer;

  const cardClass = `${cardClassName}__card place-card`;
  const imgCardClass = `${cardClassName}__image-wrapper place-card__image-wrapper`;
  const { width, height } = IMAGE_SIZES[
    cardClass as keyof typeof IMAGE_SIZES
  ] || { width: 260, height: 200 };

  return (
    <article
      className={cardClass}
      onMouseEnter={() => onHandleActiveIdChange(offer.id)}
      onMouseLeave={() => onHandleActiveIdChange(null)}
    >
      <div className={imgCardClass}>
        <a href="#">
          <img
            className="place-card__image"
            src="img/room.jpg"
            width={width}
            height={height}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;

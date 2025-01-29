import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookmarkButton from '../bookmark -button/bookmark -button';
import { FavoritsButtonClassName } from '../../const';


type CardProps = {
  offer: Offer;
  cardClassName: string;
  onHandleActiveIdChange?: (id: string | null) => void;
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
  const { price, title, type, rating, id, isPremium, previewImage } = offer;

  const cardClass = `${cardClassName}__card place-card`;
  const imgCardClass = `${cardClassName}__image-wrapper place-card__image-wrapper`;
  const { width, height } = IMAGE_SIZES[
    cardClass as keyof typeof IMAGE_SIZES
  ] || { width: 260, height: 200 };

  const ratingPercentage = `${Math.round(rating) * 20}%`;

  return (
    <article
      className={cardClass}
      onMouseEnter={
        onHandleActiveIdChange && (() => onHandleActiveIdChange(id))
      }
      onMouseLeave={
        onHandleActiveIdChange && (() => onHandleActiveIdChange(null))
      }
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={imgCardClass}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={width}
            height={height}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <BookmarkButton
            idFavorite={id}
            buttonClassName={FavoritsButtonClassName.Place}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingPercentage }}></span>
            <span className="visually-hidden">{`Rating: ${rating}`}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
      <ToastContainer />
    </article>
  );
}

export default Card;

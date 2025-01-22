import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookmarkButton from '../bookmark -button/bookmark -button';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
// import PrivateRoute from '../private-route/private-route';
import { FavoritsButtonClassName } from '../../const';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import { useFavorites } from '../../hooks/use-favorite';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';

type CardProps = {
  offer: Offer;
  cardClassName: string;
  onHandleActiveIdChange?: (id: string | null) => void;
  // isFavorite?: boolean;
  // onToggleFavorite?: () => void;
  // authorizationStatus?: AuthorizationStatus;
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
}: // isFavorite,
// onToggleFavorite,
// authorizationStatus,
CardProps): JSX.Element {
  const { price, title, type, rating, id, isPremium, previewImage } = offer;

  const cardClass = `${cardClassName}__card place-card`;
  const imgCardClass = `${cardClassName}__image-wrapper place-card__image-wrapper`;
  const { width, height } = IMAGE_SIZES[
    cardClass as keyof typeof IMAGE_SIZES
  ] || { width: 260, height: 200 };

  const ratingPercentage = `${Math.round(rating) * 20}%`;

  // console.log(authorizationStatus);
  // const handleFavoriteClick = () => {
  //   if (authorizationStatus !== AuthorizationStatus.Auth) {
  //     console.log('User is not authorized, navigating to login page.');
  //      navigate(AppRoute.Main);
  //      return;
  //   }

  //   onToggleFavorite();
  // };
  const { favorites, toggleFavorite } = useFavorites(); // Исправлено имя функции
  const isFavorite = favorites[offer?.id] ?? false;
  // const  onToggleFavorite=() => onToggleFavorite(offer.id)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch, favorites]);

  const navigate = useNavigate();

  const authorizationStatus = useAuthorizationStatus();

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    toggleFavorite(offer.id);
  };

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
        <Link to="#">
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
            isFavorite={isFavorite}
            handleFavoriteClick={handleFavoriteClick}
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

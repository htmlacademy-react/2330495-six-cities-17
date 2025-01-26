import { FavoritsButtonClassName } from '../../const';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
// import { useFavorites } from '../../hooks/use-favorite';
// import { useAppDispatch } from '../../hooks';
// import { useEffect } from 'react';
// import { fetchFavoritesAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteAction } from '../../store/api-actions';


type BookmarkButtonProps = {
  idFavorite:string;
  // isFavorite: boolean;
  // handleFavoriteClick: () => void;
  buttonClassName: FavoritsButtonClassName;
};

function BookmarkButton({
  // isFavorite,
  idFavorite,
  // handleFavoriteClick,
  buttonClassName,
}: BookmarkButtonProps): JSX.Element {
  const buttonClass = `${buttonClassName}__bookmark-button`;
  const iconClass = `${buttonClassName}__bookmark-icon`;


  const BUTTON_SIZES = {
    'place-card__bookmark-icon': { width: 18, height: 19 },
    'offer__bookmark-icon': { width: 31, height: 33 },
  };
  const { width, height } = BUTTON_SIZES[
    iconClass as keyof typeof BUTTON_SIZES
  ] || { width: 18, height: 19 };

  const favorites = useAppSelector((state) => state.favorites);

  const isFavorite = favorites.findIndex((offer)=>offer.id === idFavorite) !== -1;

  const navigate = useNavigate();

  const authorizationStatus = useAuthorizationStatus();


  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(toggleFavoriteAction({ id: idFavorite, isFavorite }));
  };


  return (
    <button
      className={`${buttonClass} ${
        isFavorite ? `${buttonClass}--active` : ''
      } button`}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('Bookmark button clicked. Current status:', isFavorite);
        handleFavoriteClick();
      }}
      type="button"
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg className={iconClass} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'Add to bookmarks'}
      </span>
    </button>
  );
}

export default BookmarkButton;

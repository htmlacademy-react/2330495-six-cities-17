
import { useAppDispatch } from '../../hooks';
// import { AuthorizationStatus } from '../../const';
import { uploadFavoritesStatusAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../types/state';

type BookmarkButtonProps = {
  // isFavorite: boolean;
  // handleFavoriteClick: () => void;
  offerId: string;
};

function BookmarkButton({
  offerId,
}: // isFavorite,
// handleFavoriteClick,
BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const favoriteOffers = useAppSelector(
    (state: RootState) => state.favoriteOffers
  );

  const isFavorite = favoriteOffers.some((offer) => offer.id === offerId);
  const handleFavoriteClick = () => {
    // eslint-disable-next-line no-console
    console.log(
      `Current favorite status: ${isFavorite ? 'Favorited' : 'Not Favorited'}`
    );
    // eslint-disable-next-line no-console
    console.log(
      `Attempting to update offerId: ${offerId} to status: ${
        isFavorite ? 0 : 1
      }`
    );

    if (!offerId) {
      // eslint-disable-next-line no-console
      console.error('Invalid offerId:', offerId);
      return;
    }

    dispatch(
      uploadFavoritesStatusAction({ offerId, status: isFavorite ? 0 : 1 })
    )
      .unwrap()
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(
          `Successfully updated favorite status for offerId: ${offerId}`
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(
          'Error updating favorite status:',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          error.response?.data || error.message
        );
      });
  };
  return (
    <button
      className={`place-card__bookmark-button ${
        isFavorite ? 'place-card__bookmark-button--active' : ''
      } button`}
      onClick={handleFavoriteClick}
      type="button"
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'Add to bookmarks'}
      </span>
    </button>
  );
}

export default BookmarkButton;

import { FavoritsButtonClassName } from '../../const';

type BookmarkButtonProps = {
  isFavorite: boolean;
  handleFavoriteClick: () => void;
  buttonClassName: FavoritsButtonClassName;
};

function BookmarkButton({
  isFavorite,
  handleFavoriteClick,
  buttonClassName,
}: BookmarkButtonProps): JSX.Element {
  const buttonClass = `${buttonClassName}__bookmark-button`;
  const iconClass = `${buttonClassName}__bookmark-icon`;

  // const iconSizes = buttonClassName === FavoritsButtonClassName.Offer
  // ? { width: 31, height: 33 }
  // : { width: 18, height: 19 };

  const BUTTON_SIZES = {
    'place-card__bookmark-icon': { width: 18, height: 19 },
    'offer__bookmark-icon': { width: 31, height: 33 },
  };
  const { width, height } = BUTTON_SIZES[
    iconClass as keyof typeof BUTTON_SIZES
  ] || { width: 18, height: 19 };

  return (
    <button
      className={`${buttonClass} ${
        isFavorite ? `${buttonClass}--active` : ''
      } button`}
      onClick={() => {
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

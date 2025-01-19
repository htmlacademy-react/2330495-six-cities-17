type BookmarkButtonProps = {
  isFavorite: boolean;
  handleFavoriteClick: () => void;
};

function BookmarkButton({
  isFavorite,
  handleFavoriteClick,
}: BookmarkButtonProps): JSX.Element {
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

import { useDispatch, useSelector } from 'react-redux';
import { changeSorting } from '../../store/action';
import { SortItem } from '../../const';
import { RootState } from '../../types/state';
import { useState, useRef, useEffect } from 'react';

function Sorting() {
  const dispatch = useDispatch();
  const currentSort = useSelector((state: RootState) => state.currentSort);

  const [isOpen, setIsOpen] = useState(false);
  const sortingRef = useRef<HTMLDivElement | null>(null);

  const handleSortChange = (sortType: SortItem) => {
    dispatch(changeSorting(sortType));
    setIsOpen(false);
  };

  const toggleSorting = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sortingRef.current &&
        !sortingRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={sortingRef}>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span
          className="places__sorting-type"
          tabIndex={0}
          onClick={toggleSorting}
        >
          {currentSort}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        {isOpen && (
          <ul className="places__options places__options--custom places__options--opened">
            {Object.values(SortItem).map((sortType) => (
              <li
                key={sortType}
                className={`places__option ${
                  currentSort === sortType ? 'places__option--active' : ''
                }`}
                tabIndex={0}
                onClick={() => handleSortChange(sortType)}
              >
                {sortType}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default Sorting;

import { useDispatch, useSelector } from 'react-redux';
import { changeSorting } from '../../store/action';
import { SortItem } from '../../const';
import { RootState } from '../../types/state';

function Sorting() {
  const dispatch = useDispatch();
  const currentSort = useSelector((state: RootState) => state.currentSort);
  const handleSortChange = (sortType: SortItem) => {
    dispatch(changeSorting(sortType));
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {/* <li className="places__option places__option--active" tabIndex={0}>
          Popular
        </li>
        <li className="places__option" tabIndex={0}>
          Price: low to high
        </li>
        <li className="places__option" tabIndex={0}>
          Price: high to low
        </li>
        <li className="places__option" tabIndex={0}>
          Top rated first
        </li> */}
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
    </form>
  );
}

export default Sorting;

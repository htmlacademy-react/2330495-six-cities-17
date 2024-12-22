import { Town } from '../../const';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/action';
import { RootState } from '../../types/state';
import { useDispatch, useSelector } from 'react-redux';

function LocationsList() {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.currentCity);
  const handleCityClick = (city: Town) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {Object.values(Town).map((city) => (
        <li key={city} className="locations__item">
          <Link
            className={`locations__item-link tabs__item ${
              currentCity === city ? 'tabs__item--active' : ''
            }`}
            to="#"
            onClick={() => handleCityClick(city)}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationsList;

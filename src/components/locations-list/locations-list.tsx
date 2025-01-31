import { Town } from '../../const';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/action';
import { useCurrentCity } from '../../hooks/use-current-city';
import { useAppDispatch } from '../../hooks';

function LocationsList() {
  const dispatch = useAppDispatch();

  const currentCity = useCurrentCity();
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

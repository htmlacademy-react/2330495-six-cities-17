import { Town } from '../../const';
import { Link } from 'react-router-dom';

function LocationsList() {
  return (
    <ul className="locations__list tabs__list">
      <li className="locations__item">
        <Link className="locations__item-link tabs__item" to="#">
          <span>{Town.Paris}</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className="locations__item-link tabs__item" to="#">
          <span>{Town.Cologne}</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className="locations__item-link tabs__item" to="#">
          <span>{Town.Brussels}</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className="locations__item-link tabs__item tabs__item--active" to="#">
          <span>{Town.Amsterdam}</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className="locations__item-link tabs__item" to="#">
          <span>{Town.Hamburg}</span>
        </Link>
      </li>
      <li className="locations__item">
        <Link className="locations__item-link tabs__item" to="#">
          <span>{Town.Dusseldorf}</span>
        </Link>
      </li>
    </ul>
  );
}

export default LocationsList;

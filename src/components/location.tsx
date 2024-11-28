import { Town } from './const';

function Location() {
  return (
    <ul className="locations__list tabs__list">
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>{Town.Paris}</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>{Town.Cologne}</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>{Town.Brussels}</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item tabs__item--active">
          <span>{Town.Amsterdam}</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>{Town.Hamburg}</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>{Town.Dusseldorf}</span>
        </a>
      </li>
    </ul>
  );
}

export default Location;

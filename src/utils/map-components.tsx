import Map from '../components/map/map';
// import { Location, City } from '../types/offers';
import { MapClassName } from '../const';
import { MapPoints } from '../types/map-points';

export function CitiesMap(props: MapPoints) {
  return <Map {...props} mapClassName={MapClassName.Cities} />;
}

export function OfferMap(props: MapPoints) {
  return <Map {...props} mapClassName={MapClassName.Offer} />;
}

import { useRef, useEffect } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT,URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { City, Location } from '../../types/offer';

type MapProps = {
  city: City;
  points:{id:string;location:Location}[];
  isActiveId: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, points, isActiveId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            isActiveId === point.id
              ? currentCustomIcon
              : defaultCustomIcon

          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, isActiveId]);
  return <section className="cities__map map" ref={mapRef}></section>;
}

export default Map;

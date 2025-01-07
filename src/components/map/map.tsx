import { useRef, useEffect } from 'react';
import { Icon, Marker, LayerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { City, Location } from '../../types/offer';
import { MapClassName } from '../../const';

type MapProps = {
  city: City;
  points: { id: string; location: Location }[];
  isActiveId: string | null;
  mapClassName: MapClassName;
  highlightPointId?: string | null;
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

function Map({ city, points, isActiveId,mapClassName, highlightPointId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = new LayerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker.setIcon(
          point.id === isActiveId || point.id === highlightPointId
            ? currentCustomIcon
            : defaultCustomIcon
        );
        marker.addTo(markerLayer);
      });

      return () => {
        markerLayer.clearLayers(); // Удаляем маркеры
      };
    }
  }, [map, points, isActiveId, highlightPointId]);

  return <section className={mapClassName} ref={mapRef}></section>;
}

export default Map;

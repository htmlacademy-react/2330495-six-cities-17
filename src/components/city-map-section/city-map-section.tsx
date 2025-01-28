import { CitiesMap } from '../../utils/map-components';
import { City, Offer } from '../../types/offers';

type CityMapSectionProps = {
  city: City;
  points: { id: string; location: Offer['location'] }[];
  isActiveId: string | null;
  wrapperClassName?: string;
};

function CityMapSection({
  city,
  points,
  isActiveId,
  wrapperClassName = 'cities__right-section'
}: CityMapSectionProps) {
  return (
    <div className={wrapperClassName}>
      <CitiesMap city={city} points={points} isActiveId={isActiveId} />
    </div>
  );
}

export default CityMapSection;

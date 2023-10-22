import { LocationInfo } from '../store/types/Map.model';

interface Feature {
  place_type: string[];
  place_name: string;
}

export const formatLocationData = (features: Feature[]): LocationInfo => {
  let address = '';
  let place = '';
  let country = '';

  for (let f of features) {
    const type = f.place_type[0];

    if (type === 'address') {
      address = f.place_name.split(',')[0];
    }
    if (type === 'place') {
      place = f.place_name.split(',')[0];
    }
    if (type === 'country') {
      country = f.place_name;
    }
  }

  return {
    address,
    place,
    country,
  };
};

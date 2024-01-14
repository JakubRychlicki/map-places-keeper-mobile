import { Photo, StrapiPhoto } from './Utils.model';
import { User } from './User.model';
import { StrapiCategory } from './Categories';

export interface GeocodingResponse {
  type: string;
  query: string[];
  features: MapboxPlace[];
  attribution: string;
}

export interface ReverseGeocodingResponse {
  type: string;
  query: string[];
  features: {
    place_type: string[];
    place_name: string;
  }[];
  attribution: string;
}

export interface MapboxPlace {
  id: string;
  type: string;
  place_type: string[];
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  context: {
    id: string;
    text: string;
  }[];
  address?: any;
}

export interface AddPlacePayload {
  place: PlaceData;
  file: Photo | null;
}

export interface UpdatePlacePayload {
  placeID: number;
  place: Partial<PlaceData>;
  file: Photo | null;
}

export interface PlaceData {
  name: string;
  description: string;
  locality: string;
  street_address: string;
  country: string;
  category: number;
  longitude: number;
  latitude: number;
}

export interface UserPlace {
  id: number;
  attributes: {
    name: string;
    description: string;
    locality: string;
    street_address: string;
    country: string;
    longitude: number;
    latitude: number;
    graphics: StrapiPhoto;
    category: StrapiCategory;
    user?: User;
  };
}

export interface LocationDetails {
  address: string;
  place: string;
  country: string;
  coordinates: number[];
}

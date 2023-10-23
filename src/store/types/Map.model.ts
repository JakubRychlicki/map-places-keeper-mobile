import { Feature, Point } from 'geojson';
import { Photo } from './Utils.model';

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
}

export interface AddPlacePayload {
  place: PlaceData;
  file: Photo | null;
}

export interface PlaceData {
  name: string;
  description: string;
  locality: string;
  street_address: string;
  country: string;
  category: string;
  feature: Feature<Point>;
}

export interface UserPlace {
  id: number;
  attributes: {
    name: string;
    description: string;
    locality: string;
    street_address: string;
    country: string;
    category: string;
    feature: Feature<Point>;
    graphics?: any;
    user?: any;
  };
}

export interface LocationDetails {
  address: string;
  place: string;
  country: string;
  coordinates: number[];
}

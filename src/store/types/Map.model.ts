import { Feature, Point } from 'geojson';

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
  file: File;
}

export interface PlaceData {
  name: string;
  description: string;
  address: string;
  feature: Feature<Point>;
}

export interface File {
  uri: string;
  name: string;
  type: string;
}

export interface UserPlace {
  id: number;
  attributes: {
    name: string;
    description: string;
    address: string;
  };
}

export interface LocationInfo {
  address: string;
  place: string;
  country: string;
}

export interface GeocodingResponse {
  type: string;
  query: string[];
  features: MapboxPlace[];
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

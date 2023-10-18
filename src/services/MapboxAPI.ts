import { MAPBOX_TOKEN } from '@env';
import axios, { AxiosResponse } from 'axios';
import { GeocodingResponse } from '../store/types/Map.model';

export const getForwardGeocoding = async (query: string) => {
  try {
    const response: AxiosResponse<GeocodingResponse> = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          limit: 5,
          language: 'PL',
          types: 'place',
        },
      },
    );

    return response.data.features;
  } catch (error) {
    console.log(error);
  }
};

export const getReverseGeocoding = async (longitude: number, latitude: number) => {
  try {
    const response: AxiosResponse<GeocodingResponse> = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          limit: 1,
          language: 'PL',
          types: 'district,place,locality,neighborhood,address',
        },
      },
    );

    return response.data.features[0];
  } catch (error) {
    console.log(error);
  }
};

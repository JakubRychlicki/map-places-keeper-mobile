import { MAPBOX_TOKEN } from '@env';
import axios, { AxiosResponse } from 'axios';
import { GeocodingResponse, ReverseGeocodingResponse } from '../store/types/Map.model';
import { formatLocationData } from '../utils/formatLocationData';

export const getForwardGeocoding = async (query: string) => {
  try {
    const response: AxiosResponse<GeocodingResponse> = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          limit: 5,
          language: 'PL',
          types: 'address',
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
    const response: AxiosResponse<ReverseGeocodingResponse> = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          language: 'PL',
          types: 'address,place,country',
        },
      },
    );

    return formatLocationData(response.data.features);
  } catch (error) {
    console.log(error);
  }
};

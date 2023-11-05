import axios from 'axios';
import { API_URL } from '@env';
import { StoreType } from '../store/configureStore';

let store: StoreType | undefined;

export const injectStore = (_store: StoreType) => {
  store = _store;
};

export const Api = axios.create();

Api.interceptors.request.use(
  (axiosConfig) => {
    const token = store?.getState().user.token;
    const config: any = {
      ...axiosConfig,
      baseURL: API_URL + '/api',
      headers: {
        ...axiosConfig.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };

    return config;
  },
  (error) => Promise.reject(error),
);

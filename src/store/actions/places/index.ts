import { Api } from '../../../services/API';
import { AppThunk } from '../../configureStore';
import { Endpoint } from '../../../services/Enpoints';
import {
  AddUserPlaceTypes,
  DeleteUserPlaceTypes,
  GetPlacesCategoriesActionTypes,
  GetUserPlacesActionTypes,
  UpdateUserPlaceTypes,
} from '../actionTypes';
import { AddPlacePayload, UpdatePlacePayload, UserPlace } from '../../types/Map.model';
import { API_URL } from '@env';
import { AxiosResponse } from 'axios';
import { PlaceCategory } from '../../types/Categories';

export const getUserPlaces = (): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();
    const userPlacesList = state.map.userPlaces;

    dispatch({ type: GetUserPlacesActionTypes.GET_USER_PLACES });
    try {
      const { data }: AxiosResponse<{ data: UserPlace[] }> = await Api.get(
        `${Endpoint.Places}?populate=graphics,category&pagination[start]=${userPlacesList.start}&pagination[limit]=${userPlacesList.limit}`,
      );

      const newPlaces = {
        ...userPlacesList,
        data: [...userPlacesList.data, ...data.data],
        start: userPlacesList.start + data.data.length,
        reachEnd: data.data.length < userPlacesList.limit,
      };

      dispatch({ type: GetUserPlacesActionTypes.GET_USER_PLACES_SUCCESS, places: newPlaces });
    } catch (e: any) {
      dispatch({ type: GetUserPlacesActionTypes.GET_USER_PLACES_FAILURE });
    }
  };
};

export const addPlace = ({ place, file }: AddPlacePayload): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({ type: AddUserPlaceTypes.ADD_USER_PLACE });
    try {
      const placeData = {
        ...place,
        user: state.user.user?.id,
      };

      const formData = new FormData();
      if (file) {
        formData.append('files.graphics', file);
      }
      formData.append('data', JSON.stringify(placeData));

      const { data }: AxiosResponse<{ data: UserPlace }> = await Api({
        method: 'post',
        url: `${API_URL}/api${Endpoint.Places}?populate=graphics,category`,
        data: formData,
        headers: {
          Authorization: 'Bearer ' + state.user.token,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: AddUserPlaceTypes.ADD_USER_PLACE_SUCCESS, place: data.data });
    } catch (e: any) {
      dispatch({ type: AddUserPlaceTypes.ADD_USER_PLACE_FAILURE });
    }
  };
};

export const deletePlace = (placeId: number): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: DeleteUserPlaceTypes.DELETE_USER_PLACE });
    try {
      const response = await Api.delete(`${Endpoint.Places}/${placeId}`);

      dispatch({ type: DeleteUserPlaceTypes.DELETE_USER_PLACE_SUCCESS, placeId: placeId });
    } catch (e: any) {
      dispatch({ type: DeleteUserPlaceTypes.DELETE_USER_PLACE_FAILURE });
    }
  };
};

export const updatePlace = ({ placeID, place, file }: UpdatePlacePayload): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({ type: UpdateUserPlaceTypes.UPDATE_USER_PLACE });
    try {
      const placeData = {
        ...place,
      };

      const formData = new FormData();
      if (file) {
        formData.append('files.graphics', file);
      }
      formData.append('data', JSON.stringify(placeData));

      const { data }: AxiosResponse<{ data: UserPlace }> = await Api({
        method: 'put',
        url: `${API_URL}/api${Endpoint.Places}/${placeID}?populate=graphics,category`,
        data: formData,
        headers: {
          Authorization: 'Bearer ' + state.user.token,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: UpdateUserPlaceTypes.UPDATE_USER_PLACE_SUCCESS, place: data.data });
    } catch (e: any) {
      dispatch({ type: UpdateUserPlaceTypes.UPDATE_USER_PLACE_SUCCESS });
    }
  };
};

export const getPlacesCategories = (): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();
    const categoriesList = state.map.categories;

    dispatch({ type: GetPlacesCategoriesActionTypes.GET_PLACES_CATEGORIES });
    try {
      const { data }: AxiosResponse<{ data: PlaceCategory[] }> = await Api.get(
        `${Endpoint.DefaultCategories}?sort[0]=order&pagination[start]=${categoriesList.start}&pagination[limit]=${categoriesList.limit}&populate=localizations`,
      );

      const newCategories = {
        ...categoriesList,
        data: [...categoriesList.data, ...data.data],
        start: categoriesList.start + data.data.length,
        reachEnd: data.data.length < categoriesList.limit,
      };

      dispatch({ type: GetPlacesCategoriesActionTypes.GET_PLACES_CATEGORIES_SUCCESS, categories: newCategories });
    } catch (e: any) {
      dispatch({ type: GetPlacesCategoriesActionTypes.GET_PLACES_CATEGORIES_FAILURE });
    }
  };
};

import { Api } from '../../../services/API';
import { AppThunk } from '../../configureStore';
import { Endpoint } from '../../../services/Enpoints';
import { AddUserPlaceTypes } from '../actionTypes';
import { AddPlacePayload, UserPlace } from '../../types/Map.model';
import { API_URL } from '@env';
import { AxiosResponse } from 'axios';

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
        url: `${API_URL}${Endpoint.Places}`,
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

import { Api } from '../../../services/API';
import { AppThunk } from '../../configureStore';
import { Endpoint } from '../../../services/Enpoints';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '../../types/User.model';
import { LOGOUT_SUCCESS, LoginActionTypes, RegisterActionTypes, GetUserProfileActionTypes } from '../actionTypes';
import { Storage } from '../../../services/Storage';
import { AxiosResponse } from 'axios';

export const register = (userData: RegisterPayload): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: RegisterActionTypes.REGISTER });
    try {
      const { data }: AxiosResponse<AuthResponse> = await Api.post(Endpoint.Register, userData);
      Storage.set('token', data.jwt);
      dispatch({ type: RegisterActionTypes.REGISTER_SUCCESS, token: data.jwt, user: data.user });
    } catch (error: any) {
      dispatch({ type: RegisterActionTypes.REGISTER_FAILURE, error: [error.response?.data?.message || ''] });
    }
  };
};

export const login = (userData: LoginPayload): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: LoginActionTypes.LOGIN });
    try {
      const { data }: AxiosResponse<AuthResponse> = await Api.post(Endpoint.Login, userData);
      Storage.set('token', data.jwt);
      dispatch({ type: LoginActionTypes.LOGIN_SUCCESS, token: data.jwt, user: data.user });
    } catch (error: any) {
      dispatch({ type: LoginActionTypes.LOGIN_FAILURE, error: [error.response?.data?.message || ''] });
    }
  };
};

export const logout = (): AppThunk => {
  return async (dispatch) => {
    Storage.delete('token');
    dispatch({ type: LOGOUT_SUCCESS });
  };
};

export const getUserProfile = (): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: GetUserProfileActionTypes.GET_USER_PROFILE });
    try {
      const { data }: AxiosResponse<User> = await Api.get(Endpoint.Profile);
      dispatch({ type: GetUserProfileActionTypes.GET_USER_PROFILE_SUCCESS, user: data });
    } catch (e: any) {
      dispatch({ type: GetUserProfileActionTypes.GET_USER_PROFILE_FAILURE });
    }
  };
};

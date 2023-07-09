import { Action, ActionCreator } from '@reduxjs/toolkit';
import * as actionTypes from '../actionTypes';
import { Api } from '../../../services/API';
import { AppThunk } from '../../configureStore';
import { Endpoint } from '../../../services/Enpoints';
import { LoginPayload, RegisterPayload } from '../../types/User.model';
import { LOGOUT_SUCCESS, LoginActionTypes, RegisterActionTypes } from '../actionTypes';
import { Storage } from '../../../services/Storage';

export const addUserLocation: ActionCreator<Action> = (location: any) => {
  return {
    type: actionTypes.ADD_USER_LOCATION,
    payload: location,
  };
};

export const register = (userData: RegisterPayload): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: RegisterActionTypes.REGISTER });
    try {
      const { data } = await Api.post(Endpoint.Register, userData);
      Storage.set('token', data.jwt);
      dispatch({ type: RegisterActionTypes.REGISTER_SUCCESS, token: data.jwt, user: data.user });
    } catch (e: any) {
      console.log('error register:', e);
      dispatch({ type: RegisterActionTypes.REGISTER_FAILURE });
    }
  };
};

export const login = (userData: LoginPayload): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: LoginActionTypes.LOGIN });
    try {
      const { data } = await Api.post(Endpoint.Login, userData);
      Storage.set('token', data.jwt);
      dispatch({ type: LoginActionTypes.LOGIN_SUCCESS, token: data.jwt, user: data.user });
    } catch (e: any) {
      console.log('error login:', e);
      dispatch({ type: LoginActionTypes.LOGIN_FAILURE });
    }
  };
};

export const logout = (): AppThunk => {
  return async (dispatch) => {
    Storage.delete('token');
    dispatch({ type: LOGOUT_SUCCESS });
  };
};

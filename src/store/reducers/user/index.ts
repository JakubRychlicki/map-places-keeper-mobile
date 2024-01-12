import { AnyAction } from 'redux';
import * as actionTypes from '../../actions/actionTypes';
import { Storage } from '../../../services/Storage';
import { User } from '../../types/User.model';

export type UserState = {
  token?: string;
  user?: User;
  isLoginLoading?: boolean;
  isRegisterLoading?: boolean;
  isUserProfileLoading?: boolean;
  loginErrors?: string[];
  registerErrors?: string[];
};

const initialState: UserState = {
  token: Storage.getString('token') || undefined,
  isUserProfileLoading: true,
};

const userReducer = (state: UserState = initialState, action: AnyAction): UserState => {
  switch (action.type) {
    case actionTypes.RegisterActionTypes.REGISTER:
      return {
        ...state,
        isRegisterLoading: true,
      };
    case actionTypes.RegisterActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
        isRegisterLoading: false,
      };
    case actionTypes.RegisterActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isRegisterLoading: false,
        registerErrors: action.error,
      };
    case actionTypes.LoginActionTypes.LOGIN:
      return {
        ...state,
        isLoginLoading: true,
      };
    case actionTypes.LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoginLoading: false,
      };
    case actionTypes.LoginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isRegisterLoading: false,
        loginErrors: action.error,
      };
    case actionTypes.GetUserProfileActionTypes.GET_USER_PROFILE:
      return {
        ...state,
        isUserProfileLoading: true,
      };
    case actionTypes.GetUserProfileActionTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        isUserProfileLoading: false,
      };
    case actionTypes.GetUserProfileActionTypes.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        isUserProfileLoading: false,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...initialState,
        token: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;

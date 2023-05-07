import { Action, ActionCreator } from '@reduxjs/toolkit';
import * as actionTypes from '../actionTypes';

export const addUserLocation: ActionCreator<Action> = (location: any) => {
  return {
    type: actionTypes.ADD_USER_LOCATION,
    payload: location,
  };
};

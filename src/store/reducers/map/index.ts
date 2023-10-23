import * as actionTypes from '../../actions/actionTypes';
import { UserPlace } from '../../types/Map.model';

export type MapState = {
  userPlaces: UserPlace[];
  isAddPlaceLoading: boolean;
};

const initialState: MapState = {
  userPlaces: [],
  isAddPlaceLoading: false,
};

const mapReducer = (state: MapState = initialState, action: any): MapState => {
  switch (action.type) {
    case actionTypes.AddUserPlaceTypes.ADD_USER_PLACE:
      return {
        ...state,
        isAddPlaceLoading: true,
      };
    case actionTypes.AddUserPlaceTypes.ADD_USER_PLACE_SUCCESS:
      return {
        ...state,
        userPlaces: [...state.userPlaces, action.place],
        isAddPlaceLoading: false,
      };
    case actionTypes.AddUserPlaceTypes.ADD_USER_PLACE_FAILURE:
      return {
        ...state,
        isAddPlaceLoading: false,
      };
    default:
      return state;
  }
};

export default mapReducer;

import * as actionTypes from '../../actions/actionTypes';
import { UserPlace } from '../../types/Map.model';

export type MapState = {
  userPlaces: UserPlace[];
  isUserPlacesLoading: boolean;
};

const initialState: MapState = {
  userPlaces: [],
  isUserPlacesLoading: false,
};

const mapReducer = (state: MapState = initialState, action: any): MapState => {
  switch (action.type) {
    case actionTypes.AddUserPlaceTypes.ADD_USER_PLACE:
      return {
        ...state,
        isUserPlacesLoading: true,
      };
    case actionTypes.AddUserPlaceTypes.ADD_USER_PLACE_SUCCESS:
      return {
        ...state,
        userPlaces: [...state.userPlaces, action.place],
        isUserPlacesLoading: false,
      };
    case actionTypes.AddUserPlaceTypes.ADD_USER_PLACE_FAILURE:
      return {
        ...state,
        isUserPlacesLoading: false,
      };
    default:
      return state;
  }
};

export default mapReducer;

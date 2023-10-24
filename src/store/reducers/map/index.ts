import * as actionTypes from '../../actions/actionTypes';
import { UserPlace } from '../../types/Map.model';
import { List, emptyList } from '../../types/Utils.model';

export type MapState = {
  userPlaces: List<UserPlace>;
  isAddPlaceLoading: boolean;
  isUserPlacesLoading: boolean;
};

const initialState: MapState = {
  userPlaces: emptyList,
  isAddPlaceLoading: false,
  isUserPlacesLoading: false,
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
        userPlaces: {
          ...state.userPlaces,
          data: [...state.userPlaces.data, action.place],
        },
        isAddPlaceLoading: false,
      };
    case actionTypes.AddUserPlaceTypes.ADD_USER_PLACE_FAILURE:
      return {
        ...state,
        isAddPlaceLoading: false,
      };
    case actionTypes.GetUserPlacesActionTypes.GET_USER_PLACES:
      return {
        ...state,
        isUserPlacesLoading: true,
      };
    case actionTypes.GetUserPlacesActionTypes.GET_USER_PLACES_SUCCESS:
      return {
        ...state,
        userPlaces: action.places,
        isUserPlacesLoading: false,
      };
    case actionTypes.GetUserPlacesActionTypes.GET_USER_PLACES_FAILURE:
      return {
        ...state,
        isUserPlacesLoading: false,
      };
    default:
      return state;
  }
};

export default mapReducer;

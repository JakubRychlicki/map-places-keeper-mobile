import { AnyAction } from 'redux';
import * as actionTypes from '../../actions/actionTypes';
import { PlaceCategory } from '../../types/Categories';
import { UserPlace } from '../../types/Map.model';
import { List, emptyList } from '../../types/Utils.model';

export type MapState = {
  userPlaces: List<UserPlace>;
  categories: List<PlaceCategory>;
  isAddPlaceLoading: boolean;
  isUpdatePlaceLoading: boolean;
  isDeletePlaceLoading: boolean;
  isUserPlacesLoading: boolean;
  isCategoriesLoading: boolean;
};

const initialState: MapState = {
  userPlaces: emptyList,
  categories: emptyList,
  isAddPlaceLoading: false,
  isUpdatePlaceLoading: false,
  isDeletePlaceLoading: false,
  isUserPlacesLoading: false,
  isCategoriesLoading: false,
};

const mapReducer = (state: MapState = initialState, action: AnyAction): MapState => {
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
    case actionTypes.UpdateUserPlaceTypes.UPDATE_USER_PLACE:
      return {
        ...state,
        isUpdatePlaceLoading: true,
      };
    case actionTypes.UpdateUserPlaceTypes.UPDATE_USER_PLACE_SUCCESS:
      const updatedPlaceIndex = state.userPlaces.data.findIndex((place) => place.id === action.place.id);
      const updatedUserPlaces = [...state.userPlaces.data];
      updatedUserPlaces[updatedPlaceIndex] = action.place;

      return {
        ...state,
        userPlaces: {
          ...state.userPlaces,
          data: updatedUserPlaces,
        },
        isUpdatePlaceLoading: false,
      };
    case actionTypes.UpdateUserPlaceTypes.UPDATE_USER_PLACE_FAILURE:
      return {
        ...state,
        isUpdatePlaceLoading: false,
      };
    case actionTypes.DeleteUserPlaceTypes.DELETE_USER_PLACE:
      return {
        ...state,
        isDeletePlaceLoading: true,
      };
    case actionTypes.DeleteUserPlaceTypes.DELETE_USER_PLACE_SUCCESS:
      return {
        ...state,
        userPlaces: {
          ...state.userPlaces,
          data: state.userPlaces.data.filter((place) => place.id !== action.placeId),
        },
        isDeletePlaceLoading: false,
      };
    case actionTypes.DeleteUserPlaceTypes.DELETE_USER_PLACE_FAILURE:
      return {
        ...state,
        isDeletePlaceLoading: false,
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
    case actionTypes.GetPlacesCategoriesActionTypes.GET_PLACES_CATEGORIES:
      return {
        ...state,
        isCategoriesLoading: true,
      };
    case actionTypes.GetPlacesCategoriesActionTypes.GET_PLACES_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        isCategoriesLoading: false,
      };
    case actionTypes.GetPlacesCategoriesActionTypes.GET_PLACES_CATEGORIES_FAILURE:
      return {
        ...state,
        isCategoriesLoading: false,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default mapReducer;

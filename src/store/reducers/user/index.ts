import * as actionTypes from '../../actions/actionTypes';
import { Storage } from '../../../services/Storage';
import { User } from '../../types/User.model';

export type UserState = {
  token?: string;
  user?: User;
  isLoginLoading?: boolean;
  loginErrors?: string[];
  isRegisterLoading?: boolean;
  registerErrors?: string[];
  locations: any[];
};

const initialState: UserState = {
  token: Storage.getString('token') || undefined,
  locations: [
    {
      id: 1,
      name: 'Dom',
      desc: '',
      address: 'Juranda 3, 20-629 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.5192344, 51.2388811],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
    {
      id: 2,
      name: 'Wydział Nauk o Ziemi',
      desc: '',
      address: 'Aleja Kraśnicka 2cd, 20-718 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.52350390505016, 51.24780479076669],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
    {
      id: 3,
      name: 'Wydział Informatyczny UMCS',
      desc: '',
      address: 'ul. Marii Curie-Skłodowskiej 1, 20-031 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.542257978268985, 51.24591763492851],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
    {
      id: 4,
      name: 'Biuro - praca',
      desc: '',
      address: 'Hajdowska 43, 20-231 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.61877385446264, 51.2590755],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
    {
      id: 5,
      name: 'Park Saski',
      desc: '',
      address: 'Aleje Racławickie 14, 20-400 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.546653744605397, 51.24934885425214],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
    {
      id: 6,
      name: 'Najbliższy lidl',
      desc: '',
      address: 'Dziewanny 2, 20-539 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.512715299430596, 51.2359465],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
    {
      id: 7,
      name: 'Dworzec',
      desc: '',
      address: 'plac Dworcowy, 20-408 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.5684467, 51.2320205],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
    {
      id: 8,
      name: 'Zamek',
      desc: '',
      address: 'Zamkowa 9, 20-117 Lublin',
      feature: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [22.571716242883546, 51.2504613],
        },
        properties: null,
      },
      category: [],
      photos: null,
    },
  ],
};

const userReducer = (state: UserState = initialState, action: any): UserState => {
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
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        token: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;

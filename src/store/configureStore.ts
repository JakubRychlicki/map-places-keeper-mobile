import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import ReduxThunk, { ThunkAction } from 'redux-thunk';

// REDUCERS
import userReducer from './reducers/user';
import mapReducer from './reducers/map';

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
});

const middlewares = [ReduxThunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export default store;

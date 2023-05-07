import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';

// REDUCERS
import userReducer from './reducers/user';

const rootReducer = combineReducers({ user: userReducer });

const middlewares = [ReduxThunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

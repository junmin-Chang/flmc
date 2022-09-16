import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { musicApi } from '../services/music/musicService';
import userReducer from '../features/user/userSlice';
import musicReducer from '../features/music/musicSlice';
import modalReducer from '../features/modal/modalSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { userApi } from '../services/user/userService';

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  music: musicReducer,
  [userApi.reducerPath]: userApi.reducer,
  [musicApi.reducerPath]: musicApi.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }).concat(
      musicApi.middleware,
      userApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { musicApi } from '../features/music/musicSlice';
import authReducer from '../features/auth/authSlice';
import modalReducer from '../features/modal/modalSlice';
import musicReducer from '../features/music/musicSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer,
    modal: modalReducer,
    [musicApi.reducerPath]: musicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(musicApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

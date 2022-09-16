import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/user/userSlice';
import getAuthHeader from './getAuthHeader';

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};
export const axiosPublicInstance = axios.create({
  baseURL: 'https://3000-junminchang-flmc-gy2vi9wqqpk.ws-us65.gitpod.io/',
});
export const axiosPrivateInstance = axios.create({
  baseURL: 'https://3000-junminchang-flmc-gy2vi9wqqpk.ws-us65.gitpod.io/',
  headers: {
    authorization: getAuthHeader(),
  },
});
axiosPrivateInstance.interceptors.request.use(
  async (config) => {
    const user = store.getState().user;
    if (user?.accessToken) {
      const decodedToken: { exp: number } = jwtDecode(user.accessToken);
      if (config.headers) {
        config.headers.authorization = `Bearer ${
          store.getState().user.accessToken
        }`;
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          await store.dispatch(refreshToken());
          config.headers.authorization = `Bearer ${
            store.getState().user.accessToken
          }`;
        }
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import userService from '../../services/user/userService';
import { RootState } from '../../store/store';
import { LoginDto, RegisterDto, User, UserInfo } from '../../typings/auth';
import { axiosInstance } from '../../utils/axios';

export const register = createAsyncThunk(
  'user/register',
  async ({ username, userId, password }: RegisterDto, thunkApi) => {
    try {
      const { data } = await userService.register({
        username,
        userId,
        password,
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async ({ userId, password }: LoginDto, thunkApi) => {
    try {
      const { data } = await userService.login({ userId, password });
      if (data.accessToken) {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );
      }
      return {
        user: data.userInfo,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const logout = createAsyncThunk('user/logout', () => {
  userService.logout();
});

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, thunkApi) => {
    const { user } = thunkApi.getState() as RootState;
    if (user.refreshToken) {
      const { data } = await userService.refresh(user.refreshToken);
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userInfo: data.userInfo,
      };
    }
  },
);

export const addPlaylist = createAsyncThunk(
  'music/playlist',
  async (playlist: string, thunkApi) => {
    try {
      const response = await userService.addPlaylist(playlist);
      if (response) {
        return response;
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState: User = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload?.userInfo;
      state.accessToken = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    });
    builder.addCase(addPlaylist.fulfilled, (state, action) => {
      state.userInfo!.playlist = [...state.userInfo!.playlist, action.payload];
    });
  },
});

export const userApi = createApi({
  reducerPath: 'userApi/search',
  baseQuery: axiosInstance,
  endpoints: (builder) => ({
    getUserInfoById: builder.query<UserInfo, string>({
      query: (userId: string) => `/user/${userId}`,
    }),
  }),
});

export const { useGetUserInfoByIdQuery } = userApi;
const { reducer } = userSlice;
export default reducer;

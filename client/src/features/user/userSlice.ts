import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/user/userService';
import { RootState } from '../../store/store';
import { LoginDto, RegisterDto, User } from '../../typings/auth';

export const register = createAsyncThunk(
  'auth/register',
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
  'auth/login',
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

export const logout = createAsyncThunk('auth/logout', () => {
  userService.logout();
});

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
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

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (userId: string, thunkApi) => {
    try {
      const { data } = await userService.getUserProfile(userId);
      console.log(data);
      return {
        user: data,
      };
    } catch (error: any) {
      thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

const userData = localStorage.getItem('auth');
const userToken = userData && JSON.parse(userData);
const initialState: User = userToken
  ? {
      isLoggedIn: true,
      accessToken: userToken.accessToken,
      refreshToken: userToken.refreshToken,
      userInfo: null,
    }
  : {
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      userInfo: null,
    };

const authSlice = createSlice({
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
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      if (action.payload?.user !== '') {
        state.userInfo = action.payload?.user;
      } else {
        history.back()
      }
    });
  },
});

const { reducer } = authSlice;
export default reducer;

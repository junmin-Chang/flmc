import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth/authService';
import { RootState } from '../../store/store';
import { LoginDto, RegisterDto } from '../../typings/auth';
const userData = localStorage.getItem('user');
const user = userData && JSON.parse(userData);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, userId, password }: RegisterDto, thunkApi) => {
    try {
      const response = await authService.register({
        username,
        userId,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ userId, password }: LoginDto, thunkApi) => {
    try {
      const response = await authService.login({ userId, password });
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return { user: response.data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', () => {
  authService.logout();
});

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    return await authService.refresh(state.auth.user?.refreshToken);
  },
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

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
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    });
  },
});

const { reducer } = authSlice;
export default reducer;

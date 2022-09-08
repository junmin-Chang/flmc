import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth/authService';
import { RegisterDto } from '../../typings/auth';
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
    })
    builder.addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
    })
  }
});

const { reducer } = authSlice;
export default reducer;

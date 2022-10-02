import { createAsyncThunk, createSlice, original } from '@reduxjs/toolkit';
import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle';
import userService from '../../services/user/userService';
import { RootState } from '../../store/store';
import { LoginDto, Playlist, RegisterDto, User } from '../../typings/auth';

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
  'music/playlist/add',
  async ({ name, desc }: { name: string; desc: string }, thunkApi) => {
    try {
      const response = await userService.addPlaylist({
        name,
        desc,
      });
      if (response) {
        return response;
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  'music/playlist/delete',
  async ({ playlistToUpdate }: { playlistToUpdate: Playlist }, thunkApi) => {
    try {
      const response = await userService.deletePlaylist(playlistToUpdate.id);
      if (response) {
        return playlistToUpdate.id;
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const updatePlaylist = createAsyncThunk(
  'music/playlist/update',
  async (
    {
      playlistToUpdate,
      name,
      desc,
    }: { playlistToUpdate: Playlist; name: string; desc: string },
    thunkApi,
  ) => {
    try {
      const response = await userService.updatePlaylist({
        playlistId: playlistToUpdate.id,
        name,
        desc,
      });
      return response;
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
      state.accessToken = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;
      state.userInfo = action.payload?.userInfo;
    });

    builder.addCase(addPlaylist.fulfilled, (state, action) => {
      state.userInfo!.playlist = [...state.userInfo!.playlist, action.payload];
    });
    builder.addCase(deletePlaylist.pending, (state, action) => {
      state.userInfo.playlist = state.userInfo.playlist.filter(
        (p) => p.id !== action.meta.arg.playlistToUpdate.id,
      );
    });
    builder.addCase(deletePlaylist.rejected, (state, action) => {
      state.userInfo.playlist.push(action.meta.arg.playlistToUpdate);
    });
    builder.addCase(updatePlaylist.pending, (state, action) => {
      const newPlaylist = state.userInfo.playlist.map((p) => {
        if (p.id === action.meta.arg.playlistToUpdate.id) {
          return {
            ...p,
            name: action.meta.arg.name,
            desc: action.meta.arg.desc,
          };
        } else {
          return p;
        }
      });
      state.userInfo.playlist = newPlaylist;
    });
    builder.addCase(updatePlaylist.rejected, (state, action) => {
      const newPlaylist = state.userInfo.playlist.map((p) => {
        if (p.id === action.meta.arg.playlistToUpdate.id) {
          return {
            ...action.meta.arg.playlistToUpdate,
          };
        } else {
          return p;
        }
      });
      state.userInfo.playlist = newPlaylist;
    });
  },
});

const { reducer } = userSlice;
export default reducer;

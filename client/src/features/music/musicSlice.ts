import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import musicService from '../../services/music/musicService';
import { MusicResponseDto } from '../../typings/music';
import { axiosInstance } from '../../utils/axios';

const playlistItem = localStorage.getItem('user');
const playlist = playlistItem && JSON.parse(playlistItem).user.playlist;
export const addPlaylist = createAsyncThunk(
  'music/playlist',
  async (playlist: string, thunkApi) => {
    try {
      const response = await musicService.addPlaylist(playlist);
      if (response) {
        return response;
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);
const musicSlice = createSlice({
  name: 'music',
  initialState: {
    playlist,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPlaylist.fulfilled, (state, action) => {
      state.playlist = [...state.playlist, action.payload];
    });
    builder.addCase(addPlaylist.rejected, (state, action) => {
      return state.playlist;
    });
  },
});
export const musicApi = createApi({
  reducerPath: 'musicApi/search',
  baseQuery: axiosInstance,
  endpoints: (builder) => ({
    getMusicByKeyword: builder.query<MusicResponseDto[], string>({
      query: (keyword: string) =>
        `/music/${encodeURI(encodeURIComponent(keyword))}`,
    }),
  }),
});

const { reducer } = musicSlice;
export const { useGetMusicByKeywordQuery } = musicApi;
export default reducer;

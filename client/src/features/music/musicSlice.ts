import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import musicService from '../../services/music/musicService';
import { AddMusicDto, MusicResponseDto, ProfileMusicResponseDto } from '../../typings/music';
import { axiosInstance } from '../../utils/axios';

export const musicApi = createApi({
  reducerPath: 'musicApi/search',
  baseQuery: axiosInstance,
  endpoints: (builder) => ({
    getMusicByKeyword: builder.query<MusicResponseDto[], string>({
      query: (keyword: string) =>
        `/music/${encodeURI(encodeURIComponent(keyword))}`,
    }),
    getMusicByPlaylist: builder.query<
      ProfileMusicResponseDto[] | null,
      { userId: string | undefined; playlist: string | undefined }
    >({
      query: ({ userId, playlist }: { userId: string; playlist: string }) =>
        `/music/${userId}/${encodeURI(encodeURIComponent(playlist))}`,
    }),
  }),
});

export const addMusic = createAsyncThunk(
  'music/add',
  async ({ title, image, songId, singer, playlist }: AddMusicDto) => {
    const response = await musicService.addMusic({
      title,
      image,
      songId,
      singer,
      playlist,
    });
    return { song: response };
  },
);
const initialState: { songs: any[]; selectedSong: AddMusicDto } = {
  selectedSong: {
    songId: '',
    title: '',
    singer: '',
    image: '',
  },
  songs: [],
};
export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    selectMusic: (state, action) => {
      state.selectedSong = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMusic.fulfilled, (state, action) => {
      state.songs = [...state.songs, action.payload.song];
    });
  },
});

const { reducer } = musicSlice;
export const { useGetMusicByKeywordQuery, useGetMusicByPlaylistQuery } =
  musicApi;
export const { selectMusic } = musicSlice.actions;
export default reducer;

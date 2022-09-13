import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import musicService from '../../services/music/musicService';
import { AddMusicDto, MusicResponseDto } from '../../typings/music';
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
      MusicResponseDto[] | null,
      { userId: string | undefined; playlist: string | undefined }
    >({
      query: ({ userId, playlist }: { userId: string; playlist: string }) =>
        `/music/${userId}/${encodeURI(encodeURIComponent(playlist))}`,
    }),
  }),
});

export const addMusic = createAsyncThunk(
  'music/add',
  async ({
    title,
    image,
    songId,
    singer,
    playlist,
  }: AddMusicDto) => {
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
const initialState: { songs: any[] } = {
  songs: [],
};
export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMusic.fulfilled, (state, action) => {
      state.songs = [...state.songs, action.payload.song];
    });
  },
});

export const { useGetMusicByKeywordQuery, useGetMusicByPlaylistQuery } =
  musicApi;

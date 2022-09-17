import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import musicService from '../../services/music/musicService';
import {
  AddMusicDto,
  MusicSearchResponseDto,
  ProfileMusicResponseDto,
} from '../../typings/music';

export const addMusic = createAsyncThunk(
  'music/add',
  async ({ title, image, songId, singer, playlistName }: AddMusicDto) => {
    const response = await musicService.addMusic({
      title,
      image,
      songId,
      singer,
      playlistName,
    });
    return { song: response };
  },
);
const initialState: { selectedSong: AddMusicDto } = {
  selectedSong: {
    songId: '',
    title: '',
    singer: '',
    image: '',
  },
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
    builder.addCase(addMusic.fulfilled, (state, action) => {});
  },
});

const { reducer } = musicSlice;
export const { selectMusic } = musicSlice.actions;
export default reducer;

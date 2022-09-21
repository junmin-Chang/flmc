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
  async ({ title, image, songId, singer, playlistId }: AddMusicDto) => {
    const response = await musicService.addMusic({
      title,
      image,
      songId,
      singer,
      playlistId,
    });
    return { song: response };
  },
);

export const deleteMusic = createAsyncThunk(
  'music/delete',
  async (ids: string[]) => {
    const response = await musicService.deleteMusic(ids);
    return response;
  },
);
const initialState: {
  selectedSong: AddMusicDto;
  songsToDelete: string[];
} = {
  selectedSong: {
    songId: '',
    title: '',
    singer: '',
    image: '',
  },
  songsToDelete: [],
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

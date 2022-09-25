import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    mode: '',
    isOpen: false,
    stateToUpdate: null,
  },
  reducers: {
    showAddPlaylist: (state) => {
      state.isOpen = true;
      state.mode = 'playlist';
    },
    hideAddPlaylist: (state) => {
      state.isOpen = false;
      state.mode = 'playlist';
      state.stateToUpdate = null;
    },
    showAddMusic: (state) => {
      state.isOpen = true;
      state.mode = 'music';
    },
    hideAddMusic: (state) => {
      state.isOpen = false;
      state.mode = 'music';
    },
    showUpdatePlaylist: (state, action) => {
      state.isOpen = true;
      state.mode = 'playlist';
      state.stateToUpdate = action.payload;
    },
  },
});

const { reducer } = modalSlice;
export default reducer;
export const {
  showAddMusic,
  showAddPlaylist,
  hideAddMusic,
  hideAddPlaylist,
  showUpdatePlaylist,
} = modalSlice.actions;

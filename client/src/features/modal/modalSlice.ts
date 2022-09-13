import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    mode: '',
    isOpen: false,
  },
  reducers: {
    showAddPlaylist: (state) => {
      state.isOpen = true;
      state.mode = 'playlist';
    },
    hideAddPlaylist: (state) => {
      state.isOpen = false;
      state.mode = 'playlist';
    },
    showAddMusic: (state) => {
      state.isOpen = true;
      state.mode = 'music';
    },
    hideAddMusic: (state) => {
      state.isOpen = false;
      state.mode = 'music';
    },
  },
});

const { reducer } = modalSlice;
export default reducer;
export const { showAddMusic, showAddPlaylist, hideAddMusic, hideAddPlaylist } =
  modalSlice.actions;

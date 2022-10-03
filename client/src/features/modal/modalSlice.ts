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

    showAddMusic: (state) => {
      state.isOpen = true;
      state.mode = 'music';
    },

    showUpdatePlaylist: (state, action) => {
      state.isOpen = true;
      state.mode = 'playlist';
      state.stateToUpdate = action.payload;
    },
    showClipboardModal: (state) => {
      state.isOpen = true;
      state.mode = 'clipboard';
    },
    hideModal: (state) => {
      state.isOpen = false;
      state.stateToUpdate = null;
    },
  },
});

const { reducer } = modalSlice;
export default reducer;
export const {
  showAddMusic,
  showAddPlaylist,
  showClipboardModal,
  showUpdatePlaylist,
  hideModal,
} = modalSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPopup: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    togglePopup(state) {
      state.showPopup = !state.showPopup;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice;

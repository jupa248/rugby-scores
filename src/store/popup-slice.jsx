import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPopup: false,
  showPrediction: false,
  selectedMatch: [],
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    togglePopup(state) {
      state.showPopup = !state.showPopup;
    },
    togglePrediction(state, action) {
      const match = action.payload;
      state.showPrediction === false
        ? state.selectedMatch.push(match)
        : (state.selectedMatch = []);

      state.showPrediction = !state.showPrediction;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice;

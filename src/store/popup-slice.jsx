import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPopup: false,
  showPrediction: false,
  selectedMatch: [],
  section: 'Fixture',
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
    changeSection(state, action) {
      const section = action.payload;
      state.section = section;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice;

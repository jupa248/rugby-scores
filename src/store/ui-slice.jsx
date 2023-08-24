import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPopup: false,
  showPrediction: false,
  selectedMatch: [],
  loading: false,
  error: [],
  section: 'Fixture',
};

const uiSlice = createSlice({
  name: 'ui',
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
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scores: {},
};

const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    getScores(state, action) {
      state.scores = action.payload;
    },
    addScore(state, action) {
      const { newScoreId, newScoreData } = action.payload;
      state.scores = { ...state.scores, [newScoreId]: newScoreData };
    },
  },
});

export const scoresActions = scoresSlice.actions;
export default scoresSlice;

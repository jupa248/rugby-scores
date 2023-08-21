import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scores: {},
  points: [],
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
    addPoints(state, action) {
      state.points = action.payload;
    },
  },
});

export const scoresActions = scoresSlice.actions;
export default scoresSlice;

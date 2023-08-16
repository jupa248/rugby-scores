import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scores: [],
};

const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    getScores(state, action) {
      state.scores = action.payload;
    },
    addScore(state, action) {
      const newScore = action.payload;
      console.log(newScore.winner);
      state.scores.push(newScore);
    },
  },
});

export const scoresActions = scoresSlice.actions;
export default scoresSlice;

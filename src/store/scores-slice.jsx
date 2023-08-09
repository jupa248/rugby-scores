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
      console.log('hi addScore!');
      state.scores.push(newScore);
      console.log('hi final addScore!');
    },
  },
});

export const scoresActions = scoresSlice.actions;
export default scoresSlice;

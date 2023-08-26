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
    editScore(state, action) {
      const { key, data } = action.payload;
      state.scores[key] = data;
    },
    removeScore(state, action) {
      const key = action.payload;
      delete state.scores[key];
      // console.log('key:', key);
      // const scores = Object.entries(state.scores);
      // const remainingScores = scores.filter((score) => score[0] !== key);
      // state.scores = remainingScores;
      // console.log('remainingScores:', remainingScores);
      // console.log('state.scores:', state.scores);
    },
    addPoints(state, action) {
      state.points = action.payload;
    },
  },
});

export const scoresActions = scoresSlice.actions;
export default scoresSlice;

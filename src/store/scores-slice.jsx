import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scores: {},
  points: [],
  finals: [],
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
    },
    addFinals(state, action) {
      const { userId, finals } = action.payload;
      state.finals = { ...state.finals, [userId]: { finals } };
    },
    getFinals(state, action) {
      state.finals = action.payload;
    },
    addPoints(state, action) {
      state.points = action.payload;
    },
  },
});

export const scoresActions = scoresSlice.actions;
export default scoresSlice;

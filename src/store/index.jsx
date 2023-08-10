import { configureStore } from '@reduxjs/toolkit';
import scoresSlice from './scores-slice';
import fixtureSlice from './fixture-slice';

const store = configureStore({
  reducer: {
    scores: scoresSlice.reducer,
    fixture: fixtureSlice.reducer,
  },
});

export default store;

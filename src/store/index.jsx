import { configureStore } from '@reduxjs/toolkit';
import scoresSlice from './scores-slice';
import fixtureSlice from './fixture-slice';
import userSlice from './user-slice';
import popupSlice from './popup-slice';

const store = configureStore({
  reducer: {
    scores: scoresSlice.reducer,
    fixture: fixtureSlice.reducer,
    user: userSlice.reducer,
    popup: popupSlice.reducer,
  },
});

export default store;

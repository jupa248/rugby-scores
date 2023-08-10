import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fixture: [],
};

const fixtureSlice = createSlice({
  name: 'fixture',
  initialState,
  reducers: {
    getFixture(state, action) {
      state.fixture = action.payload;
    },
  },
});

export const fixtureActions = fixtureSlice.actions;
export default fixtureSlice;

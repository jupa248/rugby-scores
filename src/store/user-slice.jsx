import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
    addUser(state, action) {
      const newUser = action.payload.scores;
      state.user.push(newUser);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;

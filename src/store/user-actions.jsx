import axios from 'axios';
import { userActions } from './user-slice';
import { uiActions } from './ui-slice';
import { USER_URL } from '../Models/config';

export const getUserData = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.get(USER_URL);

      if (response.status !== 200) {
        console.error('Failed to fetch user:', response.statusText);
        throw new Error('Could not get user data!');
      }
      await dispatch(userActions.getUser(response.data ?? 'NO USERS'));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.error('Error fetching scores:', error);
      dispatch(uiActions.setError(error));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

export const addNewUser = (newUserData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(USER_URL, newUserData);

      if (response.statusText !== 'OK') {
        throw new Error('Sending user data failed.');
      }
      await dispatch(userActions.getUser(response.data));
    } catch (error) {
      console.error('Error adding new user', error);
    }
  };
};

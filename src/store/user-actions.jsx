import axios from 'axios';
import { userActions } from './user-slice';
import { USER_URL } from '../Models/config';

export const getUserData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(USER_URL);

      if (response.status !== 200) {
        console.error('Failed to fetch user:', response.statusText);
        throw new Error('Could not get user data!');
      }
      await dispatch(userActions.getUser(response.data ?? 'NO USERS'));
    } catch (error) {
      console.error('Error fetching scores:', error);
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
      // await dispatch(userActions.addUser(response.data));
      await dispatch(userActions.getUser(response.data));
    } catch (error) {
      console.error('Error adding new user', error);
    }
  };
};

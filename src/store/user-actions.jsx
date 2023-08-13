import axios from 'axios';
import { userActions } from './user-slice';
import { USER_URL } from '../Models/config';

export const getUserData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(USER_URL);

      if (response.status !== 200) {
        console.error('Failed to fetch user:', response.statusText);
        throw new Error('Could not get scores data!');
      }
      console.log('getUser:', response.data);
      dispatch(userActions.getUser(response.data));
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };
};

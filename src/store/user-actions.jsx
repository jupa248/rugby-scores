import axios from 'axios';
import { loginUser } from './user-slice';
import { REGISTER_URL } from '../Models/config';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(REGISTER_URL, userData);
    // Handle registration success (e.g., show success message)
    console.log('response:', response);
  } catch (error) {
    // Handle registration error (e.g., show error message)
    console.log(error);
  }
};

export const loginUserAction = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(REGISTER_URL, credentials);

    // Assuming response.data contains the user data or token
    dispatch(loginUser(response.data));
  } catch (error) {
    // Handle login error (e.g., show error message)
    console.log(error);
  }
};

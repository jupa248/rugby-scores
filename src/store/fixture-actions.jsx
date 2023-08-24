import { fixtureActions } from './fixture-slice';
import { FIXTURES_URL } from '../Models/config';
import { uiActions } from './ui-slice';
import axios from 'axios';

export const getFixtureData = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true))
      const response = await axios.get(FIXTURES_URL);

      if (response.statusText !== 'OK') {
        console.error('Failed to fetch fixture:', response.statusText);
        throw new Error('Could not get fixture data!');
      }

      dispatch(fixtureActions.getFixture(response.data));
      dispatch(uiActions.setLoading(false))
    } catch (error) {
      // console.log('Error fetching fixture:', error.message);
      dispatch(uiActions.setError(error.message))
      return error
    }
  };
};

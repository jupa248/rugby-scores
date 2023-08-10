import { fixtureActions } from './fixture-slice';
import { FIXTURES_URL } from '../Models/config';
import axios from 'axios';

export const getFixtureData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(FIXTURES_URL);

      if (response.statusText !== 'OK') {
        console.error('Failed to fetch fixture:', response.statusText);
        throw new Error('Could not get fixture data!');
      }

      console.log('Fetched fixture data:', response.data);
      dispatch(fixtureActions.getFixture(response.data)); // Dispatch the action with fetched data
    } catch (error) {
      console.error('Error fetching fixture:', error);
    }
  };
};

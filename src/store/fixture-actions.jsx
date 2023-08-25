import { fixtureActions } from './fixture-slice';
import { FIXTURES_URL } from '../Models/config';
import { getFixture } from '../Models/fixtureApi';
import { uiActions } from './ui-slice';
import axios from 'axios';

export const getFixtureData = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.get(FIXTURES_URL);
      // const response = await axios.request(getFixture);

      if (response.status !== 200) {
        console.error('Failed to fetch fixture:', response.statusText);
        throw new Error('Could not get fixture data!');
      }

      dispatch(fixtureActions.getFixture(response.data));
      // dispatch(fixtureActions.getFixture(response.data.results));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.log('Error fetching fixture:', error);
      dispatch(uiActions.setError(error.message));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

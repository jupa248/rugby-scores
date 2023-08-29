import { fixtureActions } from './fixture-slice';
import { getFixture } from '../Models/fixtureApi';
import { uiActions } from './ui-slice';
import axios from 'axios';

export const getFixtureData = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.request(getFixture);

      if (response.status !== 200) {
        console.error('Failed to fetch fixture:', response.statusText);
        throw new Error('Could not get fixture data!');
      }
      dispatch(fixtureActions.getFixture(response.data.results));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.log('Error fetching fixture:', error);
      dispatch(uiActions.setError(error.message));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

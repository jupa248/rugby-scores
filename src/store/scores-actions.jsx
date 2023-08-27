import { scoresActions } from './scores-slice';
import { uiActions } from './ui-slice';
import { SCORES_URL, DB_URL } from '../Models/config';
import axios from 'axios';

export const getScoresData = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.get(SCORES_URL);

      if (response.status !== 200) {
        console.error('Failed to fetch scores:', response.statusText);
        throw new Error('Could not get scores data!');
      }

      dispatch(scoresActions.getScores(response.data ?? 0));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.error('Error fetching scores:', error);
      dispatch(uiActions.setError(error));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

export const addNewScore = (newScoreData) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.post(SCORES_URL, newScoreData);
      if (response.statusText !== 'OK') {
        throw new Error('Sending score data failed.');
      }
      const newScoreId = response.data.name;

      dispatch(scoresActions.addScore({ newScoreId, newScoreData }));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.error('Error adding new score', error);
      dispatch(uiActions.setError(error));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

export const editScore = (key, data) => {
  const url = `${DB_URL}scores/${key}.json`;
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.put(url, data);
      if (response.statusText !== 'OK') {
        throw new Error('Editing score data failed.');
      }

      dispatch(scoresActions.editScore({ key, data }));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.error('Error editing new score', error);
      dispatch(uiActions.setError(error));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

export const deleteScore = (key) => {
  const url = `${DB_URL}scores/${key}.json`;

  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      dispatch(scoresActions.removeScore(key));
      const response = await axios.delete(url);
      if (response.statusText !== 'OK') {
        throw new Error('Deleting score data failed.');
      }
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.error('Error deleting score', error);
      dispatch(uiActions.setError(error));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

export const addFinals = (finalsData) => {
  const { userId, finals } = finalsData;
  const url = `${DB_URL}finals/${userId}.json`;
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.post(url, finals);
      if (response.statusText !== 'OK') {
        throw new Error('Sending score data failed.');
      }

      dispatch(scoresActions.addFinals(finalsData));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.error('Error adding new score', error);
      dispatch(uiActions.setError(error));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

export const getFinalsData = (userId) => {
  const url = `${DB_URL}finals/${userId}.json`;
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoading(true));
      const response = await axios.get(url);
      // console.log('response-getFinal:', response);

      if (response.status !== 200) {
        console.error('Failed to fetch finals:', response.statusText);
        throw new Error('Could not get scores data!');
      }
      dispatch(scoresActions.getFinals(response.data ?? 0));
      dispatch(uiActions.setLoading(false));
    } catch (error) {
      console.error('Error fetching scores:', error);
      dispatch(uiActions.setError(error));
      dispatch(uiActions.setLoading(false));
      return error;
    }
  };
};

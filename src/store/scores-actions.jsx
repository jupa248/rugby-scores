import { scoresActions } from './scores-slice';
import { SCORES_URL, USER_URL } from '../Models/config';
import axios from 'axios';

export const getScoresData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(SCORES_URL);

      if (response.status !== 200) {
        console.error('Failed to fetch scores:', response.statusText);
        throw new Error('Could not get scores data!');
      }

      dispatch(scoresActions.getScores(response.data)); // Dispatch the action with fetched data
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };
};

export const addNewScore = (newScoreData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(SCORES_URL, newScoreData);
      if (response.statusText !== 'OK') {
        throw new Error('Sending cart data failed.');
      }
      const newScoreId = response.data.name;
      // console.log(newScoreData);

      dispatch(scoresActions.addScore({ newScoreId, newScoreData }));
    } catch (error) {
      console.error('Error adding new score', error);
    }
  };
};

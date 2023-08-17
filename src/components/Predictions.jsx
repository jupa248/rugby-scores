import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewScore } from '../store/scores-actions';
import { scoresActions } from '../store/scores-slice';
import Modal from './UI/Modal';
import { popupActions } from '../store/popup-slice';
import PredictionPopup from './PredictionPopup';

const Predictions = ({ props }) => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores);
  // const scoresArray = Object.values(scores.scores);
  // console.log('scoresArray', scoresArray);

  const handlePredictionPopup = (props) => {
    dispatch(popupActions.togglePrediction(props));
  };

  return (
    <div>
      <h2>Add New Score</h2>
      <button onClick={() => handlePredictionPopup(props)}>
        Predict score
      </button>
    </div>
  );
};
export default Predictions;

{
  /* <input
        type="text"
        placeholder="Winner"
        value={newScore.winner}
        onChange={(e) => setNewScore({ ...newScore, winner: e.target.value })}
      />
      <input
        type="number"
        placeholder="Home Score"
        value={newScore.homeScore}
        onChange={(e) =>
          setNewScore({ ...newScore, homeScore: parseInt(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Away Score"
        value={newScore.awayScore}
        onChange={(e) =>
          setNewScore({ ...newScore, awayScore: parseInt(e.target.value) })
        }
      />
      <button onClick={handleScoreSubmit}>Add Score</button> */
}

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewScore } from '../store/scores-actions';
import { scoresActions } from '../store/scores-slice';

const Predictions = () => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores.scores);

  const [newScore, setNewScore] = useState({
    id: 0,
    winner: '',
    homeScore: 0,
    awayScore: 0,
  });

  const handleScoreSubmit = async () => {
    // await dispatch(scoresActions.addScore(newScore));
    await dispatch(addNewScore(newScore));
    setNewScore(newScore);
    console.log('newScore', newScore);
  };

  return (
    <div>
      <h2>Add New Score</h2>
      <input
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
      <button onClick={handleScoreSubmit}>Add Score</button>
    </div>
  );
};
export default Predictions;

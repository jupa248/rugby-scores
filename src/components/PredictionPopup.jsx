import { useState, useEffect } from 'react';
import './PredictionPopup.css';
import Modal from './UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import { addNewScore, editScore } from '../store/scores-actions';

const PredictionPopup = (match) => {
  console.log(match);
  const dispatch = useDispatch();
  const { away, home, id, status } = match?.match[0]?.match;
  const hasPrediction = match?.match[0]?.hasPrediction;
  const key = match?.match[0]?.matchKey;
  const { userId, username } = match?.match[0]?.userData;
  const [result, setResult] = useState('winner');
  // console.log(key);
  const [newScore, setNewScore] = useState({
    user: userId,
    scoreId: id,
    home: home,
    away: away,
    winner: '',
    homeScore: '' || 0,
    awayScore: '' || 0,
  });

  useEffect(() => {
    handleResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newScore.homeScore, newScore.awayScore, result]);

  const handlePredictionPopup = () => {
    dispatch(uiActions.togglePrediction());
  };

  const handleResult = async (e) => {
    if (newScore.homeScore > newScore.awayScore) {
      setResult(home);
    } else if (newScore.homeScore < newScore.awayScore) {
      setResult(away);
    }
    if (newScore.homeScore === newScore.awayScore) {
      setResult('Draw');
    }
  };

  const handleHomeChange = (value) => {
    setNewScore({ ...newScore, homeScore: parseInt(value) });
  };
  const handleAwayChange = (value) => {
    setNewScore({ ...newScore, awayScore: parseInt(value) });
  };
  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewScore({ ...newScore, winner: result }));
    dispatch(uiActions.togglePrediction(false));
  };
  const handleScoreEdit = async (e) => {
    const data = { ...newScore, winner: result };
    e.preventDefault();
    dispatch(editScore(key, data));
    dispatch(uiActions.togglePrediction(false));
  };

  const onClose = () => {
    dispatch(uiActions.togglePrediction(false));
  };

  return (
    <Modal onClose={handlePredictionPopup}>
      <form onSubmit={handleScoreSubmit} className="form-container">
        <div>
          <div className="team">
            <span
              className={`small-flag ${home.toLowerCase().replace(' ', '-')}`}
            ></span>
            <label>{home}</label>
          </div>
          <input
            type="number"
            placeholder="Score"
            value={newScore.homeScore}
            onChange={(e) => handleHomeChange(e.target.value)}
          />
        </div>
        <div>
          <div className="team">
            <span
              className={`small-flag ${away.toLowerCase().replace(' ', '-')}`}
            ></span>
            <label>{away}</label>
          </div>
          <input
            type="number"
            placeholder="Score"
            value={newScore.awayScore}
            onChange={(e) => handleAwayChange(e.target.value)}
          />
        </div>
        <div>
          <label>Result: </label>
          <input
            type="text"
            placeholder={result}
            value={result === 'Draw' ? result : `${result} wins!`}
            readOnly
          />
        </div>
      </form>
      <div className="btn-container">
        <button className="score-btn bg-red" onClick={onClose}>
          Cancel
        </button>
        {hasPrediction ? (
          <button onClick={handleScoreEdit}>Edit</button>
        ) : (
          <button className="score-btn bg-blue" onClick={handleScoreSubmit}>
            Add Score
          </button>
        )}
      </div>
    </Modal>
  );
};
export default PredictionPopup;

import { useState } from 'react';
import './PredictionPopup.css';
import Modal from './UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../store/popup-slice';

const PredictionPopup = (match) => {
  const dispatch = useDispatch();
  const { away, home, id, status } = match.match[0];
  const { userId, username } = match.match[0].userData;
  const [newScore, setNewScore] = useState({
    user: userId,
    scoreId: id,
    winner: '',
    homeScore: '' || 0,
    awayScore: '' || 0,
  });

  const handlePredictionPopup = () => {
    dispatch(popupActions.togglePrediction());
  };

  const handleResult = (e) => {
    if (newScore.homeScore > newScore.awayScore) {
      setNewScore({ ...newScore, winner: home });
      console.log('home');
    }
    if (newScore.homeScore < newScore.awayScore) {
      setNewScore({ ...newScore, winner: away });
      console.log('away');
    }
    if ((newScore.homeScore = newScore.awayScore)) {
      setNewScore({ ...newScore, winner: 'none' });
      console.log('NONE');
    }
  };
  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    setNewScore(newScore);
    // await dispatch(addNewScore(newScore));
    console.log('newScore', newScore);
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
            onChange={(e) => {
              handleResult();
              setNewScore({
                ...newScore,
                homeScore: parseInt(e.target.value),
              });
            }}
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
            onChange={(e) => {
              handleResult();
              setNewScore({ ...newScore, awayScore: parseInt(e.target.value) });
            }}
          />
        </div>
        <div>
          <label>Result: </label>
          <input
            type="text"
            placeholder={newScore.winner}
            value={newScore.winner}
            onChange={(e) =>
              setNewScore({ ...newScore, winner: e.target.value })
            }
          />
        </div>
      </form>
      <button className="add-btn" onClick={handleScoreSubmit}>
        Add Score
      </button>
    </Modal>
  );
};
export default PredictionPopup;

import { useState, useEffect } from 'react';
import './PredictionPopup.css';
import Modal from './UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../store/popup-slice';
import { addNewScore } from '../store/scores-actions';

const PredictionPopup = (match) => {
  const dispatch = useDispatch();
  const { away, home, id, status } = match.match[0];
  const { userId, username } = match.match[0].userData;
  const [result, setResult] = useState('winner')
  const [newScore, setNewScore] = useState({
    user: userId,
    scoreId: id,
    winner: '',
    homeScore: '' || 0,
    awayScore: '' || 0,
  });

  useEffect(() => {
    handleResult();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newScore.homeScore, newScore.awayScore, result]);

  const handlePredictionPopup = () => {
    dispatch(popupActions.togglePrediction());
  };

  const handleResult = async (e) => {
    if (newScore.homeScore > newScore.awayScore) {
      setResult(home)
      console.log('res>',result);

    }
    else if (newScore.homeScore < newScore.awayScore) {
      setResult(away)
      console.log('res<',result);
    }
    if ((newScore.homeScore === newScore.awayScore)) {
      setResult('Draw')
      console.log('res=',result);
    }
  };

  const handleHomeChange = (value) => { 
    // console.log('result', result);
    // setNewScore({...newScore, winner: result })
    setNewScore({...newScore, homeScore: parseInt(value)})
   }
  const handleAwayChange = (value) => { 
    // console.log('result', result);
     setNewScore({...newScore, awayScore: parseInt(value)})
   }
  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewScore({...newScore, winner: result}));
    console.log(newScore);
    dispatch(popupActions.togglePrediction(false))
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
            onChange={(e)=>handleHomeChange(e.target.value)}
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
            onChange={(e)=>handleAwayChange(e.target.value)}
          />
        </div>
        <div>
          <label>Result: </label>
          <input
            type="text"
            placeholder={result}
            value={result === 'Draw' ? result :`${result} wins!`}
            readOnly
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

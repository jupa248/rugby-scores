import { useState } from 'react';
import './Finals.css';
import { useDispatch } from 'react-redux';
import Modal from './UI/Modal';
import { uiActions } from '../store/ui-slice';
import { addFinals } from '../store/scores-actions';

const Finals = (user) => {
  const userId = user.user.userId;
  const dispatch = useDispatch();
  const [finals, setFinals] = useState({
    team1: '',
    team2: '',
    winner: '',
    looser: '',
  });

  const toggleHandlerFinals = () => {
    dispatch(uiActions.toggleFinals());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFinals((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'winner') {
      setFinals((prevState) => ({
        ...prevState,
        team1: value,
        team2: prevState.looser,
      }));
    } else if (name === 'looser') {
      setFinals((prevState) => ({
        ...prevState,
        team1: prevState.winner,
        team2: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFinals({ userId, finals }));
  };

  return (
    <Modal onClose={toggleHandlerFinals}>
      <div className="finals-header">
        <span className="logo-icon" />
      </div>
      <form className="finals-form">
        <input
          type="hidden"
          name="team1"
          value={finals.team1}
          onChange={handleChange}
        />
        <input
          type="hidden"
          name="team2"
          value={finals.team2}
          onChange={handleChange}
        />
        <div>
          <label>
            Champion <span className="champion" />
          </label>
          <input
            name="winner"
            type="text"
            value={finals.winner}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
        <div>
          <label>
            2nd Place <span className="second" />
          </label>
          <input
            name="looser"
            type="text"
            value={finals.looser}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
      </form>
      <div className="btn-finals">
        <button onClick={handleSubmit} className="finals-btn">
          Send
        </button>
      </div>
    </Modal>
  );
};
export default Finals;

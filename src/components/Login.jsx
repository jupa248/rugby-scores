import { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import Modal from './UI/Modal';
import { addNewUser } from '../store/user-actions';
import { uiActions } from '../store/ui-slice';

const Login = (users) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    userId: '',
  });
  const usersList = users?.users;
  const id = Math.floor(Math.random() * 100);

  const handleChange = (e) => {
    setUser({ ...user, username: e.target.value, userId: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let match;
    if (!!usersList[0].username) {
      match = await usersList.find((name) => name.username === user.username);
    }
    if (match) {
      localStorage.setItem('user', JSON.stringify(match));
      dispatch(uiActions.togglePopup(false));
    } else {
      dispatch(addNewUser(user));
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(uiActions.togglePopup(false));
    }
  };

  const toggleHandler = () => {
    dispatch(uiActions.togglePopup());
  };

  return (
    <Modal onClose={toggleHandler}>
      <div className="login-header">
        {/* <h2>Enter your name</h2> */}
        <span className="ball-icon" />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          autoFocus
          type="text"
          placeholder="Please enter your name..."
          value={user.username}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Go!</button>
      </form>
    </Modal>
  );
};
export default Login;

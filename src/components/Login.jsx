import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './UI/Modal';
import { addNewUser } from '../store/user-actions';
import { popupActions } from '../store/popup-slice';

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
      await dispatch(popupActions.togglePopup(false));
    } else {
      await dispatch(addNewUser(user));
      await localStorage.setItem('user', JSON.stringify(user));
      await dispatch(popupActions.togglePopup(false));
    }
  };

  const toggleHandler = () => {
    dispatch(popupActions.togglePopup());
  };

  return (
    <Modal onClose={toggleHandler}>
      <h2>Enter your name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
      </form>
      <button onClick={handleSubmit}>Apply</button>
    </Modal>
  );
};
export default Login;

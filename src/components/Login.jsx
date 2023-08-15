import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from './UI/Popup';
import { addNewUser } from '../store/user-actions';
import { popupActions } from '../store/popup-slice';

const Login = (users) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    userId: '',
  });
  const usersList = users.users;
  const id = Math.floor(Math.random() * 100);

  const handleChange = (e) => {
    setUser({ ...user, username: e.target.value, userId: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const match = await usersList.find(
      (name) => name.username === user.username,
    );
    if (match) {
      localStorage.setItem('user', JSON.stringify(match));
    } else {
      dispatch(addNewUser(user));
    }
    await dispatch(popupActions.togglePopup(false));
  };

  return (
    <Popup
      type={'text'}
      placeholder={'Username'}
      value={user.username}
      onChange={handleChange}
      onClick={handleSubmit}
      header={'Enter your name'}
      btnText={'Apply'}
    />
  );
};
export default Login;

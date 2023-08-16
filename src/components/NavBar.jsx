import './NavBar.css';
import { useDispatch } from 'react-redux';
import { popupActions } from '../store/popup-slice';

const NavBar = (user) => {
  const dispatch = useDispatch();
  const toggleHandler = () => {
    dispatch(popupActions.togglePopup());
  };

  let userName = user.user?.username ?? 'User'

  return (
    <nav className="nav-container">
      <div className="logo"></div>
      <div onClick={toggleHandler}>{userName}</div>
      <div>Fixture</div>
      <div>Predictions</div>
    </nav>
  );
};
export default NavBar;

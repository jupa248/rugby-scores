import './NavBar.css';
import { useDispatch } from 'react-redux';
import { popupActions } from '../store/popup-slice';

const NavBar = () => {
  const dispatch = useDispatch();
  const toggleHandler = () => {
    dispatch(popupActions.togglePopup());
  };

  return (
    <nav className="nav-container">
      <div className="logo"></div>
      <div onClick={toggleHandler}>User</div>
      <div>Fixture</div>
      <div>Predictions</div>
    </nav>
  );
};
export default NavBar;

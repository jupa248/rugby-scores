import './NavBar.css';
import { useDispatch } from 'react-redux';
import { popupActions } from '../store/popup-slice';

const NavBar = (user) => {
  const dispatch = useDispatch();
  let userName = user.user?.username ?? 'User';

  const toggleHandler = () => {
    dispatch(popupActions.togglePopup());
  };

  const handlePage = (page) => {
    dispatch(popupActions.changeSection(page));
  };

  return (
    <nav className="nav-container">
      <div className="logo"></div>
      <div onClick={toggleHandler}>{userName}</div>
      <div onClick={() => handlePage('Fixture')}>Fixture</div>
      <div onClick={() => handlePage('Predictions')}>Predictions</div>
    </nav>
  );
};
export default NavBar;

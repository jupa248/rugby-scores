import './NavBar.css';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const NavBar = (user) => {
  const dispatch = useDispatch();
  let userName = user.user?.username ?? 'User';

  const toggleHandler = () => {
    dispatch(uiActions.togglePopup());
  };

  const handlePage = (page) => {
    dispatch(uiActions.changeSection(page));
  };

  return (
    <nav className="nav-container">
      <div className="logo" onClick={() => handlePage('Fixture')}></div>
      <div onClick={() => handlePage('Fixture')}>Fixture</div>
      <div onClick={() => handlePage('Predictions')}>Predictions</div>
      <div onClick={toggleHandler}>{userName}</div>
    </nav>
  );
};
export default NavBar;

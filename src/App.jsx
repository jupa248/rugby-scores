import { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyFixture } from './data/dummy-data';
import { FIXTURES_URL } from './Models/config';
import { useDispatch, useSelector } from 'react-redux';
import { getScoresData } from './store/scores-actions';
import { getUserData } from './store/user-actions';
import { getFixtureData } from './store/fixture-actions';
import Predictions from './components/Predictions';
import './App.css';
import MatchCard from './components/MatchCard';
import NavBar from './components/NavBar';
import Popup from './components/UI/Popup';
import Login from './components/Login';
import { popupActions } from './store/popup-slice';

function App() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.fixture.fixture);
  const showPopup = useSelector((state) => state.popup.showPopup);
  const users = useSelector((state) => state.user);
  const scores = useSelector((state) => state.scores);
  const userLogged = localStorage.getItem('user');
  useEffect(() => {
    dispatch(getFixtureData());
    dispatch(getUserData());
    dispatch(getScoresData());
    if (!userLogged) {
      const timer = setTimeout(() => {
        dispatch(popupActions.togglePopup(false));
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, userLogged]);

  console.log(showPopup);
  const scoresArray = Object.values(scores.scores);
  const usersArray = Object.values(users.user);

  // if (!userLogged) {
  //   dispatch(popupActions.togglePopup(false));
  // }

  // console.log(scoresArray);
  // scoresArray.map((score) => console.log(score));

  return (
    <>
      <NavBar />

      {/* {showPopup && <Popup />} */}
      <div>
        {matches &&
          matches.map((match) => <MatchCard key={match.id} match={match} />)}
      </div>
      {showPopup && <Login users={usersArray} />}
      {/* <Predictions /> */}
    </>
  );
}

export default App;

// let todaysDate = new Date().toISOString().split('T')[0];
// const matches = dummyFixture.filter(
//   (match) => match.date.split('T')[0] === todaysDate,
// );
// const postData = async (data) => {
//   const response = await axios.put(FIXTURES_URL, data);
//   if (response.statusText !== 'OK') {
//     throw new Error('Could not add new data!');
//   }
//   console.log(response);
// };
// postData(dummyFixture);

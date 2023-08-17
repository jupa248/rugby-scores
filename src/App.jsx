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
import Login from './components/Login';
import { popupActions } from './store/popup-slice';
import PredictionPopup from './components/PredictionPopup';
import { scoresActions } from './store/scores-slice';

function App() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.fixture.fixture);
  const showPopup = useSelector((state) => state.popup.showPopup);
  const showPrediction = useSelector((state) => state.popup.showPrediction);
  const selectedMatch = useSelector((state) => state.popup.selectedMatch);
  const users = useSelector((state) => state.user);
  const scores = useSelector((state) => state.scores);
  const userLogged = localStorage.getItem('user');
  const user = JSON.parse(userLogged);
  const scoreAdded = useSelector((state) => state.scores.scoreAdded);

  useEffect(() => {
    if (!userLogged) {
      const timer = setTimeout(() => {
        dispatch(popupActions.togglePopup(false));
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
    console.log('userLogged');
  }, [dispatch, userLogged]);

  useEffect(() => {
    dispatch(getFixtureData());
    console.log('fixtures');
  }, [dispatch]);

  useEffect(() => {
    dispatch(getScoresData());
  }, [dispatch]);

  const scoresArray = Object.values(scores.scores);
  const usersArray = Object.values(users.user);
  const userData = JSON.parse(userLogged);

  // console.log('scores', scores);

  return (
    <>
      <NavBar user={user} />

      {/* {showPopup && <Popup />} */}
      <div>
        {matches &&
          matches.map((match) => (
            <MatchCard key={match.id} props={{ match, userData }} />
          ))}
      </div>
      {showPopup && <Login users={usersArray} />}
      {/* <Predictions userData={userData} /> */}
      {showPrediction && selectedMatch && (
        <PredictionPopup match={selectedMatch} />
      )}
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

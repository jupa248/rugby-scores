import { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyFixture } from './data/dummy-data';
import { FIXTURES_URL } from './Models/config';
import { useDispatch, useSelector } from 'react-redux';
import { getScoresData } from './store/scores-actions';
import { getUserData } from './store/user-actions';
import { getFixtureData } from './store/fixture-actions';
import './App.css';
import MatchCard from './components/MatchCard';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { popupActions } from './store/popup-slice';
import PredictionPopup from './components/PredictionPopup';
import { scoresActions } from './store/scores-slice';
import Predictions from './components/Predictions';

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

  useEffect(() => {
    dispatch(getUserData());
    if (!userLogged) {
      const timer = setTimeout(() => {
        dispatch(popupActions.togglePopup(false));
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
    console.log('userLogged rendered');
  }, [dispatch, userLogged]);

  useEffect(() => {
    dispatch(getFixtureData());
    console.log('fixtures rendered');
  }, [dispatch]);

  useEffect(() => {
    dispatch(getScoresData());
    console.log('scores rendered');
  }, [dispatch]);

  let scoresArray =
    scores.scores !== 0 ? Object?.values(scores.scores) : 'no scores';

  let usersArray =
    users.user !== 'NO USERS' ? Object.values(users?.user) : 'no users';
  const userData = JSON?.parse(userLogged);

  const userScores = Object.values(scores.scores).filter((score) => {
    return score.user === userData?.userId;
  });
  const userScoresString = JSON.stringify(userScores);
  const selected = 'Predictions';
  // console.log(userScores);

  return (
    <>
      <NavBar user={user} />
      <main>
        {matches &&
          selected === 'Fixture' &&
          matches.map((match) => {
            const hasPrediction = userScoresString.includes(
              `"scoreId":${match.id}`,
            );
            return (
              <MatchCard
                key={match.id}
                props={{ match, userData, hasPrediction }}
              />
            );
          })}
        {/* {matches &&
          selected === 'Predictions' &&
          matches.map((match) => {
            const hasPrediction = userScoresString.includes(
              `"scoreId":${match.id}`,
            );

            return (
              <Predictions
                key={match.id}
                props={{ match, userData, hasPrediction, userScores }}
              />
            );
          })} */}
        {selected === 'Predictions' && (
          <Predictions props={{ userScores, matches }} />
        )}
      </main>
      {showPopup && <Login users={usersArray} />}
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

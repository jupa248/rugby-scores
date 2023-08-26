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
import { uiActions } from './store/ui-slice';
import PredictionPopup from './components/PredictionPopup';
import { scoresActions } from './store/scores-slice';
import Predictions from './components/Predictions';
import Spinner from './components/UI/Spinner';
import Error from './components/UI/Error';
import Finals from './components/Finals';

function App() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.fixture.fixture);
  const showPopup = useSelector((state) => state.ui.showPopup);
  const showPrediction = useSelector((state) => state.ui.showPrediction);
  const showFinals = useSelector((state) => state.ui.showFinals);
  const selectedMatch = useSelector((state) => state.ui.selectedMatch);
  const pageSection = useSelector((state) => state.ui.section);
  const error = useSelector((state) => state.ui.error);
  const loading = useSelector((state) => state.ui.loading);
  const users = useSelector((state) => state.user);
  const scores = useSelector((state) => state.scores);
  const finals = useSelector((state) => state.scores.finals);
  const userLogged = localStorage.getItem('user');
  const user = JSON.parse(userLogged);

  useEffect(() => {
    dispatch(getUserData());
    if (!userLogged) {
      const timer = setTimeout(() => {
        dispatch(uiActions.togglePopup());
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

  const userScores = Object.entries(scores?.scores).filter((score) => {
    return score[1]?.user === userData?.userId && score;
  });
  const userScoresString = JSON.stringify(userScores);

  if (loading) {
    return <Spinner />;
  }
  console.log('finals:', finals);
  return (
    <>
      <NavBar user={user} />
      <main>
        {!!error.length > 0 && <Error err={error} />}
        {matches &&
          pageSection === 'Fixture' &&
          matches?.map((match) => {
            const hasPrediction = userScoresString.includes(
              `"scoreId":${match.id}`,
            );
            let hasKey = userScores.find(
              (score) => score[1].scoreId === match.id,
            );
            let matchKey = hasKey ? hasKey[0] : 'no-key';

            return (
              <MatchCard
                key={match.id}
                props={{ match, userData, hasPrediction, matchKey }}
              />
            );
          })}
        {pageSection === 'Predictions' && (
          <Predictions props={{ userScores, matches }} />
        )}
      </main>
      {showPopup && <Login users={usersArray} />}
      {showPrediction && selectedMatch && (
        <PredictionPopup match={selectedMatch} />
      )}
      {showFinals && <Finals user={user} />}
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

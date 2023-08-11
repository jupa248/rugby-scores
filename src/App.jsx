import { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyFixture } from './data/dummy-data';
import { FIXTURES_URL } from './Models/config';
import { useDispatch, useSelector } from 'react-redux';
import { getScoresData } from './store/scores-actions';
import { getFixtureData } from './store/fixture-actions';
import Predictions from './components/Predictions';
import './App.css';
import MatchCard from './components/matchCard';
import Register from './components/Register';

function App() {
  const dispatch = useDispatch();
  const matches = useSelector(
    (state) => state.fixture.fixture['-NbVCnQ756rEH1sTMWkk'],
  );
  useEffect(() => {
    dispatch(getFixtureData());
  }, [dispatch]);

  // const postData = async (data) => {
  //   const response = await axios.post(FIXTURES_URL, data);
  //   if (response.statusText !== 'OK') {
  //     throw new Error('Could not add new data!');
  //   }
  //   console.log(response);
  // };
  // postData(dummyFixture);

  return (
    <>
      {/* <div>
        {matches &&
          matches.map((match) => <MatchCard key={match.id} match={match} />)}
      </div> */}
      <Register />
    </>
  );
}

export default App;

// let todaysDate = new Date().toISOString().split('T')[0];
// const matches = dummyFixture.filter(
//   (match) => match.date.split('T')[0] === todaysDate,
// );

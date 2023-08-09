import { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyFixture } from './data/dummy-data';
import { FIXTURES_URL } from './Models/config';
import { useDispatch, useSelector } from 'react-redux';
import { getScoresData } from './store/scores-actions';
import Predictions from './components/Predictions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores.scores);
  useEffect(() => {
    dispatch(getScoresData()); // Fetch scores data when the app starts
  }, [dispatch]);

  // console.log('scores', scores);
  return (
    <>
      <Predictions />
    </>
  );
}

export default App;

// let todaysDate = new Date().toISOString().split('T')[0];
// const matches = dummyFixture.filter(
//   (match) => match.date.split('T')[0] === todaysDate,
// );

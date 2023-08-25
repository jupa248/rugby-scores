import { API_KEY } from './config';

export const getFixture = {
  method: 'GET',
  url: 'https://rugby-live-data.p.rapidapi.com/fixtures/1272/2024',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'rugby-live-data.p.rapidapi.com',
  },
};

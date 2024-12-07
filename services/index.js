// src/services/weatherService.js
import axios from 'axios';

const API_KEY = '0c36b4a674ee17cb7644417b1deac3c9';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const Weather = async (location) => {
    
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};

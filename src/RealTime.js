// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeatherData = async () => {
    if (!location) {
      toast.error('Please enter a location!');
      return;
    }

    try {
      const currentResponse = await axios.get(`http://localhost:5000/weather/${location}`);
      const hourlyResponse = await axios.get(`http://localhost:5000/forecast/hourly/${location}`);
      const dailyResponse = await axios.get(`http://localhost:5000/forecast/daily/${location}`);

      setCurrentWeather(currentResponse.data);
      setHourlyForecast(hourlyResponse.data.list);
      setDailyForecast(dailyResponse.data.daily);
    } catch (error) {
      toast.error('Error fetching weather data');
    }
  };

  return (
    <div className="App">
      <h1>Real-time Weather Updates</h1>

      <input
        type="text"
        placeholder="Enter location (e.g., London)"
        value={location}
        onChange={handleLocationChange}
      />
      <button onClick={getWeatherData}>Get Weather</button>

      {currentWeather && (
        <div>
          <h2>Current Weather in {currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Condition: {currentWeather.weather[0].description}</p>
        </div>
      )}

      {hourlyForecast && (
        <div>
          <h3>Hourly Forecast</h3>
          <ul>
            {hourlyForecast.slice(0, 12).map((forecast, index) => (
              <li key={index}>
                <strong>{new Date(forecast.dt * 1000).toLocaleTimeString()}</strong>: {forecast.main.temp}°C, {forecast.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {dailyForecast && (
        <div>
          <h3>Daily Forecast</h3>
          <ul>
            {dailyForecast.map((forecast, index) => (
              <li key={index}>
                <strong>{new Date(forecast.dt * 1000).toLocaleDateString()}</strong>: {forecast.temp.day}°C, {forecast.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default App;

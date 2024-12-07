// src/App.js
import React, { useState, useEffect } from 'react';
// import { getWeather } from './services/weatherService';
// import { assessRisk } from './utils/pestDiseasePrediction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Risk} from './services/test';
import { Weather } from './services';

const Dict = () => {
  const [location, setLocation] = useState('New York');
  const [alerts, setAlerts] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  <div>
    <Risk/>
    <Weather/>
  </div>

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await Weather(location);
        setWeatherData(data);

        const risks = Risk(data);
        setAlerts(risks);

        risks.forEach(alert => toast.warn(alert));
      } catch (error) {
        toast.error('Failed to fetch weather data!');
      }
    };

    fetchWeather();
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="App">
      <h1>Pest and Disease Alerts</h1>

      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter location"
      />

      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      <div>
        <h3>Predicted Alerts</h3>
        {alerts.length > 0 ? (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        ) : (
          <p>No alerts at this time.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dict;

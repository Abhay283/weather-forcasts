import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/weather?city=${city}`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found or API error.');
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Weather Forecast and Irrigation Management</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={getWeather}>Get Weather</button>
      
      {error && <div className="error">{error}</div>}
      
      {weatherData && (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {weatherData.list[0].main.temp}°C</p>
          <p>Humidity: {weatherData.list[0].main.humidity}%</p>
          
          {/* Add pest/disease alert and crop-specific insights logic here */}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

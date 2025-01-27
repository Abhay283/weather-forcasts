import React, { useState } from 'react';
import axios from 'axios';

const Demo = () => {
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('wheat');
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState('');
  const [insights, setInsights] = useState(null);
  const [irrigationSchedule, setIrrigationSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch weather data and pest risk
  const fetchWeatherData = async () => {
    setLoading(true);
    
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/pest-disease-alert?location=${location}`);
      setWeather(response.data);
      setRisk(response.data.risk);
      setInsights(response.data.insights);
      setIrrigationSchedule(response.data.irrigationSchedule);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pest and Disease Alert System</h1>
      {/* <h1>Irrigation Scheduling System</h1> */}
      <div>
      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter your location"
      />
      </div>

      <div>
        <label>Crop:</label>
        <select onChange={(e) => setCrop(e.target.value)} value={crop}>
          <option value="wheat">Wheat</option>
          <option value="tomatoes">Tomatoes</option>
          <option value="rice">Rice</option>
        </select>
      </div>
      <button onClick={fetchWeatherData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Alerts'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>Weather in {weather.location}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <h3>Pest & Disease Risk: {risk}</h3>

          <h4>Crop Insights:</h4>
          <p>{insights?.tempAdvice}</p>
          <p>{insights?.humidityAdvice}</p>

          <h4>Irrigation Schedule:</h4>
          <p>{irrigationSchedule.temperatureAdvice}</p>
          <p>{irrigationSchedule.humidityAdvice}</p>
          <p>Recommended Watering Amount: {irrigationSchedule.irrigationAmount.toFixed(2)} Liters</p>
        </div>
      )}
    </div>
  );
};

export default Demo;
